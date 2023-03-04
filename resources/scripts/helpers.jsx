import { MD5 } from "crypto-js";
import { lowerCase } from "lodash";

export function md5(string) {
  return MD5(lowerCase(string))
}


