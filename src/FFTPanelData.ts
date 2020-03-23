import {Transform, TransformCallback} from "stream";
import { PanelData, DataFrame, Field } from "@grafana/data";
<<<<<<< HEAD
import {FFT} from "dsp.js";


interface IFFTResult {
    sampling:number;
    bandwidth:number;
    peak:number;
    peakBand:number;
    spectrum:number[] ;
}

=======
import * as FFTJS from "fft.js";


>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
// remember that a Transform stream is a Duplex stream where the output
// is computed in some way from the input. Examples include zlib streams
// or crypto streams that compress, encrypt, or decrypt data.
// @see https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream
class ForwardFFTPanelData extends Transform {

    private _sn:string;
<<<<<<< HEAD
    private _sr:number;

    constructor(serieName:string, samplingRate:number, public windowSize:number =2048) {
        super({objectMode: true});
        // ensure not case sensitive...
        this._sn = serieName.toUpperCase();
        this._sr = samplingRate??1;
=======
    private _cs :boolean;

    constructor(serieName:string, public windowSize:number =2048, completeSpectrum:boolean = false) {
        super({objectMode: true});
        // ensure not case sensitive...
        this._sn = serieName.toUpperCase();
        this._cs = completeSpectrum;
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
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
<<<<<<< HEAD
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
=======
        let values:undefined|any[] = field?.values.toArray();
        if( values && values.length) {
            let size:number =  this.nearestPow2(values.length);
            let fftFunction: any = new FFTJS(size);
            let target: number[] = new Array(this._cs?size*2:size);
            fftFunction.realTransform(target, values);
            if( this._cs) {
                fftFunction.completeSpectrum(target);
            }
            callback(null, target);
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
        } else {
            callback(new Error("[ForwardFFTPanelData]:Empty Serie:" + this._sn));
        }
    }
}

<<<<<<< HEAD
export { ForwardFFTPanelData, IFFTResult};
=======
export { ForwardFFTPanelData };
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
