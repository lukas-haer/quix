import { Component, template } from 'uix/components/Component.ts';
import { toggleMusic, isPlaying } from 'frontend/src/components/utils/music/BackgroundMusic.tsx';

@template(() => (
    <div>
        <script src="https://kit.fontawesome.com/d758744bfe.js" crossorigin="anonymous"></script>
        <button type="button" class="background-music-button" onclick={toggleMusic}>
            <div class={{ hidden: isPlaying }}><i class="fa-solid fa-volume-high"></i></div>
            <div class={{ hidden: !isPlaying.val }}><i class="fa-solid fa-volume-xmark"></i></div>
        </button>
    </div>
))
export class BackgroundMusicButton extends Component {}
