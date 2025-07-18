import {Datex} from "datex-core-legacy/datex.ts";
import {Component, template} from "uix/components/Component.ts";

type PlayerFinishedScreenProps = {
    getScoreboard: () => Promise<{ name: string; points: number }[]>;
    getName: () => Promise<string>;
};


@template(async function ({getScoreboard, getName}: PlayerFinishedScreenProps) {

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

    function getMyRank(rankedScoreboard: PlayerWithRank[], myName: string): number {       
        const me = rankedScoreboard.find(p => p.name === myName);
        return me ? me.rank : -1;
    }

    function getMyPoints(rankedScoreboard: PlayerWithRank[], myName: string): number {
        const me = rankedScoreboard.find(p => p.name === myName);
        return me ? me.points : -1;
    }

    function getMyIndex(rankedScoreboard: PlayerWithRank[], myName: string): number {
        return rankedScoreboard.findIndex(p => p.name === myName);
    }

    function pointsToNextRankAndPlace(rankedScoreboard: PlayerWithRank[], myName: string): {
        pointsNeeded: number;
        nextRank: number
    } | null {
        const me = rankedScoreboard.find(p => p.name === myName);
        if (!me) return null;

        const betterPlayers = rankedScoreboard.filter(p => p.rank < me.rank);
        if (betterPlayers.length === 0) return null;

        const minPointsNextRank = Math.min(...betterPlayers.map(p => p.points));
        const diff = minPointsNextRank - me.points;

        const nextRank = Math.max(...betterPlayers.map(p => p.rank));

        return {pointsNeeded: diff > 0 ? diff : 0, nextRank};
    }

    function formatNumberToNumberWithSuffix(rank: number): string {
        const mod100 = rank % 100;
        if (mod100 >= 11 && mod100 <= 13) return `${rank}th`;
        const mod10 = rank % 10;
        if (mod10 === 1) return `${rank}st`;
        if (mod10 === 2) return `${rank}nd`;
        if (mod10 === 3) return `${rank}rd`;
        return `${rank}th`;
    }

    function getNextPlayers(index: number) :{
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

    const rankedScoreboard = getRankedScoreboard(await getScoreboard())
    const myName = await getName();

    const nextRankInfo = pointsToNextRankAndPlace(rankedScoreboard, myName);
    const myRank = getMyRank(rankedScoreboard, myName);
    const myPoints = getMyPoints(rankedScoreboard, myName);    
    const myIndex = getMyIndex(rankedScoreboard, myName);
    const betterPlayer = getNextPlayers(myIndex-1);
    const worstPlayer = getNextPlayers(myIndex+1);    

   return (
        <main>
            <h1>🎉 Game Over!</h1>
            <div class="main-info">You finished #{formatNumberToNumberWithSuffix(myRank)} with {myPoints} Point{myPoints !== 1 && "s"}</div>
 
            <div class="cards-container">
                {betterPlayer != null && (
                <div class="player-card">
                    <div class="player-name"> 
                        {betterPlayer.rank}# {betterPlayer.name}
                    </div>
                    <div class="player-score">
                        {betterPlayer.points}pts
                    </div>
                    <div class="diff">
                        {betterPlayer.points-myPoints}
                    </div>
                </div>
                )}
                {worstPlayer != null &&(
                <div class="player-card">
                    <div class="player-name">
                        {worstPlayer.rank}# {worstPlayer.name}
                    </div>
                    <div class="player-score">
                        {worstPlayer.points}pts
                    </div>
                    <div class="diff">
                        {worstPlayer.points-myPoints}
                    </div>
                </div>        
                )}
                                
            </div> 
                <button type="button" class="button" onclick={() => redirect('/')}>
                    Join another quix
                </button>
                <button type="button" class="button" onclick={() => redirect('/host')}>
                    Create your own quix for free
                </button>
                            <div class="shape rectangle"></div>
            <div class="shape circle"></div>
            <div class="shape triangle"></div>
            <div class="shape star"></div>
        </main>
    ); 
})

export class PlayerFinishedScreen extends Component<PlayerFinishedScreenProps> {
}
