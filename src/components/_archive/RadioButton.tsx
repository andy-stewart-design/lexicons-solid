import { JSXElement } from "solid-js";

export interface RadioButton {
  children: JSXElement;
  value: string;
}

const Radio = (props: RadioButton) => props as unknown as JSXElement;

export default Radio;
