# Features für Cinema4Us

[Notieren und beschreiben Sie hier alle wesentlichen Funktionen bzw. *Features* Ihrer Anwendung. Seien Sie möglichst ausführlich in der Dokumentation und beachten Sie für die Erläuterungen ("Beschreibung") die Perspektive Ihrer NutzerInnen. Schätzen Sie initial den wahrscheinlichen Aufwand - auch um diese Schätzung am Ende des Projekts mit dem tatsächlichen Aufwand vergleichen zu können. Priorisieren Sie die Features hinsichtlich des zentralen *Use Case* Ihrer Anwendung und notieren Sie, welche größeren Bereiche der Anwendung von diesen Funktionen betroffen sind]

| Feature | Beschreibung | Priorität | Geschätzter Aufwand | Betroffene Schichten |
|---------|--------------|-----------|--------------------|---------------------|
| **HTML/CSS - Grundgerüst** | Ein HTML/CSS - Grundgerüst, um der Anwendung eine Benutzeroberfläche geben zu können, wo alle benötigten grafischen Bausteine für weitere      Features inbegriffen sind | kritisch | Unter normalen Bedingungen: 1 - 2 Tage | app |
| **HTML/CSS - Ausgestaltung/Ästhetik** | Ausgestaltung vom CSS und HTLM dahingehend, dass sich die Nutzer bei der Seite grafisch an ein Kino erinnert fühlen (wie ein Kinosaal z.B im Cinemaxx) | hoch | Unter normalen Bedingungen: 1 - 2 Tage | app |
| **Video Player** | In diesem Bereich werden die gemeinsam zu betrachtenden Videos angezeigt, welche  per Link von Youtube retrievt werden | kritisch | ca.1 Tag | app |
| **Raumerstellung/-Beitritt/-Löschen** | Dieses Feature soll den Nutzern die Möglichkeit bieten sich einen eigenen Raum zu erstellen und ihm beizutreten, wo sie sich das Video anschauen können. Einer der Nutzer erstellt hierbei den Raum, wobei auch ein Link zu diesem Raum generiert wird. Dieser Link wird dann den anderen Personen vom Ersteller übermittelt und darüber können die anderen Nutzer dann beitreten. Der Raum ist hierbei persistent gespeichert und ist nur durch diesen Link erreichbar. Bei Bedarf können die Nutzer per Button den Raum löschen, sollten diese keinen Bedarf mehr an ihn haben. Nur der Host in diesem Raum besitzt sämtliche Rechte. Wenn der Host den Raum verlässt wird die Sitzung auch entsprechend für alle anderen Nutzer beendet (z.B wie bei Zoom, wo das Velassen des Raumes durch den Host die Sitzung beendet wird).| kritisch | ca.2 Tage | app/server |
| **Gemeinsames Anschauen** | Hierbei soll den Nutzern auch die Möglichkeit geboten werden, sich auch wirklich gleichzeitig dasselbe Video anschauen zu können. Die Nutzer betrachten das Video hierbei alle synchron, bei derselben Zeit, wenn ein Nutzer das Video pausiert, vor- oder zurückspult, dann passiert dasselbe bei allen anderen Nutzern.| kritisch | ca.4-6. Tage | server |
| **Playlist** | Eine Playlist für die Videos, wo die Leute bei Bedarf Videos dort einreihen können. Die Nutzer können hierbei durch einfügen des entsprechenden Link ein Video in die Warteschleife einreihen, der Host kann  bei Bedarf die Position der Videos in der Liste verändern.| kritisch | ca. 1-3 Tage | server/app | 
| **Chat/Kommentarfunktion** | Ein ins Interface integrierter Chat, in welchen die Nutzer die Möglichkeit haben, Kommentare bzw. Äußerungen zum Video zu tätigen. Der Chat ist hierbei synchron, jeder Nutzer kann lesen was geschrieben wurde, jeder Eintrag wird per Zeitstempel markiert.| kritisch | ca. 2-4 Tage | server/app |
| **Preview-Funktion des Timestamps** | Beim Hovern über einem vom Nutzer gesetzten Timestamp wird dem Nutzer der betreffende Videoabschnitt in einem kleinen Dialog angezeigt, wo der Nutzer sich den Abschnitt anschauen kann, ohne das Hauptvideo zu pausieren| optional | ca. 1-3 Tage | server/app|
| **Integration von Mikrofon** | Hiermit sollen die Nutzer die Möglichkeit haben im Raum ihre Mikrofone nutzen zu können, um wie bei Zoom auch eine Meeting-Atmosphäre herstellen zu können. Die Nutzer können hierbei der Seite die Berechtigung erteilen ihr Mikrofon zu nutzen. | optional | ca. 1-3 Tage | server/app |



## Umsetzung

[Beschreiben Sie kurz das geplante Vorgehen bei der Umsetzung der Features. Entwerfen Sie dazu ein oder mehrere *Vertical Slices* anhand derer Sie den zentralen *Use Case* der Anwendung implementieren werden. Geben Sie an, wann welche Funktionen (und in welchem Vollständigkeitsgrad) implementiert werden. Begründen Sie kurz die gewählte Reihenfolge. ]


<img align="left" height="300" src="https://github.com/UniRegensburg/mme-ws2020-projekte-online-kino-2/blob/master/docs/assets/Vertical_Slices_final_version.jpg" />

Alle hier aufgelisteten Bestandteile des Slices wurden im Verlaufe des ´Projekts implementiert, hierbei handelt es sich um die kritischen/wichtigsten Features, die Optionalen Features konnten aufgrund von Zeitmangel/technischen Problemen nicht implementiert werden. Die Features wurden hierbei in der Reihenfolge von oben nach unten implementiert, im Verlaufe des Projektes, wobei die Reihenfolge nicht streng eingehalten wurde, da aufgrund Variabler Faktoren die Fortschritte bei den jeweiligen Fetures verschieden waren und viele Teile auch parallel entwickelt wurden. Diese Reihenfolge wurde so gewählt, um eine Möglichst effiziente Aufteilung der Arbeit auf die einzelnen Gruppenmitglieder zu haben, mit den verschiedenen Interface-Stufen als "Checkpoint" um dann den jeweiligen Zwischenstand zu erfassen.

