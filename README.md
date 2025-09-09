# Empfohlene KeePass-Plugins

Dieses Repository enthält die KeePass-Plugins, die ich beim Neuaufsetzen von KeePass benutze.
Es ist public, falls jemand Inspiration sucht ;)

## Enthaltene Plugins

Die enthaltenen 4 Plugins sind in der [plugins-Datei](plugins.md) aufgelistet und beschrieben.

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

## Unterstützte Version

Die Plugins sind auf KeePass 2.x ausgelegt und wurden auf Arch Linux getestet.
