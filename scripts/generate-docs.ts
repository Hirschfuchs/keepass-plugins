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
      "## Automatische Pulls (Arch)\n" +
      "Damit das Ganze auch fancy vollautomatisch funktioniert, sollen bei jedem Update mittels Pacman auch die Plugins aktualisiert werden.\n" +
      "Dies kann mit ein paar einfachen Schritten erreicht werden:\n" +
      "\n" +
      "1. Klonen des Repos an einen beliebigen Ort `github-repos/keepass-plugins`. Optional kann hier der Bind-Mount eingerichtet werden.\n" +
      "2. `/etc/pacman.conf` bearbeiten: Zeile `HookDir` einkommentieren und Ordner merken oder anpassen. Nachfolgend wird der Ordner in dieser Beschreibung als `/etc/pacman.d/hooks` bezeichnet.\n" +
      "3. Ordner `/etc/pacman.d/hooks` erstellen.\n" +
      "4. Datei `/etc/pacman.d/hooks/keepass-plugins.hook` erstellen. Diese Datei ist eine Konfiguration für Hooks, die rund um die Ausführung von Pacman triggern. In der Datei legen wir einen Trigger für ein durchgeführtes Package-Update an, welcher auf ein Script verweist:\n" +
      "\n" +
      "```\n" +
      "[Trigger]\n" +
      "Operation = Upgrade\n" +
      "Type = Package\n" +
      "Target = *\n" +
      "\n" +
      "[Action]\n" +
      "Description = Update KeePass-Plugins\n" +
      "When = PostTransaction\n" +
      "Exec = /usr/local/bin/update-keepass-plugins.sh\n" +
      "```\n" +
      "\n" +
      "6. Script in festgelegter Location (bspw `/usr/local/bin/update-keepass-plugins.sh`) erstellen. Dieses Script sollte eine beliebige Logik zum Updaten des Repos enthalten. In meinem Fall habe ich aktuelle Änderungen gestashed, den aktuellen Stand gezogen und den Stash wieder angewendet:\n" +
      "\n" +
      "```shell\n" +
      "#!/bin/sh\n" +
      'REPO_DIR="github-repos/keepass-plugins"\n' +
      "\n" +
      'cd "$REPO_DIR" || exit 1\n' +
      "\n" +
      "# Änderungen vorübergehend stashen\n" +
      'git stash push -u -m "Auto stash before pull"\n' +
      "\n" +
      "# Immer von origin/main pullen\n" +
      "git fetch origin\n" +
      "git checkout main\n" +
      "git pull --rebase origin main\n" +
      "\n" +
      "# Stash wieder anwenden\n" +
      "git stash pop || true\n" +
      "```\n" +
      "\n" +
      "7. Erfolg prüfen mit `pacman -Syu`.\n" +
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
