import { printInColor } from "../../lib/printInColor";
import {
  Solution,
  SampleExecutor,
  type SampleWithAnswer,
  type SolutionType,
} from "../../lib/solution";
class SolutionExecutor extends SampleExecutor {
  runPart1(input: string): number {
    printInColor("Running part 1");
    // Parse input into lock and key schematics
    const schematics = input.replace(/\r/g, "").split("\n\n").map((s) => s.split("\n"));
    console.log(schematics);
    // The locks are schematics that have the top row filled (#) and the bottom row empty (.); the keys have the top row empty and the bottom row filled.
    const lockSchematics = schematics.filter((s) => s[0].startsWith("#"));
    const keySchematics = schematics.filter((s) => s[0].startsWith("."));

    // Convert all lock and key schematics to heights
    const lockHeightsList = lockSchematics.map(convertToHeight);
    console.log("lockHeightsList", lockHeightsList);
    const keyHeightsList = keySchematics.map(convertToHeight);
    console.log("keyHeightsList", keyHeightsList);

    // Count the number of fitting lock/key pairs
    let count = 0;
    for (const lockHeights of lockHeightsList) {
      for (const keyHeights of keyHeightsList) {
        if (fits(lockHeights, keyHeights)) {
          count++;
        }
      }
    }
    return count;
  }

  runPart2(input: string): number {
    return 0;
  }
}

function fits(lockHeights: number[], keyHeights: number[]): boolean {
  for (let i = 0; i < lockHeights.length; i++) {
    if (lockHeights[i] + keyHeights[i] > 5) {
      // console.log("Height too tall at column:", i);
      return false;
    }
  }
  // console.log("It fits: ", lockHeights, keyHeights);
  return true;
}
function convertToHeight(schematic: string[]): number[] {
  // console.log("schematic", schematic);
  const heights: number[] = [];
  for (let i = 0; i < schematic[0].length; i++) {
    let height = 0;
    for (const row of schematic) {
      if (row[i] === "#") {
        height++;
      }
    }
    heights.push(height - 1);
  }
  return heights;
}
// Add sample input and expected output
let sample: SampleWithAnswer = {
  input: `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`,
  expectedPart1: 3,
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
