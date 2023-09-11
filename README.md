# Git Commit History

**By:** Haniel Baez

## Description

This app displays the commit history of a public GitHub repository. You can use the search bar to view commit history for any public GitHub repository.

The project consists of a backend built with Nest.js and a frontend built with Remix Run.

## Table of Contents

- [Getting the App from Github](#getting-the-app-from-github)

- [Running the App](#running-the-app)

- [Usage](#usage)

- [Test](#test)

- [API Swagger Documentation](#api-swagger-documentation)

---

## Getting the App from Github

1. Fork the repository.

2. Clone the repository.

```bash

$  git  clone  https://github.com/hanielbaez/git-commit-history

```

To develop and run this locally, you'll need:

- Node (version 16.15.1)

- A good IDE (e.g., VisualStudio Code)

- Node Version Manager (optional but recommended)

Check your Node version:

```bash

$  node  -v

16.15.1

```

---

### Running the App

Make sure you are in the root directory:

```bash

$  pwd

/Users/[YOU_USER]/[PARENT_DIR]/git-commit-history

```

#### Backend

Install backend dependencies and start:

```bash

$  cd  backend && npm  i && npm  run  start

```

### Frontend

In a new terminal tab, without closing the current one:

```bash

$  cd  ..

$  pwd

/Users/[YOU_USER]/[PARENT_DIR]/git-commit-history

$  cd  frontend && npm  i && npm  run  start

```

Once completed, navigate to:

http://localhost:3003/

## Usage

The app contains a search box pre-filled with the link to the GitHub repository hosting this project. Click the right arrow to load all commits in descending order (latest commits first). Use the app to search for any open GitHub repository.

## Test

### Backend Test

Unit tests with Jest have been implemented. To execute, go to the backend directory:

```bash
$ cd backend
$ npm run test`
```

### Frontend Test

Unit tests for the frontend have been implemented. To execute, go to the frontend directory:

```bash
$ cd frontend
$ npm run test`
```
