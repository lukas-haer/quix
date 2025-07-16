import { Component, template } from 'uix/components/Component.ts';
import { UIX } from 'uix';
import { failureSnackbarMessage, Snackbar, successSnackbarMessage } from 'frontend/src/components/utils/snackbar/Snackbar.tsx';

@template(() => {
    /** Remove default UIX styling */
    UIX.Theme.useTheme('uix-light-plain');

    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setViewportHeight();

    const activeSection = $('joinSection' as 'joinSection' | 'hostSection');

    const codeInputValues = $(['', '', '', '', '', '']);
    const codeInputFields = [
        <input id="codeField1" type="number" class="code-input" maxlength="1" value={codeInputValues[0]} autofocus />,
        <input id="codeField2" type="number" class="code-input" maxlength="1" value={codeInputValues[1]} />,
        <input id="codeField3" type="number" class="code-input" maxlength="1" value={codeInputValues[2]} />,
        <input id="codeField4" type="number" class="code-input" maxlength="1" value={codeInputValues[3]} />,
        <input id="codeField5" type="number" class="code-input" maxlength="1" value={codeInputValues[4]} />,
        <input id="codeField6" type="number" class="code-input" maxlength="1" value={codeInputValues[5]} />
    ];

    /**
     * Adds Event-Listener for input and key down on all Code-Input-Fields
     */
    codeInputFields.forEach((input, index) => {
        /**
         * If a there is and Input in any Codeinput-Field the next Input-Field will be automatically selected.
         * joinGame will be called.
         */
        input.addEventListener('input', () => {
            if ((input as HTMLInputElement).value.length === 1 && index < codeInputValues.length - 1) {
                (codeInputFields[index + 1] as HTMLInputElement).focus();
            }
            findLobby();
        });

        /**
         * If "backspace" is pressed in any Codeinput-Field value will be set to empty and the preivous Codeinput-Field gets focused
         */
        input.addEventListener('keydown', event => {
            if ((event as KeyboardEvent).key == 'Backspace' && (input as HTMLInputElement).value === '' && index > 0) {
                codeInputValues[index] = '';
                (codeInputFields[index - 1] as HTMLInputElement).focus();
            }
        });
    });

    /**
     * EventListener for changing sections between joinGame and hostGame
     */
    globalThis.addEventListener('wheel', event => {
        const scrollY = event.deltaY;

        if (activeSection.val == 'joinSection' && scrollY > 0) {
            activeSection.val = 'hostSection';
        } else if (activeSection == 'hostSection' && scrollY < 0) {
            activeSection.val = 'joinSection';
        }
    });

    /**
     * Function to change Sections when clicking
     * @param clickedSection The section this function is called from
     */
    function changeSectionByClick(clickedSection: string) {
        if (activeSection.val == 'joinSection' && clickedSection == 'hostSection') {
            activeSection.val = 'hostSection';
        } else if (activeSection == 'hostSection' && clickedSection == 'joinSection') {
            activeSection.val = 'joinSection';
        }
    }

    /**
     * Adds entrance Animations to the CodeInput-Fields
     */
    globalThis.addEventListener('DOMContentLoaded', () => {
        if (!codeInputFields) {
            return;
        }
        (codeInputFields[0] as HTMLElement).focus();
        codeInputFields.forEach((input, index) => {
            setTimeout(() => {
                (input as HTMLElement).style.animation = 'bounce 0.5s ease-in-out';
                setTimeout(() => {
                    (input as HTMLElement).style.animation = '';
                }, 500);
            }, index * 200);
        });
    });

    /**
     * If all CodeInput-Fields have a value, the player will be redirected to join the lobby
     * @returns void
     */
    function findLobby() {
        // Check if there is a Code-Part where the value ist not yet set
        if (codeInputValues.some(codeChar => codeChar === '')) {
            return;
        }
        const code = codeInputValues.join(''); //Turn array into Code
        redirect(`${globalThis.location.origin}/join/${code}`);
    }

    function displayErrorFromSearchParams() {
        const searchParams = new URL(location.href).searchParams;
        const errorParam = searchParams.get('error');

        if (errorParam == 'LobbyNotFound') {
            failureSnackbarMessage('Lobby not found', 'There was no Lobby found for this Gamecode.', 20_000);
        }
    }
    setTimeout(displayErrorFromSearchParams, 200);

    return (
        <main>
            <Snackbar />
            <section
                class={{ section: true, live: activeSection.val == 'joinSection' }}
                id="joinSection"
                onclick={() => changeSectionByClick('joinSection')}
            >
                <h1 class="sticky-top pt-30">🎉 JOIN QUIX</h1>
                <div id="code-input-container" class={{ 'code-input-container': true, live: activeSection.val == 'joinSection' }}>
                    {codeInputFields.map(inputfield => inputfield)}
                </div>
            </section>

            <section
                class={{ section: true, live: activeSection.val == 'hostSection' }}
                id="hostSection"
                onclick={() => changeSectionByClick('hostSection')}
            >
                <h1 class="section-text sticky-top pb-30">🚀 HOST QUIX</h1>
                <button
                    type="button"
                    id="openGameEditorButton"
                    class={{ button: true, live: activeSection.val == 'hostSection' }}
                    onclick={() => redirect('/host')}
                >
                    Open Game Editor
                </button>
            </section>
        </main>
    );
})
export class MainMenu extends Component {}
