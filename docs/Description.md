## Cinema4US 

Die Anwendung Cinema4Us soll Nutzerinnen und Nutzern erlauben gemeinsam YouTube Videos anzusehen und sich gemeinsam dazu im Chat auszutauschen.

## Starten der Anwendung

1. **Einmaliges** Ausführen des Befehls `npm install` im Terminal, um die notwendigen Abhängigkeiten zu installieren.

2. Ausführen des Befehls `npm start` um die Anwendung zu starten. Die Web-Anwendung ist anschließend über die die Adresse `http://localhost:5500/app/` erreichbar.

## Funktionen der Anwendung

Zunächst kann der Nutzer auf dem Startscreen eine einmalige Raum ID generieren. Diese ID wird das dafür vorhergesehene Feld (unter der generierten ID) eingetragen. Durch Klick auf die Enter-Taste gelangt man automatisch zum erstellten Raum. Wenn andere Nutzer diesen Raum auch betreten möchten, muss die Person, die die ID generiert hat diese vorher mit ihnen teilen (z.B. durch einen Messenger). 

![image](https://user-images.githubusercontent.com/53038745/112994413-7fb41000-916a-11eb-9b4c-a6e79bf694a8.png)

Tritt eine Person erst zu einem späteren Zeitpunkt in den Raum, findet diese einen leeren Raum vor. D.h. bereits in die Playlist eingefügte Videos oder Nachrichten im Chat sind zu diesem Zeitpunkt nicht sichtbar. Damit die neu eingetretene Person den aktuellen Stand sieht, reicht es aus, wenn einer der Mitglieder, die sich bereits im Raum befinden auf den `Sync` Button klickt. Dann wird bei allen neu eingetretenen Personen der aktuelle Stand sichtbar. Die neu eingetretene Person kann hierzu z.B. den integrierten Chat nutzen. 

Die Hauptelemente im Raum sind das Videofeld mit zugehörigen Steuerungselementen, die Playlist und der Chat. 
Die Nutzer können die gewünschte YouTube URL in das vorhergesehene Feld eintragen. Das Video erscheint dann automatisch bei allen Raummitgliedern in der Playlist. Die einzelnen Videos in der Playlist können durch Anklicken ausgewählt werden oder werden anderenfalls nacheinander abgespielt. Zunächst wird das ausgewählte Video nur lokal bei der Person, die es ausgewählt hat, angezeigt. Durch die Bestätigung mittels Sync Button, wird das Video synchron bei allen Mitgliedern im Raum angezeigt und abgespielt. 

Durch die Buttons `Play` und `Pause` können alle Raummitglieder das Video synchron starten oder pausieren. Die Steuerungselemente im Video selbst haben nur eine lokale Auswirkung auf das Video. 

Will man die abzuspielende Position des Videos ändern, soll zunächst die gewünschte Zeit auf der Zeitleiste ausgewählt werden. Um diesen Stand bei allen Raummitgliedern zu synchronisieren soll erneut der Play-Button verwendet werden. 

Die `Shuffle` Funktion bringt die Playlist in eine zufällige Reihenfolge, die `Dauer-Absteigend` Funktion sortiert die Videos der Länge nach absteigend und die `Reverse` Funktion dreht die Reihenfolge der Playlist um, sodass das zuletzt hinzugefügte Video als nächstes abgespielt wird.

![image](https://user-images.githubusercontent.com/53038745/112992718-b852ea00-9168-11eb-8a5b-f07897f8d2b9.png)

Im Chat können Nachrichten ausgetauscht werden, indem die Nutzer den gewünschten Text eingeben und absenden. Jeder Nutzer hat einen zufällig generierten Namen. Außerdem ist jede Nachricht mit einem Zeitstempel versehen. 

![image](https://user-images.githubusercontent.com/53038745/112993654-b9d0e200-9169-11eb-84cb-77a350c3a2ce.png)

Soll die Sitzung beendet werden, reicht es aus, wenn alle Mitglieder den Raum verlassen. Alle vorhandenen Daten (Videos in der Playlist und Nachrichten im Chat) werden gelöscht, sobald das letzte Mitglied den Raum verlassen hat.

