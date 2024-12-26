import {
  Solution,
  SampleExecutor,
  type SampleWithAnswer,
  type SolutionType,
} from "../../lib/solution";
class SolutionExecutor extends SampleExecutor {
  runPart1(input: string): number {
    const lines = input.split('\n');
    const regex = /mul\((\d+),(\d+)\)/g;
    let sum = 0;
    for (const line of lines) {
      const matches = line.match(regex);
      if (matches) {
        for (const match of matches) {
          const [a, b] = match
            .replace('mul(', '')
            .replace(')', '')
            .split(',')
            .map(Number);
          sum += a * b;
        }
      }
    }
    return sum;
  }
  runPart2(input: string): number {
    const lines = input.split('\n');
    const regexWithDoAndDont = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    let sum = 0;
    let mulEnabled = true;
    for (const line of lines) {
      const matches = line.match(regexWithDoAndDont);
      if (matches) {
        for (const match of matches) {
          if (match === 'do()') {
            mulEnabled = true;
          } else if (match === 'don\'t()') {
            mulEnabled = false;
          } else if (mulEnabled) {
            const [a, b] = match
              .replace('mul(', '')
              .replace(')', '')
              .split(',')
              .map(Number);
            sum += a * b;
          }
        }
      }
    }
    return sum;

  }
}
// Add sample input and expected output
let sample: SampleWithAnswer = {
  // input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
  input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
  expectedPart1: 161,
  expectedPart2: 48,
};
/**
 * Export the run function to be used in the main file
 * @param type 
 * @param part 
 * @returns 
 */
export async function run(
  type: SolutionType,
  part: number
): Promise<number | undefined> {
  return await new Solution(sample, new SolutionExecutor()).run(type, part);
}