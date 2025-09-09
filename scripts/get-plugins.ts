import fs from "node:fs";
import { KeepassPlugin } from "./keepass-plugin.interface";

export const getPlugins = (): ReadonlyArray<KeepassPlugin> => {
  const pluginData = fs.readdirSync("plugin-data");

  return pluginData.map((singlePlugin: string) =>
    JSON.parse(fs.readFileSync(`plugin-data/${singlePlugin}`, "utf-8")),
  );
};
