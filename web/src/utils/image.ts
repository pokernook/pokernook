type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export const createImageFromUrl = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (e) => reject(e));
  });

export const getCroppedImageUrl = async (
  url: string,
  crop: Area,
  type = "image/png"
): Promise<string> => {
  const image = await createImageFromUrl(url);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to create canvas context");
  }

  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, image.width, image.height);

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.putImageData(data, Math.round(0 - crop.x), Math.round(0 - crop.y));

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, type);
  });
};
