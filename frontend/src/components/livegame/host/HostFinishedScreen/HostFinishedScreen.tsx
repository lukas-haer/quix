import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";
import { ObjectRef } from "datex-core-legacy/runtime/pointers.ts";
import { GameStateObjects } from "../../../../models/GameState.ts";

type HostFinishedScreenProps = {

  state: Datex.Pointer<StateOptions>;
  currentRound: Datex.Pointer<number>;
};

@template(function ({ state, currentRound }: HostFinishedScreenProps) {

  function showParticle(){

    console.log("aaaaaaaaaaaaaaaaaaa");
    
    const numParticles = 200;
    for (let i = 0; i < numParticles; i++) {
      const p = document.createElement('div');
      p.className = 'particle';

      const size = Math.random() * 8 + 2; // 2px to 10px
      const duration = 8 + Math.random() * 12; // 8s to 20s
      const scale = Math.random() * 1.5;
      const opacity = 0.2 + Math.random() * 0.6;
      const drift = (Math.random() - 0.5) * 100 + "px";

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${Math.random() * 100}vh`;

      p.style.setProperty('--duration', `${duration}s`);
      p.style.setProperty('--scale', String(scale));
      p.style.setProperty('--opacity', String(opacity));
      p.style.setProperty('--drift', drift);

      p.style.backgroundColor = `hsl(${190 + Math.random() * 40}, 100%, ${60 + Math.random() * 20}%)`;

      document.body.appendChild(p);
    }
  }

  setTimeout(showParticle, 200)

  return (
    <body>
      <h1>🏆 Final Standings</h1>
      <div class="podium">
        <div class="place second">
          <div class="name" id="secondName"></div>
          <div class="score" id="secondScore"></div>
        </div>
        <div class="place first">
          <div class="name" id="firstName"></div>
          <div class="score" id="firstScore"></div>
        </div>
        <div class="place third">
          <div class="name" id="thirdName"></div>
          <div class="score" id="thirdScore"></div>
        </div>
      </div>
      <button type="button" onclick={() => {
        currentRound.val = 0;
        state.val = "waiting";
      }}>New Round</button>
    </body>
  );
})

export class HostFinishedScreen extends Component<{ state: Datex.Pointer, currentRound: Datex.Pointer }> {}
