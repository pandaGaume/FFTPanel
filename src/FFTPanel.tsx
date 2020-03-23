
import React, { PureComponent } from "react";
import { PanelProps } from "@grafana/data";
import { FFTOptions } from "types";

// highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
<<<<<<< HEAD
import { ForwardFFTPanelData, IFFTResult} from "FFTPanelData";
=======
import { ForwardFFTPanelData } from "FFTPanelData";
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7

// tslint:disable-next-line: interface-name
interface Props extends PanelProps<FFTOptions> {}

export class FFTPanel extends PureComponent<Props> {

  private _fft:ForwardFFTPanelData;

  constructor(props: Readonly<Props>) {
    super(props);
<<<<<<< HEAD
    const {serie,sampling} = props.options ;
    this._fft = new ForwardFFTPanelData(serie, sampling);
=======
    this._fft = new ForwardFFTPanelData(props.options.serie);
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
  }

  // tslint:disable: typedef
  render() {
    const { data, options } = this.props;
<<<<<<< HEAD
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
=======
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

>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
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
<<<<<<< HEAD
           {  name : options.serie, data: chartdata }
=======
           {  name : options.serie, data: spectrum }
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
        ]
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
      </div>
    );
  }
}
