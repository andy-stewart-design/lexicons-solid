import { createStore } from "solid-js/store";

export interface Toast {
  message: string;
  id?: string;
  type?: string;
  dismissible?: boolean;
  timeout?: number;
}

export const [toasts, setToasts] = createStore<Toast[]>([]);
let toastIndex = 1;

export function addToast(props?: Toast) {
  const id = crypto.randomUUID();

  const defaults: Toast = {
    id,
    message: `Default message ${toastIndex}`,
    type: "success",
    dismissible: true,
    timeout: 3000,
  };

  if (props) {
    const newToast: Toast = { ...defaults, ...props };
    setToasts([...toasts, newToast]);
    if (newToast.timeout) setTimeout(() => dismissToast(id), newToast.timeout);
  } else {
    setToasts([...toasts, defaults]);
    setTimeout(() => dismissToast(id), defaults.timeout);
    toastIndex++;
  }
}

export function dismissToast(id: string | undefined) {
  if (!id) return;
  const newToasts = toasts.filter((t) => t.id !== id);
  setToasts(newToasts);
}
