import { Accessor, For, ParentComponent } from "solid-js";
import * as styles from "./icon.css";

interface IconData {
  name: string;
  size: number;
  paths: string[];
  keywords: string[];
}

interface IconSVG {
  icon: IconData;
  strokeWidth: Accessor<number>;
  scaleMultiplier: Accessor<number>;
}

interface IconCardProps {
  icon: IconData;
}

const SVGIcon = ({ icon, strokeWidth, scaleMultiplier }: IconSVG) => {
  return (
    <svg
      width={icon.size * scaleMultiplier()}
      height={icon.size * scaleMultiplier()}
      viewBox={`0 0 ${icon.size} ${icon.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <For each={icon.paths}>
        {(path) => (
          <path
            d={path}
            stroke="currentColor"
            fill="none"
            stroke-width={strokeWidth()}
            stroke-linejoin="round"
          />
        )}
      </For>
    </svg>
  );
};

const IconCard: ParentComponent<IconCardProps> = (props) => {
  return (
    <div class={styles.card}>
      <div class={styles.iconContainer}>{props.children}</div>
      <p class={styles.text}>{props.icon.name.split("-").join(" ")}</p>
    </div>
  );
};

export const Icon = {
  SVG: SVGIcon,
  Card: IconCard,
};
