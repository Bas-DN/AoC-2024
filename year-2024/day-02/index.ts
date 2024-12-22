import {
  Solution,
  SampleExecutor,
  type SampleWithAnswer,
  type SolutionType,
} from "../../lib/solution";
let sample: SampleWithAnswer = {
  input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
  expectedPart1: 2,
  expectedPart2: 4,
};
export async function run(
  type: SolutionType,
  part: number
): Promise<number | undefined> {
  return await new Solution(sample, new SolutionExecutor()).run(type, part);
}
class SolutionExecutor extends SampleExecutor {
  runPart1(input: string): number {
    const reports = parseReports(input);
    let result = 0;
    for (const report of reports) {
      if (isIncreasingOrDecreasing(report) && isSafeReport(report)) {
        result++;
      }
    }
    return result;
  }

  runPart2(input: string): number {
    const reports = parseReports(input);
    let result = 0;
    for (const report of reports) {
      if (isIncreasingOrDecreasing(report) && isSafeReport(report)) {
        result++;
      } else if (canBeSafeAfterSingleRemoval(report)) {
        result++;
      }
    }
    return result;
  }
}

function parseReports(input: string): number[][] {
  return input
    .split("\n")
    .map((line) => line.split(/\s+/).map((n) => parseInt(n)));
}

function isIncreasingOrDecreasing(report: number[]): boolean {
  let isIncreasing = true;
  let isDecreasing = true;
  for (let i = 1; i < report.length; i++) {
    if (report[i] > report[i - 1]) {
      isDecreasing = false;
    } else if (report[i] < report[i - 1]) {
      isIncreasing = false;
    }
  }
  return isIncreasing || isDecreasing;
}

function isSafeReport(report: number[]): boolean {
  for (let i = 1; i < report.length; i++) {
    if (
      Math.abs(report[i] - report[i - 1]) < 1 ||
      Math.abs(report[i] - report[i - 1]) > 3
    ) {
      return false;
    }
  }
  return true;
}

function canBeSafeAfterSingleRemoval(report: number[]): boolean {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafeReport(modifiedReport) && isIncreasingOrDecreasing(modifiedReport)) {
      return true;
    }
  }
  return false;
}
