# Ti Ord — Danish Vocabulary Builder

A small, dependency-free web app for building practical Danish vocabulary.

## Features

- Ten common Danish words every day, mixed across word types
- Each unique Supabase-backed username has its own synchronized settings, progress, and Glossary; passwords are optional
- New usernames can first adjust or skip lesson settings, then complete or skip the vocabulary check
- Per-user daily lesson size: 5, 10, or 20 words
- An option to load another full set immediately without waiting for the next day
- Easy, medium, and advanced vocabulary classification in the dedicated Dictionary data layer
- Immediate fallback within a word category when a difficulty level has too few unique words
- 1,000 built-in words: 400 Easy, 400 Medium, and 200 Advanced
- Stable word IDs protect progress when dictionary entries are reordered in future updates
- Click-to-reveal translations and cloud-synchronized progress
- Automatic review of words from the previous day
- Danish → English and English → Danish recall
- Word bingo that only tests revealed or previously presented words; distractors use the full bank
- A synchronized Glossary in its own view, including explanations and related Danish words
- Responsive layout for phone and desktop
- No email verification, dictionary service, or internet search required

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server.

Progress is cached in the browser and synchronized to the selected username through Supabase.

## Dictionary sources

The initial curated vocabulary is supplemented with Danish–English entries from [FreeDict](https://freedict.org/) (GPL-2.0) and ranked using the Danish 2018 list from [FrequencyWords](https://github.com/hermitdave/FrequencyWords) (MIT). Source and frequency metadata are retained on every entry.
