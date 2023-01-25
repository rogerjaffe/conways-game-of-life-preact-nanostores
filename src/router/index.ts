import { createRouter } from "@nanostores/router";

export const router = createRouter({
  play: "/",
  settings: "/settings",
} as const);
