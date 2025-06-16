import { Component, template } from "uix/components/Component.ts";
import {UIX} from "uix"

@template(() => {

    UIX.Theme.useTheme("uix-light-plain")

    function handleJoinGame() {
        window.location.href = `${window.location.origin}/join`;
    }

    function handleCreateNewGame() {
        window.location.href = `${window.location.origin}/create`;
    }

    return (
        <main>
            <div class="section" id="section1">
                <h1 class="sticky-top pt-30">JOIN QUIX</h1>
                <div id="code-input-container" class="code-input-container">
                    <input type="text" class="code-input" maxlength="1" />
                    <input type="text" class="code-input" maxlength="1" />
                    <input type="text" class="code-input" maxlength="1" />
                    <input type="text" class="code-input" maxlength="1" />
                    <input type="text" class="code-input" maxlength="1" />
                    <input type="text" class="code-input" maxlength="1" />
                </div>
            </div>

            <div class="section" id="section2">
                <h1 class="section-text sticky-top pb-30">HOST QUIX</h1>
                <button
                    type="button"
                    id="openGameEditorButton"
                    class="button"
                    onclick={handleCreateNewGame}
                >
                    Open Game Editor
                </button>
            </div>
        </main>
    );
})
export class MainMenu extends Component {}
