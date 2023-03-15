import { Accessor, Setter } from "solid-js";

export interface RadioGroupContextValue {
  groupAriaID: string;
  activeIndex: Accessor<number>;
  handleClick: (v: string | number, i: number) => void;
  register: (props: RegisterProps) => number;
}

export interface RadioGroupProps {
  value: Accessor<string | number>;
  setValue: Setter<string | number>;
  defaultItem?: number;
  class?: string;
}

export interface RadioItemProps {
  defaultValue: string | number;
  class?: string;
}

export interface RadioValue {
  uuid: string;
  value: string | number;
}

export interface RadioNode {
  uuid: string;
  node: HTMLDivElement | undefined;
}

export interface RegisterValue {
  type: "value";
  uuid: string;
  value: string | number;
}

export interface RegisterNode {
  type: "node";
  uuid: string;
  node: HTMLDivElement | undefined;
}

export type RegisterProps = RegisterValue | RegisterNode;
