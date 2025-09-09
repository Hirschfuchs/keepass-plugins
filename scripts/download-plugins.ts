import { KeepassPlugin } from "./keepass-plugin.interface";
import * as handler from "follow-redirects";
import fs from "node:fs";

export const downloadPlugins = (plugins: ReadonlyArray<KeepassPlugin>) => {
  plugins.forEach((plugin) => {
    console.log(`Downloading ${plugin.name}...`);

    switch (plugin.sourceType) {
      case "github":
        const url = `${plugin.sourceUrl}/releases/download/${plugin.version}/${plugin.fileName}`;
        handler.https.get(url, (response) => {
          if (response.statusCode !== 200) {
            console.error(
              `Failed to download ${plugin.name}`,
              response.statusMessage,
              `URL: ${url}`,
            );
            return;
          }
          const file = fs.createWriteStream(`plugins/${plugin.name}.plgx`);
          response.pipe(file);
        });
        break;
      default:
        console.error(`Unknown source type: ${plugin.sourceType}`);
    }
  });
};
