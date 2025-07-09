import { Component, template } from 'uix/components/Component.ts';

type HostFinishedScreenProps = {
    resetGame: () => void;
    getScoreboard: () => { name: string; points: number }[];
};

@template(({ resetGame, getScoreboard }: HostFinishedScreenProps) => {
    const colors = ['#797979', '#007BFF', '#28a745', '#ffc107', '#dc3545'];

    function makePartikle() {
        const size = Math.random() * 8 + 2; // 2px to 10px
        const duration = 8 + Math.random() * 12; // 8s to 20s
        const scale = Math.random() * 1.5;
        const opacity = 0.2 + Math.random() * 0.6;
        const drift = (Math.random() - 0.5) * 100 + 'px';
        const top = `${Math.random() * 100}vh`;
        const left = `${Math.random() * 100}vw`;
        const bgColor = colors[Math.floor(Math.random() * colors.length)];

        const style = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: ${bgColor};
          top: ${top};
          left: ${left};
          pointer-events: none;
          z-index: 0;
        `;

        const particleDiv = (<div class="particle" style={style}></div>) as HTMLElement;
        particleDiv.style.setProperty('--duration', `${duration}s`);
        particleDiv.style.setProperty('--scale', String(scale));
        particleDiv.style.setProperty('--opacity', String(opacity));
        particleDiv.style.setProperty('--drift', String(drift));

        return particleDiv;
    }

    const scorebaord = getScoreboard();

    return (
        <main>
            <h1>🏆 Final Standings</h1>
            <div class="podium">
                <div class="place second">
                    <div class="name" id="secondName">{scorebaord.name[1]}</div>
                    <div class="score" id="secondScore">{scorebaord.points[0]}</div>
                </div>
                <div class="place first">
                    <div class="name" id="firstName">{scorebaord.name[0]}</div>
                    <div class="score" id="firstScore">{scorebaord.points[0]}</div>
                </div>
                <div class="place third">
                    <div class="name" id="thirdName">{scorebaord.name[2]}</div>
                    <div class="score" id="thirdScore"{scorebaord.points[2]}></div>
                </div>
            </div> 
            <button type="button" onclick={resetGame}>
                New Round
            </button>
            {[...Array(200)].map((_, i) => makePartikle())}
        </main>
    );
})
export class HostFinishedScreen extends Component<HostFinishedScreenProps> {}
