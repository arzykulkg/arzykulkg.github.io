# Арзыкуловтордун санжырасы

Site root = family tree. `education/` = class hub (Global English 7–10 interactive Learner’s/Coursebook + Workbook in `books/`, Grammar Steps A1–A2, Essential Grammar in Use (4th ed.), English Grammar in Use (5th ed., `grammar-in-use-5/`, same Global-style engine as Essential Grammar in Use: book view, Designer Book, flip-book, 145 dialogues, flashcards, game zone, live class), Live Class); not linked from the family tree. Student builds only – no answer keys.

## Features (v11)
- Kyrgyz style (gold-green palette, ornament borders), light/dark, classic style switch (menu).
- Person sheet: age, birthday, relation calculator, gallery, story mode, **bio (өмүр баян)** with verification badge + sources + video links.
- **Санжыра китеби**: menu → "Санжыра китеби (PDF)". Builds a printable book (cover, preface, contents, stats, branches, bios, photos, places, sources, name index). Use the browser's Print → Save as PDF.
- **Көргөзмө режими**: big-screen exhibition (keyboard: arrows, Space = auto tour, F = fullscreen, +/- text size). Videos: YouTube / .mp4 links in bios, or open a local video file.
- Privacy for book/exhibition (default ON): living people show birth year only; under-18s and people marked "жеке" are hidden (dates, photo, bio).

## Data files
- `index.html` — tree data + app (single file).
- `data/bios.js` — bios for everyone (`window.BIOS`) and historical maps for the book (`window.BOOKMAPS`, images in `media/maps/`).
  Family members add bios in the app (saved on their device) → menu "Өмүр баяндарды экспорттоо (bios.js)" → send file → replace `data/bios.js` in this repo.

## Backup (long-term)
1. GitHub keeps full history of this repo (the main copy).
2. Menu → "Толук резерв (JSON)" and "CSV архив (Excel)" — keep copies on Google Drive / a USB stick.
3. Print the book to PDF once a year and keep a paper copy.

## Mobile UI (v11.1)
Bottom nav (Дарак · Издөө · Бутактар · Кошуу · Меню), smart search (ө/о, ү/у, ң/н ignored; "Камалидин Карим" finds by father's name; recent searches), branches list, and a safe "Маалымат кошуу / ката билдирүү" form that prepares a WhatsApp message for the admin (nothing is written to the public tree). Optional: set `window.ADMIN_WA="996XXXXXXXXX"` in `data/bios.js` to send suggestions straight to one WhatsApp number.
