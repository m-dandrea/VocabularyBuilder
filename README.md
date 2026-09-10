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
- 439 built-in everyday words: enough new material for more than six weeks before any rotation
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
