# Overlevering – Potetbua redesign

## Cookie-samtykke: automatisk domenebytte

Originalsiden (potet-bua.no) bruker Cookiebot for cookie-samtykke, registrert
på deres eget domene med denne CBID-en: `5b94dcec-3020-4d5f-bcdf-26d534274faf`.

`app.js` sjekker `window.location.hostname` mot `LIVE_DOMAINS` ("potet-bua.no",
"www.potet-bua.no"):

- **På potet-bua.no / www.potet-bua.no:** koden laster automatisk inn Potetbuas
  ekte, allerede-registrerte Cookiebot-script (samme CBID som originalen).
- **På alle andre domener** (denne demoen på GitHub Pages, eller et helt nytt
  domene): koden bruker en selvbygd, avhengighetsfri cookie-banner med samme
  tekst, kategorier og knapper som originalens Cookiebot-oppsett. Dette unngår
  Cookiebots domene-mismatch-feil (scriptet er registrert på potet-bua.no og
  vil klage hvis det lastes på et annet domene).

**Hvis kunden ender opp med et helt ANNET domene enn potet-bua.no:** ikke legg
det til i `LIVE_DOMAINS` automatisk. Cookiebot-CBID-en over er registrert på
det gamle domenet, og vi har ikke tilgang til kundens Cookiebot-konto for å
registrere et nytt domene der. Den selvbygde banneren fungerer fint på et nytt
domene som den er; gi beskjed til kunden om at de (eller vi, hvis de gir oss
tilgang til Cookiebot-kontoen deres) må registrere det nye domenet i Cookiebot
hvis de ønsker å bruke sitt eksisterende oppsett videre.

## Ting som bevisst IKKE er bygget

- **Kontaktskjema og jobbsøknadsskjema:** originalen har innebygde skjemaer
  (sannsynligvis via POWr) for kontakt, jobbsøknad og bildeopplasting. Disse
  er ikke gjenskapt her, siden en statisk GitHub Pages-side ikke kan ta imot
  innsendinger. E-postadressen `post@potetbua24.no` er i stedet vist direkte
  og prominent overalt hvor originalen hadde skjema.
- **Live Instagram-feed:** originalen viser et innebygd Instagram-feed-widget
  (POWr) med ekte bilder. Her er et lite, fast utvalg av de samme ekte bildene
  (hentet fra det speilede innholdet) brukt i stedet, siden en løpende feed
  krever en betalt tredjepartswidget-konto.

## Ekte innhold som er bevart uendret

Alle 11 avdelingers adresser og åpningstider, alle menypriser og allergener
(inkludert Tollerud E18 sin egen meny), alle 11 arrangementene for 2026, alle
6 kundeanmeldelsene, alle 7 stillingsutlysningene, og alle ekte bestillingslenker
til Foodora/Wolt per avdeling er hentet direkte fra potet-bua.no og ikke endret
i innhold (kun presentasjon).
