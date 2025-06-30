import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";


type PlayerFinishedScreenProps = {
    getScorebaord: () => { name: string; points: number }[]
};

@template(function ({getScorebaord} : PlayerFinishedScreenProps) {
    console.log(getScorebaord());
    return (
        <div>
        </div>
    );
})

export class PlayerFinishedScreen extends Component<{getScorebaord: () => { name: string; points: number }[]}> {
}
