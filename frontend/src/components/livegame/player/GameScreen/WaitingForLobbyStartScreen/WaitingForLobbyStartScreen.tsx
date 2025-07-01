import { Component, template, style } from 'uix/components/Component.ts';
import { LoadingScreen } from 'frontend/src/components/utils/loadingscreen/LoadingScreen.tsx';


@template(() => {
    return (
        <section class="loading-screen">
            <div class="loading-text">You're in!</div>
            <div class="sub-text">Now wait for the game to start...</div>
            <div class="shape rectangle"></div>
            <div class="shape circle"></div>
            <div class="shape triangle"></div>
            <div class="shape star"></div>
        </section>
    );
})
export class WaitingForLobbyStartScreen extends Component {}