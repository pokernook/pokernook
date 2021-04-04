import seedrandom from "seedrandom";

const TOTAL_RGB_COMBINATIONS = 16_777_215;

const decToHexColor = (decimalColor: number) =>
  `${decimalColor.toString(16).padStart(6, "0")}`;

const getBinaryList = (number: number, size: number) =>
  number.toString(2).padStart(size, "0").split("");

const render = (resolution: number, indexX: number, indexY: number) =>
  `M${indexX * resolution},${
    indexY * resolution
  } h${resolution} v${resolution} h${0 - resolution}Z`;

const generateRandomAvatarData = (seed: string, complexity: number) => {
  const rng = seedrandom(seed);
  const xAxis = Math.floor(rng() * (Math.pow(2, complexity) - 1));
  const yAxis = Math.floor(rng() * (Math.pow(2, complexity) - 1)) + 1;

  const rows = getBinaryList(yAxis, complexity);
  let result = `${xAxis.toString(36)}-${yAxis.toString(36)}`;

  rows.forEach(() => {
    const color = Math.floor(rng() * TOTAL_RGB_COMBINATIONS);
    result += `-${color.toString(36)}`;
  });

  return result;
};

const parseAvatarData = (data: string) => {
  const xAxis = 0;
  const yAxis = 0;
  const colorMap: string[] = [];
  const result = { xAxis, yAxis, colorMap };

  if (!data) {
    return result;
  }

  data.split("-").forEach((chunk, index) => {
    const intVal = parseInt(chunk, 36);

    switch (index) {
      case 0:
        result.xAxis = intVal;
        break;
      case 1:
        result.yAxis = intVal;
        break;
      default:
        result.colorMap.push(decToHexColor(intVal));
        break;
    }
  });

  return result;
};

const getAvatarSvgFromData = (avatarData: string, size: number) => {
  const { xAxis, yAxis, colorMap } = parseAvatarData(avatarData);
  const complexity = Math.max(colorMap.length, 1);
  const resolution = Math.floor(size / complexity);

  if (xAxis >= Math.pow(2, complexity)) {
    throw Error("Incorrect avatar data");
  }

  const rows = getBinaryList(yAxis, complexity);
  const cols = getBinaryList(xAxis, complexity);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${size} ${size}">`;

  rows.forEach((rowItem, indexY) => {
    const draw: string[] = [];
    cols.forEach((colItem, indexX) => {
      if (parseInt(rowItem, 10) ^ parseInt(colItem, 10)) {
        draw.push(render(resolution, indexX, indexY));
      }
    });
    const fill = colorMap[indexY];
    if (!fill) {
      return;
    }
    svg += `<path fill="#${fill}" d="${draw.join(" ")}"/>`;
  });
  svg += "</svg>";

  const blob = new Blob([svg], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
};

export const generateAvatarSvg = (
  seed: string,
  complexity = 6,
  size = 780
): string => {
  const avatarData = generateRandomAvatarData(seed, complexity);
  return getAvatarSvgFromData(avatarData, size);
};
