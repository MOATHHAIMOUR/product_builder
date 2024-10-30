/**
 *
 * @param {string} txt -- the input text to slicer
 * @param {number} [max=50] -- the allowed number of char
 * @returns the sliced text with three dots last ...
 */
export function textSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)}...`;
  else return txt;
}
