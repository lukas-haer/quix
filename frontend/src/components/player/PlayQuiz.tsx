import { Component, template } from "uix/components/Component.ts";

@template(() => (
    <section>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style="width: 500px; text-align: center;">
                <h1>Finished!</h1>
                <hr/>

                Your rank: xxx <br/>
                Your points: xxx
            </div>
        </div>
    </section>    
))
export class PlayQuiz extends Component {}