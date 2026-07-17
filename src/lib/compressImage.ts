// Resizes and compresses an image in the browser before upload.
// Vercel serverless functions have a hard 4.5MB request body limit
// (an underlying AWS Lambda constraint, not a configurable setting),
// and four full-resolution phone photos can easily exceed that
// combined. A resized/compressed JPEG is still perfectly usable for
// a doctor's visual review while comfortably fitting the limit.
export async function compressImage(
  file: File,
  maxDimension = 1280,
  quality = 0.75
): Promise<File> {
  const bitmap = await createImageBitmap(file);

  let { width, height } = bitmap;
  if (width > maxDimension || height > maxDimension) {
    const scale = maxDimension / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file; // Fallback: upload original if canvas unavailable

  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality)
  );

  if (!blob) return file; // Fallback: upload original if compression fails

  return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
    type: "image/jpeg",
  });
}
