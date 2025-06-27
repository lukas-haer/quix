import { Datex } from 'datex-core-legacy/datex.ts';
import { Component, template, style } from 'uix/components/Component.ts';
import { ObjectRef } from 'datex-core-legacy/runtime/pointers.ts';
import { GameStateObjects, Player, StateOptions } from 'frontend/src/models/GameState.ts';
import { registerLobby } from 'backend/lobbyManagement/LobbyManagement.ts';
import { QrCode } from 'frontend/src/components/utils/qrcode/qrcode.tsx';
import { UIX } from 'uix';

type HostWaitingScreenProps = {
    state: Datex.Pointer<StateOptions>;
    currentRound: Datex.Pointer<number>;
    gameStateObjects: ObjectRef<GameStateObjects>;
};

@style('../HostMain.css') //TODO: replace and delete me
@template(async ({ state, currentRound, gameStateObjects }: HostWaitingScreenProps) => {
    UIX.Theme.useTheme('uix-light-plain');

    const { prefix, name, instance } = Datex.Runtime.endpoint;

    const startGame = () => {
        state.val = 'playing';
        updateDeadlineAndTimer();
    };

    const nextRound = () => {
        if (currentRound.val + 1 === gameStateObjects.questions.length) {
            state.val = 'finished';
            return;
        }

        updateDeadlineAndTimer();
        currentRound.val++;
    };

    const updateDeadlineAndTimer = () => {
        // Can you do this more smoothly? an easy to understand one-liner perhaps?
        const newDeadline = new Date();
        newDeadline.setSeconds(newDeadline.getSeconds() + gameStateObjects.questions[currentRound.val].content.timeInSeconds);
        gameStateObjects.currentDeadline = newDeadline;

        setTimeout(nextRound, gameStateObjects.currentDeadline.getTime() - Date.now());
    };

    let gamecode: string = '';
    try {
        const lobby = await registerLobby(); //Registers a Lobby on the Backend
        gamecode = lobby.code;
    } catch (error) {
        console.error('An Error occured: ' + error);
        alert('Unable to load gamecode'); //TODO Replace with snackbar
    }
    
    const hostname = globalThis.location.hostname
    const invitelink = `${globalThis.location.origin}/join/${encodeURIComponent(gamecode)}`;

    const players = gameStateObjects.players
    return (
        <section class="l-row flex">
          <div class="host-bg-shape-main"></div>
<div class="host-bg-shape-circle"></div>
            <div class="l-col l-col-6 block">
                <h1>Lobby</h1>
                <div class="player-list player-list-centered player-list-grid">
                  <div class="player-placeholder player-placeholder-centered">Waiting for players to join...</div>
                    {
                        players.map((player: Player, idx: number) => (
                            <div class="player-item player-item-card" style={{ animationDelay: `${idx * 80}ms` }}>
                                <span class="player-name" style={{ display: 'block', width: '100%', textAlign: 'center' }}>{player.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div class="l-col l-col-6 center-vertically">
                <QrCode class="qrCode" url={invitelink}></QrCode>
                <div class="separator">
                    <span>or join via {hostname}</span>
                </div>
                <p class="gamecode">{gamecode}</p>
                <button class="button" type="button" onclick={() => startGame()}>
                    Start Game 🚀
                </button>
            </div>
        </section>
    );
})
export class HostWaitingScreen extends Component<{
    state: Datex.Pointer;
    currentRound: Datex.Pointer;
    gameStateObjects: ObjectRef<GameStateObjects>;
}> {}
