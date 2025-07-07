import {Datex} from "datex-core-legacy/datex.ts";
import {Component, template} from "uix/components/Component.ts";
import {frontendRouter} from "uix/routing/"

type PlayerFinishedScreenProps = {
    getScoreboard: () => Promise<{ name: string; points: number }[]>;
    getName: () => Promise<string>;
};


@template(async function ({getScoreboard, getName}: PlayerFinishedScreenProps) {

    type Player = { name: string; points: number };
    type PlayerWithRank = Player & { rank: number };

    function navigateToMainMenu() {
        window.location.href = "/host"
    }

    function navigateToJoinScreen() {
        window.location.href = "/"
    }

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

    const rankedScoreboard = getRankedScoreboard(await getScoreboard())
    const myName = await getName();

    const nextRankInfo = pointsToNextRankAndPlace(rankedScoreboard, myName);
    const myRank = getMyRank(rankedScoreboard, myName)
    const myPoints = getMyPoints(rankedScoreboard, myName)

    return (
        <div class="color-fade player-finished-container">
            <>
                <h1>
                    {formatNumberToNumberWithSuffix(myRank)} Place
                </h1>
                <h3>
                    {myPoints} Point{myPoints !== 1 && "s"}
                </h3>
                {nextRankInfo != null && (
                    <h4>
                        {nextRankInfo.pointsNeeded} point{nextRankInfo.pointsNeeded !== 1 && "s"} away
                        from {formatNumberToNumberWithSuffix(nextRankInfo.nextRank)} place
                    </h4>
                )}
            </>
            <div class="button-container">
                <button onclick={navigateToJoinScreen}>
                    Join another quix
                </button>
                <button onclick={navigateToMainMenu}>
                    Create your own quix for free
                </button>
            </div>
        </div>
    );
})

export class PlayerFinishedScreen extends Component<PlayerFinishedScreenProps> {
}
