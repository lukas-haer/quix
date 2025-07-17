import { Component, template } from "uix/components/Component.ts";
import QRCodeStyling from 'https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/+esm';

@template((props) => {
  const url = props.url;

  const qrCode = new QRCodeStyling({
    type: "canvas",
    shape: "square",
    width: 400,
    height: 400,
    data: url,
    margin: 0,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q"
    },
    backgroundOptions: {
      round: 10,
      color: "#ffffff"
    },
    cornersSquareOptions: {
      type: "extra-rounded",
      color: "#000000"
    },
  });

  const container = document.createElement("div");
  qrCode.append(container);

  return (
    <div>
      {container}
    </div>
  );
})

export class QrCode extends Component<{ url: string }> {}
