# Salon Meblowy Malinowski — instrukcja wdrożenia

## 1. Wgraj cały ten folder na GitHub

Tak jak poprzednio, tylko tym razem to cały projekt, nie jeden plik:
1. Utwórz nowe repozytorium na GitHub (np. `salon-meblowy-katalog`).
2. Wgraj **całą zawartość tego folderu** (zachowując strukturę podfolderów: `app/`, `sanity/`, `scripts/`, `.github/` itd.) — najłatwiej przez `git` albo przeciągając cały folder w interfejsie "Upload files" (GitHub pozwala przeciągnąć cały folder na raz).

## 2. Dodaj sekrety w ustawieniach repozytorium

W repo: **Settings → Secrets and variables → Actions → New repository secret**. Dodaj dwa:

- `SANITY_PROJECT_ID` = `t8z7ag2u`
- `SANITY_API_TOKEN` = (Twój token typu Editor z panelu Sanity)

## 3. Uruchom migrację danych

Zakładka **Actions** w repo → po lewej wybierz "Migracja katalogu do Sanity" → przycisk **"Run workflow"** → **Run workflow** (zielony przycisk w rozwijanym panelu).

Migracja 428 produktów (z pobieraniem zdjęć) może potrwać od kilkunastu do kilkudziesięciu minut — możesz śledzić postęp na żywo w logu tego uruchomienia. Jeśli coś przerwie migrację w połowie, można ją bezpiecznie uruchomić ponownie — pominie produkty, które już zostały zaimportowane.

## 4. Wdróż stronę na Vercel

1. Na [vercel.com](https://vercel.com) → **Add New → Project** → wybierz to repozytorium.
2. W ustawieniach **Environment Variables** dodaj:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `t8z7ag2u`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
3. Kliknij **Deploy**.

## 5. Zarządzanie produktami na co dzień

Panel administracyjny (Sanity Studio) jest wbudowany w samą stronę — wejdź na:

`https://twoja-domena.pl/studio`

Zaloguj się tym samym kontem, którym zakładałeś Sanity. Tam możesz:
- edytować/dodawać produkty,
- zaznaczać checkbox **"Pokaż na stronie głównej"**, żeby produkt pojawił się w sekcji "Nowości",
- podmieniać zdjęcia bez dotykania kodu.

Zmiany widoczne są na stronie do minuty (bez potrzeby ponownego wdrażania).
