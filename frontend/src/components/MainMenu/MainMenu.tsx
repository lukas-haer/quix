import { Component, template } from 'uix/components/Component.ts';
import { UIX } from 'uix';

@template(() => {
    /** Remove default UIX styling */
    UIX.Theme.useTheme('uix-light-plain');

    const activeSection = $("joinSection" as "joinSection" | "hostSection")

    
    const codeInputFields = Array.from(document.querySelectorAll('.code-input')) as HTMLInputElement[];
    const codeInputValues = $(['', '', '', '', '', '']);        

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
                codeInputFields[index + 1].focus();
            }
            joinGame();
        });

        /**
         * If "backspace" is pressed in any Codeinput-Field value will be set to empty and the preivous Codeinput-Field gets focused
         */
        input.addEventListener('keydown', event => {
            if (event.key === 'Backspace' && input.value === '' && index > 0) {
                codeInputFields[index - 1].focus();
            }
        });
    });

    /**
     * Adds entrance Animations to the CodeInput-Fields
     */
    globalThis.addEventListener('DOMContentLoaded', () => {
        if (!codeInputFields) {
            return;
        }
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
    function joinGame() {
        // Check if there is a Code-Part where the value ist not yet set
        if (codeInputValues.some(codeChar => codeChar === '')) {
            return;
        }
        const code = codeInputValues.join(''); //Turn array into Code
        redirect(`${globalThis.location.origin}/join/${code}`);
    }

    //** Redirects to Create game Page */
    function handleHostNewGame() {
        redirect(`${globalThis.location.origin}/create`);
    }

    globalThis.addEventListener('wheel', (event) => {
    const scrollY = event.deltaY;    
    
    if (activeSection.val == "joinSection" && scrollY > 0) {
        console.log("join");
        
        activeSection.val = "hostSection";

      //  codeInputContainer.style.opacity = '0';
       // openGameEditorButton.style.opacity = '1';
            
    } else if (activeSection == "hostSection" && scrollY < 0) {
        console.log("host");
        
        activeSection.val = "joinSection";

      //  openGameEditorButton.style.opacity = '0';
       // codeInputContainer.style.opacity = '1';

    }
});

    return (
        <main>
            <section class={{ "section": true, "live": activeSection.val == "joinSection" }} id="joinSection">
                <h1 class="sticky-top pt-30">JOIN QUIX</h1>
                <div id="code-input-container" class={{"live": activeSection.val == "joinSection" }}>
                    <input id="codeField1" type="text" class="code-input" maxlength="1" value={codeInputValues[0]} autofocus />
                    <input id="codeField2" type="text" class="code-input" maxlength="1" value={codeInputValues[1]} />
                    <input id="codeField3" type="text" class="code-input" maxlength="1" value={codeInputValues[2]} />
                    <input id="codeField4" type="text" class="code-input" maxlength="1" value={codeInputValues[3]} />
                    <input id="codeField5" type="text" class="code-input" maxlength="1" value={codeInputValues[4]} />
                    <input id="codeField6" type="text" class="code-input" maxlength="1" value={codeInputValues[5]} />
                </div>
            </section>

            <section class={{ "section": true, "live": activeSection.val == "hostSection" }} id="hostSection">
                <h1 class="section-text sticky-top pb-30">HOST QUIX</h1>
                <button type="button" id="openGameEditorButton" class={{ "button": true, "live": activeSection.val == "hostSection" }} onclick={handleHostNewGame}>
                    Open Game Editor
                </button>
            </section>
        </main>
    );
})
export class MainMenu extends Component {}
