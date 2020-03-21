import { PanelPlugin } from "@grafana/data";
import { FFTOptions, defaults } from "./types";
import { FFTPanel } from "./FFTPanel";
import { FFTEditor } from "./FFTEditor";

// tslint:disable-next-line: typedef
export const plugin = new PanelPlugin<FFTOptions>(FFTPanel).setDefaults(defaults).setEditor(FFTEditor);
