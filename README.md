# Quiz App

> A React quiz app that fetches trivia questions from the [Open Trivia Database](https://opentdb.com) API. Features a countdown timer, star rating, and a Storybook setup for the UI components.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white)

## Features

- Trivia questions fetched from the Open Trivia Database (easy difficulty, multiple choice)
- Answer shuffling using the Fisher-Yates algorithm
- Countdown timer bar per question
- Trophy/score screen at the end
- Storybook stories for the Button component

## Getting Started

```bash
# Install dependencies
npm install

# Run the app
npm start

# Run Storybook
npm run storybook
```

Open `http://localhost:3000` in your browser.

## Tech Stack

- React 17
- Open Trivia Database API
- Storybook v6
- React Testing Library
