import { ColorSpace, ColorSpaceRange as COLOR_SPACE_RANGE } from 'color-schema-test';
import { cloneDeep, sumBy, random } from 'lodash';
import { SimulationType } from '../types';
import { arrayToColor } from '../color/convertion';
import { colorDistance } from '../protest';
import { colorSimulation } from '../simulators';

type ColorArray = [number] | [number, number, number] | [number, number, number, number];
type Colors = ColorArray[];

// Genetic algorithm config
const POPULATION_NUMBER = 50;
const CROSSOVER_RATE = 0.9;
const MUTATION_RATE = 0.1;
const MAX_GENERATION = 100;
const ADAPTIVE_RANGE: [number, number] = [0.8, 1.2];

type SelectionFunctionType = 'rouletteWheel' | 'tournament';
type SelectionFunction = (fitnesses: number[]) => number;
const rouletteWheelSelection: SelectionFunction = (fitnesses) => {
  const sumFitness = sumBy(fitnesses, (d) => d);
  let index = 0;
  const seed = random(sumFitness, true);
  let count = 0;
  for (let i = 0; i < fitnesses.length; i += 1) {
    count += fitnesses[i];
    if (seed < count) {
      index = +i;
    }
  }
  return index;
};
const tournamentSelection: SelectionFunction = (fitnesses) => {
  const TOURNAMENT_SIZE = 3;
  let index = -1;
  let maxFitness = 0;
  for (let i = 0; i < TOURNAMENT_SIZE; i += 1) {
    const randomIndex = random(fitnesses.length - 1);
    if (fitnesses[randomIndex] > maxFitness) {
      index = i;
      maxFitness = fitnesses[randomIndex];
    }
  }
  return index;
};
const selectionFunction: Record<SelectionFunctionType, (fitnesses: number[]) => number> = {
  rouletteWheel: rouletteWheelSelection,
  tournament: tournamentSelection,
};
const selection = (fitnesses: number[], type = 'tournament') => {
  return selectionFunction[type](fitnesses);
};

const crossover = (father: Colors, mother: Colors) => {
  const child1 = cloneDeep(father);
  const child2 = cloneDeep(mother);
  for (let i = 1; i < father.length; i += 2) {
    child1[i] = mother[i];
    child2[i] = father[i];
  }
  return [child1, child2];
};

const mutate = (colors: Colors, unLocledIndexs: number[], simulationType: SimulationType, colorSpace: ColorSpace) => {
  const newColors = cloneDeep(colors);
  // pick one color and change color adaptively
  const mutateIndex = unLocledIndexs[random(unLocledIndexs.length - 1)];
  const dimensionIndex = random(colors[0].length - 1);
  let newValue = newColors[mutateIndex][dimensionIndex] * random(...ADAPTIVE_RANGE);
  // clip
  let range = [15, 240]; // grayScale
  if (simulationType !== 'grayScale') {
    range = COLOR_SPACE_RANGE[colorSpace][colorSpace.split('')[dimensionIndex]];
  }

  const [min, max] = range;
  if (newValue < min) {
    newValue = min;
  } else if (newValue > max) {
    newValue = max;
  }

  newColors[mutateIndex][dimensionIndex] = newValue;
  return newColors;
};

const calFitnessInGrayScale = (colors: Colors, locked: boolean[]): number => {
  let minDistance = Infinity;
  for (let i = 0; i < colors.length; i += 1) {
    for (let j = i + 1; j < colors.length; j += 1) {
      if (!(locked[i] && locked[j])) {
        minDistance = Math.min(minDistance, Math.abs(colors[i][0] - colors[j][0]));
      }
    }
  }
  return minDistance;
};
const calFitnessInColorBlindnessSimulation = (
  colors: Colors,
  locked: boolean[],
  simulationType: SimulationType,
  colorSpace: ColorSpace
): number => {
  let minDistance = Infinity;
  const newColors = colors.map((color) => colorSimulation(arrayToColor(color, colorSpace), simulationType));
  for (let i = 0; i < newColors.length; i += 1) {
    for (let j = i + 1; j < newColors.length; j += 1) {
      if (!(locked[i] && locked[j])) {
        minDistance = Math.min(minDistance, colorDistance(newColors[i], newColors[j]));
      }
    }
  }
  return minDistance;
};
// fitness function
const calFitness = (
  colors: Colors,
  locked: boolean[],
  simulationType: SimulationType,
  colorSpace: ColorSpace
): number => {
  if (simulationType === 'grayScale') {
    return calFitnessInGrayScale(colors, locked);
  }
  return calFitnessInColorBlindnessSimulation(colors, locked, simulationType, colorSpace);
};

export const optimizePaletteByGA = (
  colors: Colors,
  locked: boolean[],
  simulationType: SimulationType,
  threshold: number,
  colorSpace: ColorSpace
) => {
  if (Math.round(calFitness(colors, locked, simulationType, colorSpace)) > threshold) {
    return colors;
  }
  const unLocledIndexs = new Array(colors.length)
    .fill(0)
    .map((d, index) => index)
    .filter((d, index) => !locked[index]);

  // Creating a new generation
  let population = new Array(POPULATION_NUMBER)
    .fill(0)
    .map(() => mutate(colors, unLocledIndexs, simulationType, colorSpace));
  // Evaluating individuals
  let fitnesses = population.map((colors) => calFitness(colors, locked, simulationType, colorSpace));
  let bestFitness = Math.max(...fitnesses);
  let elites = population[fitnesses.findIndex((d) => d === bestFitness)];
  let cnt = 1;
  while (cnt < MAX_GENERATION && Math.round(bestFitness) < threshold) {
    // Elitist Strategy
    const newPopulation = [elites];

    for (let i = 1; i < POPULATION_NUMBER; i += 2) {
      // Selection
      const father = population[selection(fitnesses)];
      const mother = population[selection(fitnesses)];
      // Reproduction
      let childern = random(1, true) < CROSSOVER_RATE ? crossover(father, mother) : [father, mother];
      // Mutation
      childern = childern.map((child) =>
        random(1, true) < MUTATION_RATE ? mutate(child, unLocledIndexs, simulationType, colorSpace) : child
      );
      newPopulation.push(...childern);
    }

    population = newPopulation;
    fitnesses = population.map((colors) => calFitness(colors, locked, simulationType, colorSpace));
    const newBestFitness = Math.max(...fitnesses);
    bestFitness = newBestFitness;
    elites = population[fitnesses.findIndex((d) => d === newBestFitness)];
    cnt += 1;
  }
  return elites;
};
