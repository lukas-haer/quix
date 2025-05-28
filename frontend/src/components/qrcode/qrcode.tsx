import { Component, template } from "uix/components/Component.ts";
import { qrcode } from "https://unyt.land/x/qrcode@v2.0.0/mod.ts";
// import { qrcode } from "../../utils/mod.ts";

@template(function () {
  return <img src={this.code} />;
})

export class QrCode extends Component<{ url: string }> {
  @property
  code!: string;
  protected override onConstruct(): Promise<void> | void {
    qrcode(this.properties.url).then((qr) => {
      this.code = qr as unknown as string;
    });
  }
}
