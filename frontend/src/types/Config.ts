export interface Config {
  time: number,
  capitals: boolean,
  numbers: boolean,
  punctuation: boolean,
  liveWPM: boolean,
}
export interface ConfigField {
  [key: string]: number | string;
}
export interface ConfigContextType {
  config: Config, 
  updateConfig: (field: ConfigField) => void
}