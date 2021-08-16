import { Color, ColorModel, ColorModelRange as COLOR_MODEL_RANGE } from '@antv/color-schema';
import { cloneDeep, sumBy, random } from 'lodash';
import { ColorDifferenceMeasure, SimulationType } from '../types';
import { arrayToColor, grayToColor } from '../utils';
import { colorDifference } from '../evaluators';
import { colorSimulation } from '../simulators';

type ColorArray = [number] | [number, number, number] | [number, number, number, number];
type Colors = ColorArray[];

// Genetic algorithm configuration
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
const selection = (fitnesses: number[], type: SelectionFunctionType = 'tournament') => {
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

const mutate = (colors: Colors, unLocledIndexs: number[], simulationType: SimulationType, colorModel: ColorModel) => {
  const newColors = cloneDeep(colors);
  // pick one color and change color adaptively
  const mutateIndex = unLocledIndexs[random(unLocledIndexs.length - 1)];
  const dimensionIndex = random(colors[0].length - 1);
  let newValue = newColors[mutateIndex][dimensionIndex] * random(...ADAPTIVE_RANGE);
  // clip
  let range = [15, 240]; // grayScale
  if (simulationType !== 'grayScale') {
    range = COLOR_MODEL_RANGE[colorModel][colorModel.split('')[dimensionIndex]];
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

// fitness function
export const calFitness = (
  colors: Colors,
  locked: boolean[],
  simulationType: SimulationType,
  colorModel: ColorModel,
  colorDifferenceMeasure: ColorDifferenceMeasure,
  backgroundColor: Color
): number => {
  let newColors: Color[];
  if (simulationType === 'grayScale') {
    newColors = colors.map(([gray]) => grayToColor(gray));
  } else {
    newColors = colors.map((color) => colorSimulation(arrayToColor(color, colorModel), simulationType));
  }
  let minDifference = Infinity;
  for (let i = 0; i < newColors.length; i += 1) {
    for (let j = i + 1; j < newColors.length; j += 1) {
      if (!(locked[i] && locked[j])) {
        minDifference = Math.min(
          minDifference,
          colorDifference(newColors[i], newColors[j], { measure: colorDifferenceMeasure, backgroundColor })
        );
      }
    }
  }
  return minDifference;
};

export const optimizePaletteByGA = (
  colors: Colors,
  locked: boolean[],
  simulationType: SimulationType,
  threshold: number,
  colorModel: ColorModel,
  colorDifference: ColorDifferenceMeasure,
  backgroundColor: Color
) => {
  if (
    Math.round(calFitness(colors, locked, simulationType, colorModel, colorDifference, backgroundColor)) > threshold
  ) {
    return colors;
  }
  const unLocledIndexs = new Array(colors.length)
    .fill(0)
    .map((d, index) => index)
    .filter((d, index) => !locked[index]);

  // Creating a new generation
  let population = new Array(POPULATION_NUMBER)
    .fill(0)
    .map(() => mutate(colors, unLocledIndexs, simulationType, colorModel));
  // Evaluating individuals
  let fitnesses = population.map((colors) =>
    calFitness(colors, locked, simulationType, colorModel, colorDifference, backgroundColor)
  );
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
      let children = random(1, true) < CROSSOVER_RATE ? crossover(father, mother) : [father, mother];
      // Mutation
      children = children.map((child) =>
        random(1, true) < MUTATION_RATE ? mutate(child, unLocledIndexs, simulationType, colorModel) : child
      );
      newPopulation.push(...children);
    }

    population = newPopulation;
    fitnesses = population.map((colors) =>
      calFitness(colors, locked, simulationType, colorModel, colorDifference, backgroundColor)
    );
    const newBestFitness = Math.max(...fitnesses);
    bestFitness = newBestFitness;
    elites = population[fitnesses.findIndex((d) => d === newBestFitness)];
    cnt += 1;
  }
  return elites;
};
