import { CONFIG } from "./envVars.js";

export const ENV = JSON.parse(open("../../environment.json"));

export function getBaseUrl() {
  return ENV[CONFIG.TARGET_ENV][
    CONFIG.USE_INTERNAL_ACCESS_ENV ? "innerBaseUrl" : "baseUrl"
  ];
}

export function getInnerBaseUrl() {
  return ENV[CONFIG.TARGET_ENV]["innerBaseUrl"];
}
