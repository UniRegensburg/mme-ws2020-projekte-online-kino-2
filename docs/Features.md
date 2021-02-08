# Features für Cinema4Us

[Notieren und beschreiben Sie hier alle wesentlichen Funktionen bzw. *Features* Ihrer Anwendung. Seien Sie möglichst ausführlich in der Dokumentation und beachten Sie für die Erläuterungen ("Beschreibung") die Perspektive Ihrer NutzerInnen. Schätzen Sie initial den wahrscheinlichen Aufwand - auch um diese Schätzung am Ende des Projekts mit dem tatsächlichen Aufwand vergleichen zu können. Priorisieren Sie die Features hinsichtlich des zentralen *Use Case* Ihrer Anwendung und notieren Sie, welche größeren Bereiche der Anwendung von diesen Funktionen betroffen sind]

| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| **HTML/CSS - Grundgerüst** | Ein HTML/CSS - Grundgerüst, um der Anwendung eine Benutzeroberfläche geben zu können, wo alle benötigten grafischen Bausteine für weitere     Features inbegriffen sind | kritisch | Unter normalen Bedingungen: 1 - 2 Tage | app |
| **Video Player** | In diesem Bereich werden die gemeinsam zu betrachtenden Videos angeschaut, welche entweder per Link retrievt oder von den Nutzern hochgeladen wurden | kritisch | ca.1 Tag | app |
| **Raumerstellung/-Beitritt/-Löschen** | Dieses Feature soll den Nutzern die Möglichkeit bieten sich einen eigenen Raum zu erstellen und ihm beizutreten, wo sie sich das Video anschauen können| kritisch | ca.1 Tag | app/server |
| **Gemeinsames Anschauen** | Hierbei soll den Nutzern auch die Möglichkeit geboten werden, sich auch wirklich gleichzeitig dasselbe Video anschauen zu können| kritisch | ca.2-3 Tage | server |
| **Playlist** | Eine Playlist für die Videos, wo die Leute bei Bedarf(und den ihnen verliehenen Rechten) Videos dort einreihen, hinzufügen oder entfernen können| kritisch | ca. 1-3 Tage | server/app | 
| **Chat/Kommentarfunktion** | Ein Chatfenster, in welchen die Nutzer die Möglichkeit haben, Kommentare bzw. Äußerungen zum Video zu tätigen| kritisch | ca. 2-4 Tage | server/app |
| **Video-Upload** | Die Möglichkeit entweder per Video-Link (für Webvideos) oder per Datei-Upload (Videos von der Festplatte)| kritisch | ca. 1-3 Tage | server/app|
| **Videos abspeichern** | Hierbei sollen die Videos in einer eigenen Videothek gespeichert werden, damit der Nutzer bei bedarfsfall sich die Videos nach dem erneuten Öffnen des Browsers anschauen kann | hoch | ca. 1-3 Tage | server |
| **Integration von Webcam und Mikrofon** | Hiermit sollen die Nutzer die Möglichkeit haben im Raum ihre Webcams bzw. Mikrofone nutzen zu können, um wie bei Zoom auch eine Meeting-Atmosphäre herstellen zu können (mit entsprechenden Mute-Funktionen seitens des Hosts)| optional | ca. 1-3 Tage | server/app |
| **Rechtevergabe** | Hiermit sollen dem Host die Möglichkeiten gegeben werden, den Teilnehmern entsprechende Rechte zu erteilen bzw. zu entziehen ( z.b die Befugnis im Chat zu schreiben wenn man spamt)| optional | ca. 3-5. Tage | server/app |


## Umsetzung

[Beschreiben Sie kurz das geplante Vorgehen bei der Umsetzung der Features. Entwerfen Sie dazu ein oder mehrere *Vertical Slices* anhand derer Sie den zentralen *Use Case* der Anwendung implementieren werden. Geben Sie an, wann welche Funktionen (und in welchem Vollständigkeitsgrad) implementiert werden. Begründen Sie kurz die gewählte Reihenfolge. ]
