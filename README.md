# Turing Trivia

A simple multiplayer trivia game for 2-4 players.

##### Tech Stack

- [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/) for frontend;
- [Node.js](https://nodejs.org/en) for backend;
- [Socket.IO](https://socket.io/) for communication between server and client;
- [Vitest](https://vitest.dev/) for testing.

<b>Note!</b> This project was was used as an implementation of Turing College Web Development project for Module 4 Sprint 4.

## Table of Contents

- [Setup](#setup)
- [Usage](#usage)
- [Tests](#tests)
- [User Stories](#user-stories)
- [Future](#future)
- [Credits](#credits)

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

4. Setup `.env` files in `server` and `client` based on respective `.env.example` files. This shouldn't be necessary if you only want to view project in dev.

5. Run the server

In development mode:

```sh
npm run dev -w=server
```

In production mode:

```sh
npm run build -w=server
npm run start -w=server
```

6. Run the client

In development mode:

```sh
npm run dev -w=client
```

In production mode:

```sh
npm run build -w=client
npm run preview -w=client
```

## Usage

Once in the client, visitor needs to login to establish connection to the server by providing their username. After connecting, user can create a game and share game ID with friends, or join already existing room by providing game ID of their own.

Once 2 to 4 players join and ready up, the game starts. 10 questions will be presented to the players. They get 10 seconds to answer each question, follow by 5 second pause to see how everyone answered.

After the game, score board is presented to all players.

## Tests

Unit tests were written to test the functionality of the code following the principles of TDD. To run the tests, execute below command in <code>client</code> or <code>server</code> directories.

```sh
npm run test
```

## User Stories

The project was implemented by <i>loosely</i> (😇) following Agile principles. The following stories were implemented:

🗹 As a visitor I can login to establish connection to socket server.

🗹 As a user I can create a room to start the game.

🗹 As a user I can copy the room ID to invite friends.

🗹 As a user I can join a game room that someone else created.

🗹 As players, we can all confirm that we are ready and start the game

🗹 As a player I can receive a question from the server and answer it.

🗹 As a player I can see the correct answer after answering the question.

🗹 As a player I can see a timer which allows me to know how much time I have to answer.

🗹 As a player I can see final results when game ends.

🗹 As a player I can go back to game lobby after game ends.

## Future

This project is an MVP, and a lot of features could be still added:

- Different game rounds (each player selects category, 1 question of each category, extra points for answering quickly, etc.);
- Allowing player to return to the game after disconnecting;
- Functionality to play again with the same group of players;
- Persistent player statistics (number of games won, number of answerred questions, etc.).

## Credits

Project uses [The Trivia API](https://the-trivia-api.com/) to fetch random questions.
