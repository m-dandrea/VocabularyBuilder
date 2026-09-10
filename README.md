# Ti Ord — Danish Vocabulary Builder

A small, dependency-free web app for building practical Danish vocabulary.

## Features

- Ten common Danish words every day, mixed across word types
- Separate device-local learner profiles, each with its own fresh progress and glossary
- Unique Supabase-backed usernames synchronize learners, settings and progress across devices; passwords are optional
- Mandatory learner selection before each new browsing session
- Clear select-and-continue profile flow, plus a separate Add new user action
- Optional vocabulary check for new or existing learners; known words enter the Glossary and are excluded from future lessons
- Per-learner daily lesson size: 5, 10, or 20 words
- An option to load another full set immediately without waiting for the next day
- Easy, medium, and advanced vocabulary classification in the dedicated Dictionary data layer
- Immediate fallback within a word category when a difficulty level has too few unique words
- 439 built-in everyday words: enough new material for more than six weeks before any rotation
- Click-to-reveal translations and device-local progress
- Automatic review of words from the previous day
- Danish → English and English → Danish recall
- Word bingo that only tests revealed or previously presented words; distractors use the full bank
- A device-local glossary in its own view, including explanations and related Danish words
- Responsive layout for phone and desktop
- No account, API, dictionary service, or internet search required

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server.

Progress is stored only in the browser using `localStorage`.
