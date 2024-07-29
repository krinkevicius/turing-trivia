# Multiplayer Trivia Game

TBA

## Table of Contents

- [Setup](#setup)
- [User Stories](#user-stories)

## Setup

1. Clone this repository:

```sh
 git clone git@github.com:krinkevicius/turing-trivia.git
```

2. Navigate to the project directory:

```sh
 cd turing-trivia
```

3. Install dependencies:

```sh
npm install
```

4. Run the server

```sh
npm run dev -w=server
```

5. Run the client

In development mode:

```sh
npm run dev -w=client
```

In production mode:

```sh
npm run build
npm run preview
```

## User Stories

🗹 As a visitor I can login to establish connection to socket server.

🗹 As a user I can create a room to start the game.

🗹 As a user I can copy the room ID to invite friends.

🗹 As a user I can join a game room that someone else created.

🗹 As players, we can all confirm that we are ready and start the game

🗹 As a player I can receive a question from the server and answer it.

🗹 As a player I can see the correct answer after answering the question.

☐ As a player I can see a timer which allows me to know how much time I have to answer.
