import {
  Solution,
  SampleExecutor,
  type SampleWithAnswer,
  type SolutionType,
} from "../../lib/solution";
class SolutionExecutor extends SampleExecutor {
  runPart1(input: string): number {
    return 0;
  }

  runPart2(input: string): number {
    return 0;
  }
}
// Add sample input and expected output
let sample: SampleWithAnswer = {
  input: ``,
  expectedPart1: 0,
  expectedPart2: 0,
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