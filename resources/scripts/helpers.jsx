import { MD5 } from "crypto-js";

export function md5(string) {
  return MD5(string.toLowerCase())
}


