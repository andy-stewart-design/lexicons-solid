import { IconData } from "~/components/Icon";

export async function copySVG(icon: IconData) {
  const svg = `<svg id="${icon.name}" width="${icon.size}" height="${icon.size}" viewBox="0 0 ${icon.size} ${icon.size}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  const paths = icon.paths
    .map(
      (path) =>
        `<path d="${path}" stroke="black" stroke-width="2" stroke-linejoin="round"/>`
    )
    .join("");

  try {
    await navigator.clipboard.writeText(svg + paths + "</svg>");
  } catch (err) {
    console.error("Failed to copy!", err);
  }
}
