import { printInColor } from "./printInColor";

interface ISolutionTaskExecutor {
  runSamplePart1: (samplesWithExpected: SampleWithAnswer) => number;
  runSamplePart2: (samplesWithExpected: SampleWithAnswer) => number;
  runPart1: (input: string) => number;
  runPart2: (input: string) => number;
}
type SampleWithAnswer = {
  input: string;
  expectedPart1: number;
  expectedPart2: number;
};
const SolutionMode = {
  Sample: "s",
  Part: "p",
} as const;

type SolutionType = (typeof SolutionMode)[keyof typeof SolutionMode];

class Solution {
  readonly day: number;
  readonly year: number;
  readonly samplesWithAnswers: SampleWithAnswer;
  readonly solver: ISolutionTaskExecutor;

  constructor(
    samplesWithAnswers: SampleWithAnswer,
    solver: ISolutionTaskExecutor
  ) {
    const { DAY, YEAR } = Bun.env;
    if (!DAY || !YEAR)
      throw new Error("Please provide YEAR and DAY in .env file");
    this.day = parseInt(DAY);
    this.year = parseInt(YEAR);
    this.samplesWithAnswers = samplesWithAnswers;
    this.solver = solver;
  }
  async run(type: SolutionType, part: number): Promise<number | undefined> {
    printInColor(
      "Running day {} of year {}...",
      "green",
      [this.day, this.year],
      "yellow"
    );
    let result: number | undefined = undefined;
    if (type === SolutionMode.Sample) {
      if (part === 1) {
        result = this.solver.runSamplePart1(this.samplesWithAnswers);
      } else if (part === 2) {
        result = this.solver.runSamplePart2(this.samplesWithAnswers);
      }
    } else if (type === SolutionMode.Part) {
      const file = await this.readInputFile();
      const before = performance.now();
      if (part === 1) {
        result = this.solver.runPart1(file);
      } else if (part === 2) {
        result = this.solver.runPart2(file);
      }
      const after = performance.now();
      printInColor("Execution time: {}", "green", [after - before], "blue");
    }
    if (result) printInColor("===== Result: {}\n", "green", [result], "blue");
    else printInColor("No result", "red");
    return result;
  }
  async readInputFile() {
    let filePath = getFilePath(this.year, this.day, "input.txt");
    const input = Bun.file(filePath);
    return await input.text();
  }
}
type FileName = "input.txt" | "index.ts";
export function getFilePath(
  year: number,
  day: number,
  fileName: FileName | undefined = undefined
) {
  let filePath = `./year-${year}/day-${day}`;
  if (day < 10) filePath = `./year-${year}/day-0${day}`;
  return fileName ? `${filePath}/${fileName}` : filePath;
}

class SampleExecutor implements ISolutionTaskExecutor {
  runSamplePart1(samplesWithExpected: SampleWithAnswer): number {
    let result = this.runPart1(samplesWithExpected.input);
    // Check if total is equal to expected output
    if (result !== samplesWithExpected.expectedPart1) {
      printInColor(
        "Expected: {} but got: {}",
        "red",
        [samplesWithExpected.expectedPart1, result],
        "blue"
      );
    }
    return result;
  }
  runSamplePart2(samplesWithExpected: SampleWithAnswer): number {
    let result = this.runPart2(samplesWithExpected.input);
    // Check if total is equal to expected output
    if (result !== samplesWithExpected.expectedPart2) {
      printInColor(
        "Expected: {} but got: {}",
        "red",
        [samplesWithExpected.expectedPart2, result],
        "blue"
      );
    }
    return result;
  }
  runPart1(_: string): number {
    throw new Error("Method not implemented.");
  }
  runPart2(_: string): number {
    throw new Error("Method not implemented.");
  }
}

export { Solution, SampleExecutor };
export type { ISolutionTaskExecutor, SampleWithAnswer, SolutionType };
