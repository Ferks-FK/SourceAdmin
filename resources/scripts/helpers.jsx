import { MD5 } from "crypto-js";
import { lowerCase } from "lodash";
import { useRef } from "react";

export function md5(string) {
  return MD5(lowerCase(string))
}

export function useDebounce(fn, delay) {
  const timeoutRef = useRef(null)

  function debouncedFn(...args) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn
}
