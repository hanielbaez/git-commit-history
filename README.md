# Git Commit History

**By:** Haniel Baez

<p align="center">
  <img src="https://github.com/hanielbaez/git-commit-history/blob/main/screenshot.png" alt="Git Commit History" width="600">
</p>


## Description

This app displays the commit history of a public GitHub repository. You can use the search bar to view commit history for any public GitHub repository.

The project consists of a backend built with Nest.js and a frontend built with Remix Run.

## Table of Contents

- [Getting the App from Github](#getting-the-app-from-github)

- [Running the App](#running-the-app)

- [Usage](#usage)

- [Test](#test)

- [API Swagger Documentation](#api-swagger-documentation)

- [Docker](#docker)

- [Important Note about GitHub API Limit](#important-note-about-gtHub-api-limit)

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

## API Swagger Documentation

Once the backend is running, Swagger documentation is available at:

http://localhost:3000/api

## Docker

Verify that Docker is installed correctly and running, you can run the following command:

```bash
$ docker --version
```

Create a network

```bash
$ docker network create git-network --driver bridge
```

\*Note: The commands below must be executed from the project's root directory

Build the Docker image for the backend:

```bash
$ docker build -t git-commit-backend -f ./backend/backend.dockerfile ./backend
```

Run the Docker container, mapping port 3000 on your local machine to port 3000 in the container:

```bash
$ docker run -d --name git-commit-backend-container --network git-network -p 3000:3000 git-commit-backend
```

### Frontend

Build the Docker image for the frontend:

```bash
$ docker build -t git-commit-frontend -f ./frontend/frontend.dockerfile ./frontend
```

Run the Docker container, mapping port 3003 on your local machine to port 3003 in the container:

```bash
$ docker run --name git-commit-frontend-container --network git-network -p 3003:3003 -e API=http://git-commit-backend-container:3000 git-commit-frontend
```

## Important Note about GitHub API Limit

Please be aware that the GitHub API has rate limits for unauthenticated API calls. If you plan to use or test this application extensively, we recommend generating a personal GitHub token.

### Steps to Generate GitHub Token

1. Go to your GitHub account settings.
2. Navigate to the "Developer settings" section.
3. Click on "Personal access tokens" and then "Generate new token."
4. Give the token a name, select the required permissions (generally 'repo' and 'read:user' should suffice for this app), and generate the token.
5. Copy the generated token.

### Using the Token in the Application

Save the generated token in a `.env` file under the `backend` subfolder with the following format:

`GITHUB_TOKEN=your_generated_token_here`

This will allow the application to make authenticated GitHub API calls.
