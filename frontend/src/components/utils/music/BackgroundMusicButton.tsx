import { Component, template } from 'uix/components/Component.ts';

@template(() => {
    const audio = (
        <audio class="background-music" autoplay loop>
            <source src="frontend/public/audio/lobbymusic.mp3" type="audio/mpeg" />{' '}
        </audio>
    ) as HTMLAudioElement;

    function toggleMusic() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }

    return (
        <div>
            <button type="button" onclick={toggleMusic}>
                Play Music
            </button>
        </div>
    );
})
export class AudioButton extends Component {}
