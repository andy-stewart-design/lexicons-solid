import { Title, useRouteData } from "solid-start";
import { createResource, createSignal, For } from "solid-js";
import { icons_db } from "~/data/icons";
import { Radio } from "~/components/Radio";
import { Icon } from "~/components/Icon";

interface Icon {
  name: string;
  size: number;
  paths: string[];
  keywords: string[];
}

export function routeData() {
  const [icons] = createResource(async () => {
    const response = icons_db
      .map((icon) => {
        const sizes = Object.keys(icon.sizes);
        const paths = Object.values(icon.sizes);

        const data = sizes.map((size, index) => ({
          name: icon.name,
          size: Number(size),
          paths: paths[index],
          keywords: icon.keywords,
        }));

        return data;
      })
      .flat();
    return response;
  });

  return { icons };
}

export default function Home() {
  const { icons } = useRouteData<typeof routeData>();

  const [activeSize, setActiveSize] = createSignal(24);
  const [strokeWidth, setStrokeWidth] = createSignal(1.5);
  const [isRounded, setIsRounded] = createSignal(false);
  const [isScaled, setIsScaled] = createSignal(false);

  const filteredIcons = () => {
    if (icons() === undefined) return;
    return icons()!.filter((icon) => icon.size === Number(activeSize()));
  };
  const scaleMultiplier = () => (isScaled() ? 1.5 : 1);

  const update_strokeWidth = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setStrokeWidth(Number(target.value));
  };

  return (
    <>
      <Title>Lexicons | OSS Icon Library</Title>
      <main>
        <section class="flex justify-center items-center gap-8 p-4 pb-0">
          <Radio.Group
            value={activeSize}
            setValue={setActiveSize}
            defaultItem={3}
          >
            <Radio.Item defaultValue={16}>16</Radio.Item>
            <Radio.Item defaultValue={20}>20</Radio.Item>
            <Radio.Item defaultValue={24}>24</Radio.Item>
          </Radio.Group>
          <input
            type="range"
            value={strokeWidth()}
            min={1}
            max={2}
            step={0.1}
            onInput={(e) => update_strokeWidth(e)}
          />
          <button onclick={() => setIsRounded((b) => (b = !b))}>
            {isRounded() ? "Round" : "Square"}
          </button>
          <button onclick={() => setIsScaled((b) => (b = !b))}>Scale</button>
        </section>
        <section>
          <ul class="grid grid-cols-icons gap-4 p-4">
            <For each={filteredIcons()}>
              {(icon) => (
                <Icon.Card
                  icon={icon}
                  scaleMultiplier={scaleMultiplier}
                  strokeWidth={strokeWidth}
                  isRounded={isRounded}
                ></Icon.Card>
              )}
            </For>
          </ul>
        </section>
      </main>
    </>
  );
}
