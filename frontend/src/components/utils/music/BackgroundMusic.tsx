import { Component, template } from 'uix/components/Component.ts';

const audio = (
    <audio class="background-music" loop >
        <source src="frontend/public/audio/lobbymusic.mp3" type="audio/mpeg" />{' '}
    </audio>
) as HTMLAudioElement;

export const isPlaying = $(false);

export function toggleMusic() {
    if (isPlaying.val) {
        isPlaying.val = false
        audio.pause();
    } else {
        isPlaying.val = true
        audio.play();
    }
}
@template(() => audio)

export class BackgroundMusic extends Component {}
