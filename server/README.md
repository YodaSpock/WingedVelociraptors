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
| Event name   | Origin | Description                                                                                                                                         | Data properties                                                                                                   |
|--------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| c_join       | Client | Sent when joining the game.                                                                                                                         | `name: string`                                                                                                    |
| s_init       | Server | Sent in response to `c_join` to identify the current game and client ID. Used to detect reconnects.                                                 | `clientID: number`, `sessionID: string`                                                                           |
| c_reconnect  | Client | Sent if a client suspects they are rejoining the game after a page refresh.                                                                         | `clientID: number`, `sessionID: string`                                                                           |
| c_narrator   | Client | Signals that the client wishes to be a narrator (i.e. play audio instructions).                                                                     | None                                                                                                              |
| c_setRoles   | Client | Configures available roles once the game starts. `roles` must contain unique elements and NOT have ANY WVs.                                         | `wvCount: number`, `roles: [string]`                                                                              |
| c_start      | Client | Signals that all players have joined and the game should start (need only be sent by a single client, like Jackbox).                                | None                                                                                                              |
| s_role       | Server | Identifies the role and position of the player this game. Also provides a list of other players.                                                    | `id: number`, `role: string`, `position: number`, `players: [{ name: string, id: number }]`                       |
| c_ready      | Client | The client has acknowledged their role/position and is ready to start.                                                                              | None                                                                                                              |
| s_act        | Server | Gives information on the current player's turn. May supply additional data relevant to the given role.                                              | `state: string`, `data: object`                                                                                   |
| c_act        | Client | Provides a response to the server on how the client wishes to act.                                                                                  | `data: object`                                                                                                    |
| s_narrate    | Server | Requests that a narrator reads the given dialogue line.                                                                                             | `dialogue: number`                                                                                                |
| c_narrAck    | Client | Acknowledges that the audio for the previously requested dialogue has been played to completion.                                                    |                                                                                                                   |
| s_timerStart | Server | Signals that all roles have been played and voting may begin. Provides an ISO 8601 time that voting ends. Also provides the middle cards.           | `endTime: string`, `middle: [{ exposed: boolean, role: string }]`                                                 |
| c_vote       | Client | Identifies the player this player wishes to vote to kill. This can **not** be modified after it is sent. The **ID** must be provided, not the name. | `id: number`                                                                                                      |
| s_results    | Server | Provides end-of-game results.                                                                                                                       | `killed: [{ name: string, id: number }]`, `role: string`, `players: [{ name: string, id: number, role: string }]` |
| s_error      | Server | Alerts the client that their last message caused an error.                                                                                          | `message: string`                                                                                                 |

### Middle cards
There are a few situations where players need to identify a card from the middle.. These cards will be represented by the numbers `0` (top/leftmost), `1` (middle), and `2` (bottom/rightmost).

In the data of `s_timerStart`, middle cards are given in order. A card's role is revealed if `exposed` is `true`.

### `s_act` data
| Role       | Data             | Description                                                                                                                                                   |
|------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rachel`   | `noise: boolean` | If `noise` is `true`, play Rachel's noise (currently, it was always be true, but this is to differentiate if we ever need to send another message to Rachel). |
| `annalise` | `role: string`   | When Annalise requests to view another player's card, this message is sent in response to reveal to her that role.                                            |
| `isaac`    | `role: string`   | When Isaac wakes up, `role` is his *current* role.                                                                                                       |

If a role is not listed, they do not need additional information and will receive the value `null` for the `data` property.

#### Special cases
##### Sleep
If a player was put to sleep by Sydney, their data will always be `{ "sleep": true }`. They cannot act on their turn.

#### `state`
| State     | Description                                                                        |
|-----------|------------------------------------------------------------------------------------|
| `"start"` | The player's turn has started                                                      |
| `"mid"`   | Additional data in the `data` property is being supplied in the middle of the turn |
| `"end"`   | The player's turn has ended                                                        |

### `c_act` data
| Role       | Data            | Description                                                                                         |
|------------|-----------------|-----------------------------------------------------------------------------------------------------|
| `sydney`   | `id: number`    | The ID of the player she wishes to put to sleep. She cannot choose herself.                         |
| `annalise` | `id: number`    | First sent message. The ID of the player she wishes to view the role of. She cannot choose herself. |
| `annalise` | `swap: boolean` | Second sent message. Whether or not she wishes to swap with the player she viewed the role of.      |
| `hannah`   | `ids: array`    | The IDs of the two players to swap cards. Neither ID can be hers.                                   |
| `daniel`   | `card: number`  | Which card to take from the middle.                                                                 |
| `cat`      | `card: number`  | Which card to flip over in the middle.                                                              |

Annalise clarification: she sends her first message, the server responds, she sends her second message.

## Client reconnection
There are cases in which a client may accidentally close their WebSocket connection. To handle this, the `s_init` and `c_reconnect` events were created.

When a client sends a `c_join` message, they are considered to be part of the current game session. In response, the server will send an `s_init` message with their client ID and the session ID.
The client should store these in local storage so they persist through browser refreshes.

When the client loads a page and all of the following are true, they should suspect they are reconnecting:
* They are at a route they would only be at if in an active game (i.e. any route but exactly `/` of `/player`)
* They have a client ID and session ID in local storage

In this case, the client should send a `c_reconnect` message with their client ID and perceived session ID stored in local storage.
If the server agrees they are reconnecting, it will send any messages the client missed that are still relevant. These will be in chronological order (i.e. through a queue system).
Because of this, it is important the client does not change their path between them closing the WebSocket connection and opening a new one.
Otherwise, the client's perception of the current game state will be incorrect.

To avoid false-positives, the client should remove these local storage values once they receive an `s_results` message, as this marks the end of the game session.
