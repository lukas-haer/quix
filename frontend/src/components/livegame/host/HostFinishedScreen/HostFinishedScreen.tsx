import { Component, template } from 'uix/components/Component.ts';

type HostFinishedScreenProps = {
    resetGame: () => void;
    getScoreboard: () => { name: string; points: number }[];
};

@template(({ resetGame, getScoreboard }: HostFinishedScreenProps) => {
    const colors = ['#797979', '#007BFF', '#28a745', '#ffc107', '#dc3545'];

    type Player = { name: string; points: number };
    type PlayerWithRank = Player & { rank: number };

    function getRankedScoreboard(scoreboard: { name: string; points: number }[]): PlayerWithRank[] {
        const sorted = [...scoreboard].sort((a, b) => b.points - a.points);
        let rank = 1;
        let lastPoints: number | null = null;

        return sorted.map((player, i) => {
            if (player.points !== lastPoints) {
                rank = i + 1;
                lastPoints = player.points;
            }
            return {...player, rank};
        });
    }

    function getPlayer(index: number):{
       points: number;
        rank: number;
        name: string;
    } | null {
        if(index < 0 || index >= rankedScoreboard.length){
            return null;
        }
         const p = rankedScoreboard[index];

        return{
            points: p.points,
            rank: p.rank,
            name: p.name
        };
    }

    const rankedScoreboard = getRankedScoreboard(getScoreboard());
    const winner = getPlayer(0);
    const second = getPlayer(1);
    const third = getPlayer(2);

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

    const scoreboard = getScoreboard();

    return (
        <main>
            <section>
                <h1>🏆 The Game is over</h1>
                <div class="podium">
                    {second != null && (
                        <div class="place second">
                            <div class="name" id="secondName">2#</div>
                            <div class="name" id="secondName">{second.name}</div>
                            <div class="score" id="secondScore">{second.points} Points</div>
                        </div>
                    )}
                    {winner != null && (
                        <div class="place first">
                            <div class="name" id="firstName">1#</div>
                            <div class="name" id="firstName">{winner.name}</div>
                            <div class="score" id="firstScore">{winner.points} Points</div>
                        </div>
                    )}
                    {third != null && (
                        <div class="place third">
                            <div class="name" id="thirdName">3#</div>
                            <div class="name" id="thirdName">{third.name}</div>
                            <div class="score" id="thirdScore">{third.points} Points</div>
                        </div>
                    )} 
                </div>
                <button class="button" type="button" onclick={resetGame}>
                    New Round
                </button>
            </section>
            {[...Array(200)].map((_, i) => makePartikle())}
        </main>
    );
})
export class HostFinishedScreen extends Component<HostFinishedScreenProps> {}
