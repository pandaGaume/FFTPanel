import React, { PureComponent } from "react";
import { FormField } from "@grafana/ui";
import { PanelEditorProps } from "@grafana/data";

import { FFTOptions } from "./types";

export class FFTEditor extends PureComponent<PanelEditorProps<FFTOptions>> {
  onSerieNameChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, serie: target.value });
  }
<<<<<<< HEAD
  onSamplingChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, sampling: target.value });
  }
=======
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7

  // tslint:disable-next-line: typedef
  render() {
    const { options } = this.props;

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Display</h5>
<<<<<<< HEAD
        <FormField label="serie"
            labelWidth={5}
            inputWidth={20}
            type="text"
            onChange={this.onSerieNameChanged }
            value={options.serie || ""} />
        <FormField label="sampling"
            labelWidth={5}
            inputWidth={20}
            type="number"
            onChange={this.onSamplingChanged }
            value={options.sampling || 1} />
=======
        <FormField label="serie name" labelWidth={5} inputWidth={20} type="text" onChange={this.onSerieNameChanged } value={options.serie || ""} />
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
      </div>
    );
  }
}
