import { Title, useRouteData } from "solid-start";
import { createResource, createSignal, For } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { icons_db } from "~/data/icons";
import { Radio } from "~/components/Radio";
import { Icon } from "~/components/Icon";
import { addToast, dismissToast, toasts } from "~/stores/toast";

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

  const maxStrokeWidth = () => {
    if (activeSize() > 24) return 3;
    else if (activeSize() <= 16) return 1.5;
    else return 2;
  };

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
            <Radio.Item defaultValue={32}>32</Radio.Item>
          </Radio.Group>
          <input
            type="range"
            value={strokeWidth()}
            min={1}
            max={maxStrokeWidth()}
            step={0.1}
            onInput={(e) => update_strokeWidth(e)}
          />
          <button onclick={() => setIsRounded((b) => (b = !b))}>
            {isRounded() ? "Round" : "Square"}
          </button>
          <button onclick={() => setIsScaled((b) => (b = !b))}>Scale</button>
          <button onclick={() => addToast()}>Add Toast</button>
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
      <div class="fixed bottom-0 left-1/2 -translate-x-1/2 pb-8">
        <div class="flex flex-col items-center gap-2">
          <TransitionGroup
            name="toast"
            onEnter={(el, done) => {
              const a = el.animate([], { duration: 200 });
              a.finished.then(done);
            }}
            onExit={(el, done) => {
              const a = el.animate([], { duration: 200 });
              a.finished.then(done);
            }}
          >
            <For each={toasts}>
              {(toast) => {
                console.log("creating " + toast.message);
                return (
                  <button onClick={() => dismissToast(toast.id)}>
                    <div class="flex items-center gap-2 font-medium text-black bg-white shadow-md rounded">
                      <div class="py-2 pl-4 pr-2">{toast.message} </div>
                      <div class="border-l border-black/10 px-3">
                        <svg
                          viewBox="0 0 16 16"
                          width="16"
                          height="16"
                          fill="none"
                        >
                          <path
                            d="M 4 4 L 13 13 M 4 13 L 13 4"
                            stroke="currentColor"
                            stroke-width="1.5"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                );
              }}
            </For>
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}
