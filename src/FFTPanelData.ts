import {Transform, TransformCallback} from "stream";
import { PanelData, DataFrame, Field } from "@grafana/data";
import {FFT} from "dsp.js";


interface IFFTResult {
    sampling:number;
    bandwidth:number;
    peak:number;
    peakBand:number;
    spectrum:number[] ;
}

// remember that a Transform stream is a Duplex stream where the output
// is computed in some way from the input. Examples include zlib streams
// or crypto streams that compress, encrypt, or decrypt data.
// @see https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream
class ForwardFFTPanelData extends Transform {

    private _sn:string;
    private _sr:number;

    constructor(serieName:string, samplingRate:number, public windowSize:number =2048) {
        super({objectMode: true});
        // ensure not case sensitive...
        this._sn = serieName.toUpperCase();
        this._sr = samplingRate??1;
    }

    // simple solution is to start checking from n and keep decrementing until we find a power of 2.
    private nearestPow2( size:number ):number {
        let res:number = 0;
        for (var i:number = size; i >= 1; i--) {
            // if i is a power of 2
            // tslint:disable-next-line: no-bitwise
            if ((i & (i - 1)) === 0) {
                res = i;
                break;
            }
        }
        return res;
    }

    _transform(input:PanelData, encoding:string, callback:TransformCallback): void {
        const {series} = input;
        let frame:undefined|DataFrame = series?.find(s=>s.name?.toUpperCase() === this._sn );
        let field:undefined|Field = frame?.fields.find(s=>s.name?.toUpperCase() === this._sn );
        let signal:undefined|any[] = field?.values.toArray();
        if( signal && signal.length) {
            let pow2size:number =  this.nearestPow2(signal.length);
            let fftFunction: any = new FFT( pow2size, this._sr);
            signal = signal.length > pow2size ? signal.slice(0,pow2size) : signal;
            fftFunction.forward(signal);
            let spectrum:any = {
                    sampling:fftFunction.sampleRate,
                    bandwidth:fftFunction.bandwidth,
                    peak:fftFunction.peak,
                    peakBand:fftFunction.peakBand,
                    spectrum:fftFunction.spectrum };
            callback(null, spectrum);
        } else {
            callback(new Error("[ForwardFFTPanelData]:Empty Serie:" + this._sn));
        }
    }
}

export { ForwardFFTPanelData, IFFTResult};