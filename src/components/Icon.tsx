import { Accessor, Component, For } from "solid-js";
import { copySVG } from "~/utils/svg";
import * as styles from "./icon.css";

export interface IconData {
  name: string;
  size: number;
  paths: string[];
  keywords: string[];
}

interface IconProps {
  icon: IconData;
  strokeWidth: Accessor<number>;
  scaleMultiplier: Accessor<number>;
  isRounded: Accessor<boolean>;
}

const IconCard: Component<IconProps> = (props) => {
  return (
    <div class={styles.card}>
      <div class={styles.icon_container}>
        <Icon.SVG
          icon={props.icon}
          scaleMultiplier={props.scaleMultiplier}
          strokeWidth={props.strokeWidth}
          isRounded={props.isRounded}
        />
      </div>
      <p class={styles.text}>{props.icon.name.split("-").join(" ")}</p>
      <div class={styles.overlay}>
        <button class={styles.overlay_btn} onClick={() => copySVG(props.icon)}>
          Copy
        </button>
        <button class={styles.overlay_btn} onClick={() => alert("hello")}>
          Download
        </button>
      </div>
    </div>
  );
};

const SVGIcon: Component<IconProps> = (props) => {
  return (
    <svg
      width={props.icon.size * props.scaleMultiplier()}
      height={props.icon.size * props.scaleMultiplier()}
      viewBox={`0 0 ${props.icon.size} ${props.icon.size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <For each={props.icon.paths}>
        {(path) => (
          <path
            d={path}
            stroke="currentColor"
            stroke-width={props.strokeWidth()}
            stroke-linecap={props.isRounded() ? "round" : "butt"}
            stroke-linejoin="round"
          />
        )}
      </For>
    </svg>
  );
};

export const Icon = {
  SVG: SVGIcon,
  Card: IconCard,
};
