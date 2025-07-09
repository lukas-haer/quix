import { Datex } from "datex-core-legacy/datex.ts";
import { Component, style, template } from "uix/components/Component.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import {
  GameStateObjects,
  Player,
  StateOptions,
} from "frontend/src/models/GameState.ts";
import { registerLobby } from "backend/lobbyManagement/LobbyManagement.ts";
import { QrCode } from "frontend/src/components/utils/qrcode/qrcode.tsx";
import { UIX } from "uix";
import { failureSnackbarMessage, successSnackbarMessage } from "frontend/src/components/utils/snackbar/Snackbar.tsx";
import { Separator } from "frontend/src/components/utils/Separator/Separator.tsx";

type HostWaitingScreenProps = {
  gameStateObjects: ObjectRef<GameStateObjects>;
  startGame: () => void;
};

@style("../HostMain.css") //TODO: replace and delete me
@template(
  async ({gameStateObjects, startGame }: HostWaitingScreenProps) => {
    UIX.Theme.useTheme("uix-light-plain");
    let gamecode: string = "";
    try {
      const lobby = await registerLobby(); //Registers a Lobby on the Backend
      gamecode = lobby.code;
    } catch (error) {
      console.error("An Error occured: " + error);
      failureSnackbarMessage("Error when loading gamecode","Was unable to load gamecode. Please try again")
    }

    const hostname = globalThis.location.hostname;
    const invitelink = `${globalThis.location.origin}/join/${
      encodeURIComponent(gamecode)
    }`;

    const players = gameStateObjects.players;
    return (
      <section class="l-row flex">
        <div class="host-bg-shape-main"></div>
        <div class="host-bg-shape-circle"></div>
        <div class="l-col l-col-6 block">
          <h1>Lobby</h1>
          <div class="waiting to join">Waiting for players to join...</div>
          <div class="player-list player-list-centered player-list-grid">
            {players.map((player: Player, idx: number) => (
              <div
                class="player-item player-item-card"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <span
                  class="player-name"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {player.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div class="l-col l-col-6 center-vertically">
          <QrCode class="qrCode" url={invitelink}></QrCode>
          <Separator text={`or join via ${hostname}`} />
          <p class="gamecode">
            {gamecode}
            <span
              class="copy-invite-link"
              title="Copy invite link"
              onclick={() => {
                navigator.clipboard.writeText(invitelink);
                successSnackbarMessage(
                  "Link copied!",
                  "The Link has been copied successfully",
                  2_000,
                );
              }}
              style={{
                cursor: "pointer",
                marginLeft: "0.5rem",
                fontSize: "1.5rem",
                verticalAlign: "middle",
                userSelect: "none",
              }}
            >
              🔗
            </span>
          </p>
          <p
            class="invitelink"
            onclick={() => {
              navigator.clipboard.writeText(invitelink);
              successSnackbarMessage(
                "Link copied!",
                "The Link has been copied successfully",
                2_000,
              );
            }}
          >
            {invitelink}
          </p>
          <button class="button" type="button" onclick={() => startGame()}>Start Game</button>
        </div>
      </section>
    );
  },
)
export class HostWaitingScreen extends Component<{
  gameStateObjects: ObjectRef<GameStateObjects>;
  startGame: () => void;
}> {}
