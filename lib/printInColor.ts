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
