import { useEffect } from "react";
import { debounce } from "../utils";

export default function useResize(callback: (e: Event) => void, wait = 1000) {
  useEffect(() => {
    const handleResize = wait !== 0 ? debounce(callback, wait) : callback;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback, wait]);
}
