// tslint:disable-next-line: interface-name
export interface FFTOptions {
  serie: string;
<<<<<<< HEAD
  sampling : number;
=======
>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
}

 export const defaults: FFTOptions = {
   serie: "put your serie name here.",
<<<<<<< HEAD
   sampling : 1
 };

=======
 };

/** Time/interval measured in samples. */
export type Smp = number;

>>>>>>> 248cd7879e1441cd7f4977bbe912ede0803d7db7
/** Time/interval measured in seconds. */
export type Seconds = number;

/** A frequency measured in Hz (cycles per second). */
export type Hz = number;
export type FrequencyBand = {lo:Hz, hi:Hz } ;
