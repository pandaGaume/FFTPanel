import {Transform, TransformCallback} from "stream";
import { PanelData, DataFrame, Field } from "@grafana/data";
import * as FFTJS from "fft.js";


// remember that a Transform stream is a Duplex stream where the output
// is computed in some way from the input. Examples include zlib streams
// or crypto streams that compress, encrypt, or decrypt data.
// @see https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream
class ForwardFFTPanelData extends Transform {

    private _sn:string;
    private _cs :boolean;

    constructor(serieName:string, public windowSize:number =2048, completeSpectrum:boolean = false) {
        super({objectMode: true});
        // ensure not case sensitive...
        this._sn = serieName.toUpperCase();
        this._cs = completeSpectrum;
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
        } else {
            callback(new Error("[ForwardFFTPanelData]:Empty Serie:" + this._sn));
        }
    }
}

export { ForwardFFTPanelData };