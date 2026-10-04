import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fivenightsatdiddys.game",
  appName: "Five Nights at Diddy's",
  webDir: "dist-mobile",
  bundledWebRuntime: false,
  android: {
    backgroundColor: "#000000",
  },
};

export default config;
