
import React, { PureComponent } from "react";
import { PanelProps } from "@grafana/data";
import { FFTOptions } from "types";

// highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ForwardFFTPanelData } from "FFTPanelData";

// tslint:disable-next-line: interface-name
interface Props extends PanelProps<FFTOptions> {}

export class FFTPanel extends PureComponent<Props> {

  private _fft:ForwardFFTPanelData;

  constructor(props: Readonly<Props>) {
    super(props);
    this._fft = new ForwardFFTPanelData(props.options.serie);
  }

  // tslint:disable: typedef
  render() {
    const { data, options } = this.props;
    var chunk : any ;
    try {
      this._fft.write(data);
      chunk = this._fft.read();
      // tslint:disable-next-line: no-empty
    } catch {
    }

    var spectrum:number[] = [];
    if(chunk) {
      for(let i:number=2;i<chunk.length;i+=2) {
        spectrum.push(chunk[i]);
      }
    }

    const chartOptions = {
        chart:{
          backgroundColor: "rgba(0,0,0,0)"
        },
        title : {
          text : ""
        },
        xAxis:[
          {
            gridLineWidth: 1,
            labels: {
              format: "{value}Hz",
            },
            tile :{
              text : "Frequency"
            }
          }
        ],
        yAxis:[
          {
            gridLineWidth: 1,
            tile :{
              text : "Amplitude"
            }
          }
        ],
        series: [
           {  name : options.serie, data: spectrum }
        ]
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
      </div>
    );
  }
}
