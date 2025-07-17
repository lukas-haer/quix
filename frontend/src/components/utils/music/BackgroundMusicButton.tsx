import { Component, template } from 'uix/components/Component.ts';
import { toggleMusic, isPlaying } from 'frontend/src/components/utils/music/BackgroundMusic.tsx';

@template(() => (
    <div>
        <button type="button" class="background-music-button" onclick={toggleMusic}>
            <div class={{ hidden: isPlaying }}>🔊</div>
            <div class={{ hidden: !isPlaying.val }}>🔈</div>
        </button>
    </div>
))
export class BackgroundMusicButton extends Component {}
