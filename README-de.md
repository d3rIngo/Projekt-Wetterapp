# Wetter-Now-App

Dies ist eine Wetter-App, die mit Next.js erstellt wurde, einem React-Framework zum Erstellen von serverseitig gerenderten und statisch generierten Webanwendungen. Tailwind CSS wird für das Styling verwendet und bietet ein Utility-First-CSS-Framework, das eine schnelle Entwicklung und Anpassung ermöglicht. Die Anwendung ruft Wetterdaten von der OpenWeather API ab, um Echtzeit-Wetterinformationen bereitzustellen.

For the English version of this README, click [here](./README.md).

## Live Demo

Schauen Sie sich die App auf Vercel an:

[<img src="./src/app/favicon.ico" alt="Wetter Now" width="50">](https://wetter-now.vercel.app)
[Wetter Now](https://wetter-now.vercel.app)

## Features
- Geben Sie einen Ort oder eine Postleitzahl ein, um aktuelle Wetterdaten abzurufen
- Sehen Sie sich aktuelle Wetterbedingungen wie Temperatur, Wetterzustand und Luftfeuchtigkeit an
- Erhalten Sie eine 3-Tage-Wettervorhersage
- Dynamische Hintergrundfarbe basierend auf den Wetterbedingungen

## Verwendete Technologien
- Next.js
- Tailwind CSS
- OpenWeather API
- ESLint
- GitHub Actions (für CI/CD)
- Cypress (für End-to-End Testing)
- Vercel (für Bereitstellung und Hosting)

## CI/CD Pipeline

Die Continuous Integration/Continuous Deployment (CI/CD)-Pipeline ist mithilfe von GitHub Actions eingerichtet. Die CI/CD-Pipeline automatisiert den Prozess des Erstellens, Testens und Bereitstellens der Anwendung.

## Tests

Cypress wird für End-to-End-Tests verwendet, um sicherzustellen, dass die Anwendung ordnungsgemäß funktioniert.

## Leistungsoptimierung

Das Speed Insights-Tool von Vercel wird verwendet, um die Leistung der Anwendung zu analysieren und zu optimieren.


## Schritte zur Einrichtung

Klonen Sie zunächst das Repository:

```bash
git clone https://github.com/d3rIngo/Projekt-Wetterapp.git
cd Projekt-Wetterapp
```

Installieren Sie dann die Abhängigkeiten:

```bash
npm install
```
## API-Schlüssel einrichten

Stellen Sie sicher, dass Sie einen API-Schlüssel für die OpenWeather API in Ihren Umgebungsvariablen hinzufügen. Erstellen Sie eine Datei namens .env.local im Stammverzeichnis Ihres Projekts und fügen Sie die folgende Zeile hinzu:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=Ihr_API-Schlüssel_hier
```

## Starten des Servers

Führen Sie den Befehl aus:

```bash
npm run dev
```

Öffnen Sie http://localhost:3000 in Ihrem Browser, um die Anwendung zu sehen.

## Bereitstellung auf Vercel
Der einfachste Weg, Ihre Next.js-Anwendung bereitzustellen, ist die Verwendung der Vercel-Plattform der Entwickler von Next.js.

Weitere Details finden Sie in der [Next.js](https://nextjs.org/docs/pages/building-your-application/deploying) Bereitstellungsdokumentation.