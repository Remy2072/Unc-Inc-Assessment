# UNC Inc | Assessment

Een Assessement gebouwd voor UNC Inc. waarin gebruikers artikelen kunnen bekijken, aanmaken en beheren. De focus van dit project ligt op een strak design, typeveiligheid en een schaalbare structuur die aansluit bij professionele frontend-omgevingen.

---

## Tech Stack

Voor dit project is gekozen voor een stack die snelheid koppelt aan stabiliteit:

- **React**: De basis van de UI, gekozen vanwege de nauwe aansluiting bij de workflow binnen Unc Inc.
- **Vite**: Gebruikt als build tool voor een razendsnelle development ervaring en optimale bundeling.
- **TypeScript**: De standaard voor moderne projecten om typeveiligheid te garanderen en runtime-fouten te minimaliseren.
- **CSS**: Voor de styling is gekozen voor pure CSS. Omdat het design volledig custom in Figma is ontworpen, bood dit de meeste controle zonder de overhead van een utility-framework.

---

## Gebruikte Libraries

Naast de basis stack zijn de volgende libraries geïmplementeerd voor extra functionaliteit:

| Library                       | Doel                                                                                   |
| :---------------------------- | :------------------------------------------------------------------------------------- |
| **React Router**              | Client-side routing voor soepele navigatie tussen pagina's.                            |
| **Zustand**                   | Lichtgewicht state management voor o.a. de login-status.                               |
| **MSW (Mock Service Worker)** | Simuleert een volledige REST API in de browser voor een realistische data-afhandeling. |
| **React Quill**               | Een krachtige rich text editor voor het schrijven van artikelcontent.                  |

---

## Development Aanpak

De ontwikkeling van dit project is bewust opgesplitst in twee duidelijke fases:

1.  **Fase 1: Statisch Design** Het vertalen van het Figma-ontwerp naar een solide basis van componenten en styling.
2.  **Fase 2: Logica & Data** Het implementeren van routing, state management en de integratie met MSW voor CRUD-functionaliteit (Create, Read, Update, Delete).
3.

### Design Preview

Hieronder zie je het oorspronkelijke ontwerp vanuit Figma:

![Design screenshot](/src/assets/figma.png)

---

## Project Lokaal Draaien

Volg deze stappen om het project op je eigen machine op te starten:

1. **Clone de repository**

    ```bash
    git clone <repo-url>
    ```

2. **Open het project en open daarin de terminal en type in**
    ```bash
    npm install>
    ```
3. **Start de development server**

    ```bash
    npm run dev
    ```

4. **Open de applicatie**

    ```bash
    http://localhost:5173
    ```

5. **Inloggegevens**

Gebruikersnaam: Remy
Wachtwoord: test1234

## Functionaliteit

De applicatie past zich aan op basis van de login-status van de gebruiker.

### Gast (uitgelogd)

- Bekijk de lijst met alle beschikbare artikelen
- Lees de volledige inhoud op de detailpagina van een artikel

### Beheerder (ingelogd)

Zodra je linksonder inlogt, worden de beheerfuncties geactiveerd:

- **Aanmaken:** nieuwe artikelen toevoegen via de rich text editor
- **Bewerken:** bestaande artikelen aanpassen
- **Verwijderen:** artikelen uit de lijst verwijderen
- **Profiel:** je gebruikersnaam en profielfoto worden zichtbaar in de sidebar
