import { RefObject, useRef } from "react";

type focusSupported =
  | HTMLInputElement
  | HTMLButtonElement
  | HTMLSelectElement
  | HTMLAnchorElement;

interface useFocusReturnType<T> extends Array<RefObject<T> | (() => void)> {
  0: RefObject<T>;
  1: () => void;
}

export const useFocus = <T extends focusSupported>(): useFocusReturnType<T> => {
  const htmlRef = useRef<T>(null);
  const setFocus = () => {
    htmlRef.current && htmlRef.current.focus();
  };

  return [htmlRef, setFocus];
};
