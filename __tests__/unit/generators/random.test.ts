import { randomColor } from "@src/generators/random";

describe("Random Generator", () => {
  test("should generate random colors", () => {
    const { r, g, b } = randomColor();
    expect(Math.min(r, g, b) >= 0 && Math.max(r, g, b) < 256).toBe(true);
  });
});
