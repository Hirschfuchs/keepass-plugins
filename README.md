# Empfohlene KeePass-Plugins
Dieses Repository enthält die KeePass-Plugins, die ich beim Neuaufsetzen von KeePass benutze.
Es ist public, falls jemand Inspiration sucht ;)

## Enthaltene Plugins
Die enthaltenen 5 Plugins sind in der [plugins-Datei](plugins.md) aufgelistet und beschrieben.

## Automation
Die Plugins liegen im Ordner `plugins`.
Das Repo ist so ausgelegt, dass es einfach geklont und direkt in Keepass verwendet werden kann.
Die Plugins werden nach Möglichkeit immer aktuell gehalten.
Automatisiert man sich also ein Pull auf dieses Repository und mounted den Ordner auf den Plugin-Ordner von Keepass, werden die Plugins automatisch aktualisiert.

## Bind-Mount
Der hiermit heruntergeladene Ordner kann nahtlos in KeePass eingebunden werden.
Eine Möglichkeit unter Linux ist, das über git verwaltete Verzeichnis via `bind-mount` an die entsprechende Stelle in Keepass zu binden.
So kann beispielsweise die `fstab`-Datei erweitert werden:

```fstab
/github-repos/keepass-plugins/plugins /usr/share/keepass/Plugins none bind 0 0
```

## Automatische Pulls (Arch)
Damit das Ganze auch fancy vollautomatisch funktioniert, sollen bei jedem Update mittels Pacman auch die Plugins aktualisiert werden.
Dies kann mit ein paar einfachen Schritten erreicht werden:

1. Klonen des Repos an einen beliebigen Ort `github-repos/keepass-plugins`. Optional kann hier der Bind-Mount eingerichtet werden.
2. `/etc/pacman.conf` bearbeiten: Zeile `HookDir` einkommentieren und Ordner merken oder anpassen. Nachfolgend wird der Ordner in dieser Beschreibung als `/etc/pacman.d/hooks` bezeichnet.
3. Ordner `/etc/pacman.d/hooks` erstellen.
4. Datei `/etc/pacman.d/hooks/keepass-plugins.hook` erstellen. Diese Datei ist eine Konfiguration für Hooks, die rund um die Ausführung von Pacman triggern. In der Datei legen wir einen Trigger für ein durchgeführtes Package-Update an, welcher auf ein Script verweist:

```
[Trigger]
Operation = Upgrade
Type = Package
Target = *

[Action]
Description = Update KeePass-Plugins
When = PostTransaction
Exec = /usr/local/bin/update-keepass-plugins.sh
```

6. Script in festgelegter Location (bspw `/usr/local/bin/update-keepass-plugins.sh`) erstellen. Dieses Script sollte eine beliebige Logik zum Updaten des Repos enthalten. In meinem Fall habe ich aktuelle Änderungen gestashed, den aktuellen Stand gezogen und den Stash wieder angewendet:

```shell
#!/bin/sh
REPO_DIR="github-repos/keepass-plugins"

cd "$REPO_DIR" || exit 1

# Änderungen vorübergehend stashen
git stash push -u -m "Auto stash before pull"

# Immer von origin/main pullen
git fetch origin
git checkout main
git pull --rebase origin main

# Stash wieder anwenden
git stash pop || true
```

7. Erfolg prüfen mit `pacman -Syu`.

## Unterstützte Version
Die Plugins sind auf KeePass 2.x ausgelegt und wurden auf Arch Linux getestet.