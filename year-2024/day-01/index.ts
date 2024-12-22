import {
  Solution,
  SampleExecutor,
  type SampleWithAnswer,
  type SolutionType,
} from "../../lib/solution";

let sample: SampleWithAnswer = {
  input: `3   4
4   3
2   5
1   3
3   9
3   3`, // Add sample input
  expectedPart1: 11, // Add expected output
  expectedPart2: 31, // Add expected output
};
export async function run(
  type: SolutionType,
  part: number
): Promise<number | undefined> {
  return await new Solution(sample, new SolutionExecutor()).run(type, part);
}
class SolutionExecutor extends SampleExecutor {
  runPart1(input: string): number {
    // Parse left and right values in separate arrays with regex
    const [left, right] = input.split("\n").reduce(
      (acc, line) => {
        const [l, r] = line.split(/\s+/).map((n) => parseInt(n));
        acc[0].push(l);
        acc[1].push(r);
        return acc;
      },
      [[], []] as number[][]
    );

    // Sort both arrays from smallest to largest
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    // Check the difference between each pair of values
    let result = 0;
    for (let i = 0; i < left.length; i++) {
      result += Math.abs(left[i] - right[i]);
    }
    return result;
  }
  runPart2(input: string): number {
    const [left, right] = input.split("\n").reduce(
      (acc, line) => {
        const [l, r] = line.split(/\s+/).map((n) => parseInt(n));
        acc[0].push(l);
        acc[1].push(r);
        return acc;
      },
      [[], []] as number[][]
    );
    // Calculate the total similarity score
    let result = 0;
    for (let i = 0; i < left.length; i++) {
      result += left[i] * right.filter((n) => n === left[i]).length;
    }
    return result;
  }
}
