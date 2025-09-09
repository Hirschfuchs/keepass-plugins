import * as fs from "node:fs";
import { KeepassPlugin } from "./keepass-plugin.interface";

export const generateDocs = (plugins: ReadonlyArray<KeepassPlugin>) => {
  generateReadme(plugins.length);
  generatePlugins(plugins);
};

const generateReadme = (numberOfPlugins: number) => {
  fs.writeFileSync(
    "README.md",
    "# Empfohlene KeePass-Plugins\n" +
      "Dieses Repository enthält die KeePass-Plugins, die ich beim Neuaufsetzen von KeePass benutze.\n" +
      "Es ist public, falls jemand Inspiration sucht ;)\n" +
      "\n" +
      "## Enthaltene Plugins\n" +
      `Die enthaltenen ${numberOfPlugins} Plugins sind in der [plugins-Datei](plugins.md) aufgelistet und beschrieben.\n` +
      "\n" +
      "## Automation\n" +
      "Die Plugins liegen im Ordner `plugins`.\n" +
      "Das Repo ist so ausgelegt, dass es einfach geklont und direkt in Keepass verwendet werden kann.\n" +
      "Die Plugins werden nach Möglichkeit immer aktuell gehalten.\n" +
      "Automatisiert man sich also ein Pull auf dieses Repository und mounted den Ordner auf den Plugin-Ordner von Keepass, werden die Plugins automatisch aktualisiert.\n" +
      "\n" +
      "## Bind-Mount\n" +
      "Der hiermit heruntergeladene Ordner kann nahtlos in KeePass eingebunden werden.\n" +
      "Eine Möglichkeit unter Linux ist, das über git verwaltete Verzeichnis via `bind-mount` an die entsprechende Stelle in Keepass zu binden.\n" +
      "So kann beispielsweise die `fstab`-Datei erweitert werden:\n" +
      "\n" +
      "```fstab\n" +
      "/github-repos/keepass-plugins/plugins /usr/share/keepass/Plugins none bind 0 0\n" +
      "```\n" +
      "\n" +
      "## Unterstützte Version\n" +
      "Die Plugins sind auf KeePass 2.x ausgelegt und wurden auf Arch Linux getestet.",
  );
};

const generatePlugins = (plugins: ReadonlyArray<KeepassPlugin>) => {
  const pluginsText: string[] = [
    "# Enthaltene Plugins",
    "",
    "| Plugin | Version | Beschreibung |",
    "|--------|---------|--------------|",
  ];

  plugins.forEach((plugin) => {
    pluginsText.push(
      `| ${plugin.name} | ${plugin.version} | ${plugin.description} |`,
    );
  });

  fs.writeFileSync("plugins.md", pluginsText.join("\n"));
};
