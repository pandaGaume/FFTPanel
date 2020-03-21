// tslint:disable-next-line: interface-name
export interface FFTOptions {
  serie: string;
  sampling : number;
}

 export const defaults: FFTOptions = {
   serie: "put your serie name here.",
   sampling : 1
 };

/** Time/interval measured in seconds. */
export type Seconds = number;

/** A frequency measured in Hz (cycles per second). */
export type Hz = number;
export type FrequencyBand = {lo:Hz, hi:Hz } ;
