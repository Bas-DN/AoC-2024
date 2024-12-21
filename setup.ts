import { mkdir } from "node:fs/promises";
import { getFilePath } from "./lib/solution";
const { YEAR, DAY, AUTH_COOKIE } = Bun.env;
if (!YEAR || !DAY || !AUTH_COOKIE) {
  throw new Error("Please provide YEAR, DAY and AUTH_COOKIE in .env file");
}
let filePath = getFilePath(parseInt(YEAR), parseInt(DAY));

const inputFilePath = `${filePath}/input.txt`;
const existingInputFile = Bun.file(inputFilePath);
if (await existingInputFile.exists()) {
  throw new Error("Input file already exists");
}
await mkdir(filePath, { recursive: true });
const templateFiles = ["index.ts"];
for (const file of templateFiles) {
  const template = Bun.file(`./templates/typescript/${file}`);
  const newFile = Bun.file(`${filePath}/${file}`);
  await Bun.write(newFile, template);
}
// TODO: Implement fetching input from Advent of Code
// const response = await fetch(`https://adventofcode.com/${YEAR}/day/${DAY}/input`, {
//   headers: { session: AUTH_COOKIE },
// });
// if (!response.ok) {
//   console.log(response.status);
//   console.log(response.statusText);
//   throw new Error("Failed to fetch input");
// }

// const input = await response.text();
// await Bun.write(inputFilePath, JSON.stringify(input));
