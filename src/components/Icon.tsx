import { Accessor, Component, For } from "solid-js";
import { copySVG } from "~/utils/svg";

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
    <div class="group relative flex flex-col p-4 border border-foreground/10 rounded min-h-[240px] hover:bg-blue-700/20 before:absolute before:-top-px before:-left-px before:-right-px before:-bottom-px before:inset-0 before:p-px before:bg-gradient-to-br before:from-blue-600 before:to-fuchsia-600 before:border-gradient-mask before:rounded before:opacity-0 before:transition-opacity ease-out hover:before:opacity-100">
      <div class="flex-center grow">
        <Icon.SVG
          icon={props.icon}
          scaleMultiplier={props.scaleMultiplier}
          strokeWidth={props.strokeWidth}
          isRounded={props.isRounded}
        />
      </div>
      <p class="text-sm text-center capitalize opacity-50">
        {props.icon.name.split("-").join(" ")}
      </p>
      <div class="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-8px)] flex flex-col gap-1.5 p-1 opacity-0 backdrop-blur-sm  transition-opacity ease-out group-hover:opacity-100">
        <button
          class="grow font-medium text-sm invisible bg-foreground/10 group-hover:visible hover:bg-foreground/30"
          onClick={() => copySVG(props.icon)}
        >
          Copy SVG
        </button>
        <button
          class="grow font-medium text-sm invisible bg-foreground/10 group-hover:visible hover:bg-foreground/25"
          onClick={() => alert("hello")}
        >
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
