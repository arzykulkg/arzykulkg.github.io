# Арзыкуловтордун санжырасы

Site root = family tree. `education/` = Global English, Essential Grammar in Use, Live Class (not linked from the family tree).

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
