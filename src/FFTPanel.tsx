
import React, { PureComponent } from "react";
import { PanelProps } from "@grafana/data";
import { FFTOptions } from "types";

// highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ForwardFFTPanelData, IFFTResult} from "FFTPanelData";

// tslint:disable-next-line: interface-name
interface Props extends PanelProps<FFTOptions> {}

export class FFTPanel extends PureComponent<Props> {

  private _fft:ForwardFFTPanelData;

  constructor(props: Readonly<Props>) {
    super(props);
    const {serie,sampling} = props.options ;
    this._fft = new ForwardFFTPanelData(serie, sampling);
  }

  // tslint:disable: typedef
  render() {
    const { data, options } = this.props;
    var chartdata : any = [];
    try {
      this._fft.write(data);
      let result:IFFTResult = this._fft.read();
      if(result) {
        let size = result.spectrum.length ;
        var frequencyIncrement:number = result.sampling/2/size;
        for (let i:number = 0; i < size;i++) {
          chartdata.push([frequencyIncrement*i,result.spectrum[i]]);
        }
      }
      // tslint:disable-next-line: no-empty
    } catch (error) {
      console.log("Error:" + error );
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
           {  name : options.serie, data: chartdata }
        ]
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
      </div>
    );
  }
}
