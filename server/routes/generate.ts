import { generateImageStreamWithRatio } from "../utils/aspect";

async function main() {
  const buffer = await generateImageStreamWithRatio(
    "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTE5MjN8MHwxfHNlYXJjaHw0fHxzaW1wbGV8ZW58MHx8fHwxNzE0NTI5MTUzfDA&ixlib=rb-4.0",
    9 / 16,
    1
  );

  // Return the image buffer
  return buffer;
}

export default defineEventHandler(async (event) => {
  const imageBuffer = await main();
  return imageBuffer;
});
