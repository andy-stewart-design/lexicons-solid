import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  ParentComponent,
  useContext,
} from "solid-js";
import {
  RadioGroupContextValue,
  RadioGroupProps,
  RadioItemProps,
  RadioValue,
  RadioNode,
  RegisterProps,
} from "./radio.types";

export const RadioGroupContext = createContext<RadioGroupContextValue>();

export function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error(
      "`useRadioGroupContext` must be used within a `RadioGroup` component"
    );
  }

  return context;
}

const RadioGroup: ParentComponent<RadioGroupProps> = (props) => {
  const merged = mergeProps({ defaultItem: 1 }, props);
  const [values, setValues] = createSignal<RadioValue[]>([]);
  const [nodes, setNodes] = createSignal<RadioNode[]>([]);
  const [activeIndex, setActiveIndex] = createSignal(merged.defaultItem - 1);
  const uuid: string = crypto.randomUUID().split("-")[0];

  const handleClick = (value: string | number, index: number) => {
    props.setValue(value);
    setActiveIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      if (activeIndex() < values().length - 1) setActiveIndex((i) => (i += 1));
      else setActiveIndex(0);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      if (activeIndex() <= 0) setActiveIndex(values().length - 1);
      else setActiveIndex((i) => (i -= 1));
    }
    props.setValue(values()[activeIndex()].value);
    nodes()[activeIndex()].node?.focus();
  };

  const registerItem = (props: RegisterProps) => {
    let count = 0;
    if (props.type === "value") {
      count = values().length;
      const { uuid, value } = props;
      setValues((items) => [...items, { uuid, value }]);
    } else if (props.type === "node") {
      count = nodes().length;
      const { uuid, node } = props;
      setNodes((nodes) => [...nodes, { uuid, node }]);
    }
    return count;
  };

  const context: RadioGroupContextValue = {
    groupAriaID: uuid,
    register: registerItem,
    activeIndex,
    handleClick,
  };

  onCleanup(() => setNodes([]));

  return (
    <div
      onKeyDown={(e) => handleKeyDown(e)}
      role="radiogroup"
      id={`radiogroup-${uuid}`}
      class="flex justify-center items-center gap-1"
    >
      <RadioGroupContext.Provider value={context}>
        {props.children}
      </RadioGroupContext.Provider>
    </div>
  );
};

const RadioItem: ParentComponent<RadioItemProps> = (props) => {
  let itemRef: HTMLDivElement | undefined;
  const { groupAriaID, register, activeIndex, handleClick } =
    useRadioGroupContext();
  const uuid = crypto.randomUUID().split("-")[0];

  const index = register({ type: "value", uuid, value: props.defaultValue });
  const isSelected = createMemo(() => activeIndex() === index);

  onMount(() => register({ type: "node", uuid, node: itemRef }));

  return (
    <div
      ref={itemRef}
      onClick={() => {
        handleClick(props.defaultValue, index);
      }}
      tabIndex={isSelected() ? 0 : -1}
      id={`radiogroup-${groupAriaID}-radio-${uuid}`}
      role="radio"
      aria-checked={isSelected()}
      class="border border-foreground/10 py-2 px-3 select-none font-medium tabular-nums hover:border-foreground aria-checked:bg-foreground aria-checked:text-background rounded"
    >
      {props.children}
    </div>
  );
};

export const Radio = {
  Group: RadioGroup,
  Item: RadioItem,
};
