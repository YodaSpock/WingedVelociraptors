# Server

This directory contains the back-end software for Winged Velociraptors. Mainly, WebSocket communication and game logic is handled here.

## Running the server
`npm start` will start the server. A WebSocket server will be started on port `81`.

## Running the example app
`npm run example` will serve the `example` directory. Navigate to `localhost:8080/index.html` to use the example app.

## WebSocket events
All WebSocket messages, whether sent from server to client or vice-versa, are of the following form:
```json
{
  "event": "name",
  "data": {
    "prop1": "a",
    "prop2": 2
  }
}
```
I.e. they are JSON objects with properties `event` (string) and `data` (object). `data` is optional as it is not always necessary.

All event names are prepended with either "`s_`" or "`c_`". These identify the **origin** of the message ("`s_`" meaning server, "`c_`" meaning client).

The following table documents the different events and their accompanying data. It is ordered roughly chronologically.
| Event name   | Origin | Description                                                                                                                                                | Data properties                                                               |
|--------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| c_join       | Client | Sent when joining the game.                                                                                                                                | `name: string`                                                                |
| c_narrator   | Client | Signals that the client wishes to be a narrator (i.e. play audio instructions).                                                                            | None                                                                          |
| c_start      | Client | Signals that all players have joined and the game should start (need only be sent by a single client, like Jackbox).                                       | None                                                                          |
| s_role       | Server | Identifies the role and position of the player this game. Also provides a list of other players.                                                           | `role: string`, `position: number`, `players: [{ name: string, id: number }]` |
| c_ready      | Client | The client has acknowledged their role/position and is ready to start.                                                                                     | None                                                                          |
| s_act        | Server | Signals it is the client's turn to act. May supply additional data relevant to the given role.                                                             | `data: object`                                                                |
| c_act        | Client | Provides a response to the server on how the client wishes to act.                                                                                         | `data: object`                                                                |
| s_narrate    | Server | Requests that a narrator reads the given dialogue line.                                                                                                    | `dialogue: number`                                                            |
| c_narrAck    | Client | Acknowledges that the audio for the previously requested dialogue has been played to completion.                                                           |                                                                               |
| s_timerStart | Server | Signals that all roles have been played and voting may begin. Provides a duration of time (in seconds) clients may vote.                                   | `length: number`                                                              |
| c_vote       | Client | Identifies the player this player wishes to vote to kill. This can be sent multiple times to change their vote. The **ID** must be provided, not the name. | `id: number`                                                                  |
| s_results    | Server | Provides end-of-game results.                                                                                                                              | TBD                                                                           |

### `s_act` data
TBD

### `c_act` data
TBD
