type LogicalToastPosition =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end";
type ToastPositionWithLogical =
  | LogicalToastPosition
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right";
type ToastPosition = Exclude<ToastPositionWithLogical, LogicalToastPosition>;

export enum ToastStatus {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

export interface SimpleToastProps {
  title: string;
  description?: string;
  status?: ToastStatus;
  position?: ToastPosition;
}
