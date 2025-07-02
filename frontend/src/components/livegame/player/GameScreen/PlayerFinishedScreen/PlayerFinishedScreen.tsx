import {Datex} from "datex-core-legacy/datex.ts";
import {Component, template} from "uix/components/Component.ts";


type PlayerFinishedScreenProps = {
    getScoreboard?: () => Promise<{ name: string; points: number }[]>;
    name?: string
};


@template(function ({getScoreboard}: PlayerFinishedScreenProps) {

    type Player = { name: string; points: number };
    type PlayerWithRank = Player & { rank: number };

    function getRankedScoreboard(scoreboard: Player[]): PlayerWithRank[] {
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

    //const rankedScoreboard = getRankedScoreboard(getScoreboard())


    //TODO dummy daten rausschmeißen und echte nehmen
    const scoreboard = [
        {name: 'Player1', points: 100},
        {name: 'Player2', points: 100},
        {name: 'Player3', points: 101},
        {name: 'Player4', points: 101},
        {name: 'Player5', points: 5},
        {name: 'Player6', points: 6},
        {name: 'Player7', points: 7},
        {name: 'Player8', points: 8},
        {name: 'Player9', points: 9},
        {name: 'Player10', points: 10}
    ];
    const myName = 'Player1'
    const rankedScoreboard = getRankedScoreboard(scoreboard)

    const nextRankInfo = pointsToNextRankAndPlace(rankedScoreboard, myName);
    const myRank = getMyRank(rankedScoreboard, myName)

    const text = "text depending on the place"
    const backgroundColor = "color depending on the place"
    const textColor = "color depending on the place"

    return (
        <>
            <div>
                Hey {myName}, you got place number: {myRank}.
                {nextRankInfo != null && <div> You are {nextRankInfo.pointsNeeded} Points behind place {nextRankInfo.nextRank} </div>}
            </div>
        </>
    );
})

export class PlayerFinishedScreen extends Component<PlayerFinishedScreenProps> {
}
