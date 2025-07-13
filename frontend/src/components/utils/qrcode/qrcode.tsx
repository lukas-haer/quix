import { Component, template } from "uix/components/Component.ts";
//import QrCreator from 'https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js';

@template((props) => {
  const url = props.url  

  return (
    <div>

    </div>
  )
})

export class QrCode extends Component<{ url: string }> {}
