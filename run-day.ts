import { getFilePath, type SolutionType } from "./lib/solution";

/**
 * To run a specific day, use the following command:
 */
const { DAY, YEAR } = Bun.env;

// Run the day in the specified folder
if (!DAY || !YEAR) throw new Error("Please provide YEAR and DAY in .env file");
let filePath = getFilePath(parseInt(YEAR), parseInt(DAY), "index.ts");
const { run } = await import(filePath);
console.log("File path", filePath);
const ValidInput = {
  Sample1: "s1",
  Sample2: "s2",
  Part1: "p1",
  Part2: "p2",
  Exit: "exit",
} as const;
type ValidInputType = (typeof ValidInput)[keyof typeof ValidInput];
const userActionPrompt = `What do you want to do?:
- s1: Run sample part 1
- s2: Run sample part 2
- p1: Run part 1
- p2: Run part 2
- exit: Exit`;
const shortActionPrompt = `What do you want to do? (s1, s2, p1, p2, exit)`;
import { watch } from "fs";
handleUserResponse(await promptUser(userActionPrompt, "green"));
/**
 * Prompt the user for input and return the response
 * @param prompt
 * @param color
 */
async function promptUser(prompt: string, color: string = "white") {
  const ansiColor = Bun.color(color, "ansi");
  console.log(ansiColor, `${prompt}\n> `);
  return new Promise<string>((resolve) => {
    process.stdin.once('data', (data) => {
      const response = data.toString().trimEnd();
      resolve(response);
    });
  });
}
/**
 * Print the text in the specified color
 * @param text
 * @param color
 * @param params The parameters to replace in the text (will be cast to string)
 * @param paramColor
 */
export function printInColor(
  text: string,
  color: string = "white",
  params: any[] = [],
  paramColor: string = "white"
) {
  const ansiColor = Bun.color(color, "ansi");
  const ansiParamColor = Bun.color(paramColor, "ansi");
  for (const param of params) {
    text = text.replace("{}", ansiParamColor + param.toString() + ansiColor);
  }
  console.log(ansiColor, text);
}
async function handleUserResponse(input: string | null) {
  const watcher = watch(
    `${import.meta.dir}/year-${YEAR}`,
    { recursive: true },
    async () => {
      watcher.close();
      handleUserResponse(await promptUser(shortActionPrompt, "green"));
    }
  );
  if (input === null) {
    watcher.close();
    handleUserResponse(await promptUser(shortActionPrompt, "green"));
    return;
  }
  let type: SolutionType;
  let part: number;
  if (!Object.values(ValidInput).includes(input as ValidInputType)) {
    printInColor("Invalid input. Please type one of s1, s2, p1, p2", "red");
    watcher.close();
    handleUserResponse(await promptUser(shortActionPrompt, "green"));
    return;
  } else if (input === ValidInput.Exit) {
    watcher.close();
    process.exit(0);
  } else {
    type = input[0] as SolutionType;
    part = parseInt(input[1]);
  }
  await run(type, part);
  watcher.close();
  handleUserResponse(await promptUser(shortActionPrompt, "green"));
}
