import { Datex } from "datex-core-legacy/datex.ts";
import { Component, template } from "uix/components/Component.ts";


type PlayerFinishedScreenProps = {
    getScoreboard: () => Promise<{ name: string; punkte: number }[]>;
};

@template(function ({getScoreboard} : PlayerFinishedScreenProps) {
    return (
        <div>
        </div>
    );
})

export class PlayerFinishedScreen extends Component<PlayerFinishedScreenProps> {
}
