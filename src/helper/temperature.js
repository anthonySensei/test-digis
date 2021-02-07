const KELVIN_CELSIUS_DIFFERENCE = 272.15;

export const kelvinToCelsius = temperature => {
  return parseInt(String(temperature - KELVIN_CELSIUS_DIFFERENCE));
};
