import React, { PureComponent } from "react";
import { FormField } from "@grafana/ui";
import { PanelEditorProps } from "@grafana/data";

import { FFTOptions } from "./types";

export class FFTEditor extends PureComponent<PanelEditorProps<FFTOptions>> {
  onSerieNameChanged = ({ target }: any) => {
    this.props.onOptionsChange({ ...this.props.options, serie: target.value });
  }

  // tslint:disable-next-line: typedef
  render() {
    const { options } = this.props;

    return (
      <div className="section gf-form-group">
        <h5 className="section-heading">Display</h5>
        <FormField label="serie name" labelWidth={5} inputWidth={20} type="text" onChange={this.onSerieNameChanged } value={options.serie || ""} />
      </div>
    );
  }
}
