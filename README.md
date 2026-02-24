# Apadore Test Task – Kontaktní formulář v patičce

Implementace plně responzivního kontaktního formuláře v patičce webu Daramis.  
Frontend je postaven na **React + Vite**, backend na **Express (Node.js)** se simulací latence a náhodných chyb.

Projekt demonstruje:

- práci s formulářovým stavem v Reactu
- klientskou i serverovou validaci
- řízení asynchronních stavů (idle / loading / success / error)
- ochranu proti edge cases
- responzivní layout bez horizontálního overflow

---

## Architektura komponent: Jak je rozčleněn footer?

Footer je rozdělen do samostatných, logicky oddělených React komponent, aby byla zachována čitelnost, modularita a snadná rozšiřitelnost.

### Struktura:

- **FooterTitle**  
  Velký hero nadpis + podtitulek.  
  Používá `clamp()` a media queries pro škálování font-size mezi desktopem a mobilem.

- **FooterMain**  
  Hlavní layout kontejner.
  - Desktop: dvousloupcový flex layout
  - Mobil: přechod do jednoho sloupce

  Obsahuje:
  - **FooterInfo** – levá část (logo developera, kontaktní údaje, dekorativní SVG)
  - **FooterForm** – pravá část (nejkomplexnější komponenta, obsahuje veškerou formulářovou logiku)

- **FooterDisclaimer**  
  Spodní část s GDPR textem, copyrightem a „made by“.  
  Na mobilu přechází do sloupcového layoutu.

Každá část má vlastní SCSS soubor.

Formulář (`FooterForm`) je izolovaná komponenta s vlastním stavem a neovlivňuje zbytek footeru.

---

## State management a validace

Formulář používá **lokální state pomocí useState**, protože:

- formulář je izolovaný
- není potřeba globální store
- řešení je čitelné a dostačující

### Stavový model:

- **idle**  
  `!isLoading && !isSubmitted`

- **loading**  
  `isLoading = true`  
  → tlačítko „Odesílám…“  
  → `disabled`  
  → prevence vícenásobného submitu

- **success**  
  `isSubmitted = true`  
  → tlačítko „Děkujeme za odeslání!“  
  → reset formuláře  
  → blokace dalšího odesílání

- **client error**  
  Objekt `errors` obsahuje klíče polí  
  → červené rámečky + lokální hlášky + globální upozornění

- **server error**  
  `submitError` obsahuje zprávu z backendu  
  → globální chybová hláška pod tlačítkem

---

## Validace

### Klientská validace

- Ruční funkce `validate()`
- Regulární výrazy (email, telefon)
- `trim()` pro textová pole
- Kontrola povinných polí
- Kontrola souhlasu s GDPR

Validace probíhá před odesláním.

### Serverová validace

Express endpoint obsahuje:

- stejné validační podmínky jako klient
- simulaci latence (800–2000 ms)
- 10% náhodnou chybu

To zajišťuje, že:

- data jsou bezpečná i při obejití klientské validace
- frontend je otestován na chybové scénáře

---

## Rizika a edge cases

### Uživatel klikne na „Odeslat“ 10× za sekundu

Řešení:

```ts
if (isLoading || isSubmitted) return;
```

A zároveň:

```tsx
disabled={isLoading || isSubmitted}
```

Další kliknutí jsou ignorována během probíhajícího requestu nebo po úspěšném odeslání.

---

### API neodpoví (timeout, offline, 500)

- Síťová chyba → zachyceno v `catch`
- Backend vrátí 400/500 → zobrazí se serverová hláška
- Timeout → loading přejde do error stavu

Po chybě:

- tlačítko se znovu aktivuje
- uživatel může odeslat znovu

Možné rozšíření:

- `AbortController` s timeoutem
- retry mechanism

---

## Mobilní verze

Design je plně responzivní (desktop-first přístup s max-width media queries).

### Breakpoint logika:

- **>1243 px** – dvousloupcový layout
- **≤1243 px** – wrapper 100 %
- **≤992 px** – layout do sloupce
- **≤768 px** – pole pod sebou
- **≤576 px** – inputy 100 % šířky
- **≤480 px** – finální úpravy pro malé telefony

### Optimalizace:

- žádný horizontální overflow
- odstranění velkých marginů na mobilu
- vertikální spacing přizpůsoben zařízení

Testováno v DevTools (320–428 px).

---

## Technologie

Frontend:

- React
- Vite
- SCSS
- Fetch API

Backend:

- Node.js
- Express
- CORS
- Simulace latence a náhodných chyb

---

## Spuštění projektu

### Backend

```bash
cd server
npm install
npm run dev
```

Server běží na `http://localhost:5000`

### Frontend

```bash
cd client
npm install
npm run dev
```

Aplikace běží na `http://localhost:5173`

---
