import { MD5 } from "crypto-js";

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function md5(string) {
  return MD5(string.toLowerCase())
}


