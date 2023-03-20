import { addToast, dismissToast, toasts } from "~/stores/toast";
import { IconData } from "~/components/Icon";

export async function copySVG(icon: IconData) {
  const svg = formatSVG(icon);

  try {
    await navigator.clipboard.writeText(svg);
    addToast({
      message: `Copied ${icon.name.split("-").join(" ")} to clipboard`,
    });
  } catch (err) {
    console.error("Failed to copy!", err);
  }
}

export function downloadSVG(icon: IconData) {
  const svg = formatSVG(icon);
  const filetype = "data:image/svg+xml;charset=utf-8,";

  const element = document.createElement("a");
  element.setAttribute("href", filetype + encodeURIComponent(svg));
  element.setAttribute("download", `lexicon-${icon.name}-${icon.size}.svg`);
  element.style.display = "none";

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  // addToast({ message: "Check your downloads" });
}

function formatSVG(icon: IconData) {
  const svg = `<svg id="${icon.name}" width="${icon.size}" height="${icon.size}" viewBox="0 0 ${icon.size} ${icon.size}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  const paths = icon.paths
    .map(
      (path) =>
        `<path d="${path}" stroke="black" stroke-width="2" stroke-linejoin="round"/>`
    )
    .join("");
  return svg + paths + "</svg>";
}
