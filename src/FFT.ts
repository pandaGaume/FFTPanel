import {Transform, TransformCallback} from "stream";
import * as FFTJS from "fft.js";

// remember that a Transform stream is a Duplex stream where the output
// is computed in some way from the input. Examples include zlib streams
// or crypto streams that compress, encrypt, or decrypt data.
// @see https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream
class ForwardFFT extends Transform {

  frameSize: number;
  fftFunction: any;

  constructor(public windowSize: number =2048) {
    super({objectMode:true});
    this.frameSize = this.windowSize * 2;
    this.fftFunction = new FFTJS(this.windowSize);
  }

  _transform(signal:number[], encoding:string, callback:TransformCallback): void {

    if(signal.length === this.windowSize) {
        let target: number[] = new Array(this.frameSize);
        this.fftFunction.realTransform(target, signal);
        this.fftFunction.completeSpectrum(target);
        callback(null, target);
    } else {
        callback(new Error("[FFT]:Bad size:" + signal.length));
    }
  }
}

class InverseFFT extends Transform {

    frameSize: number;
    fftFunction: any;

    constructor(public windowSize: number =2048) {
      super({objectMode:true});
      this.frameSize = this.windowSize * 2;
      this.fftFunction = FFTJS(this.windowSize);
    }

    _transform(spectrum:number[], encoding:string, callback:TransformCallback): void {

        if(spectrum.length !== this.frameSize) {
            let complex: number[] = new Array(this.frameSize);
            this.fftFunction.inverseTransform(complex, spectrum);
            let real: number[] = new Array(this.windowSize);
            // discard imaginary part
            for(let i:number=0; i<this.windowSize; i++) {
                real[i] = complex[2*i];
            }
            callback(null, real);
        } else {
            callback(new Error("[FFT]:Bad size:" + spectrum.length));
        }
    }
  }

export { ForwardFFT, InverseFFT } ;