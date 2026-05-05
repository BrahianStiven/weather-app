export interface WeatherHour {
  datetime: string;
  temp: number;
  icon: string;
}

export interface WeatherDay {
  datetime: string;
  hours: WeatherHour[];
}

export interface CurrentConditions {
  temp: number;
  windspeed: number;
  precipprob: number;
  conditions: string;
  icon: string;
}

export interface WeatherData {
  resolvedAddress: string;
  currentConditions: CurrentConditions;
  days: WeatherDay[];
}