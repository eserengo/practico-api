import {
  WiCloudy,
  WiFog,
  WiRain,
  WiRainMix,
  WiShowers,
  WiSleet,
  WiSnow,
  WiSnowflakeCold,
  WiSprinkle,
  WiDayCloudy,
  WiDayCloudyHigh,
  WiDayLightning,
  WiDaySleet,
  WiDaySnow,
  WiDaySunny,
  WiDayRain,
  WiDayRainMix,
  WiDayShowers,
  WiDaySprinkle,
  WiDaySnowThunderstorm,
  WiDayStormShowers,
  WiNightClear,
  WiNightAltCloudy,
  WiNightAltCloudyHigh,
  WiNightAltLightning,
  WiNightAltRain,
  WiNightAltRainMix,
  WiNightAltShowers,
  WiNightAltSprinkle,
  WiNightAltSleet,
  WiNightAltSnow,
  WiNightAltSnowThunderstorm,
  WiNightAltStormShowers,
} from "react-icons/wi"
import PropTypes from "prop-types"

const WeatherCode = ({ data }) => {
  if (!data.current_weather.is_day) {
    switch (data.current_weather.weathercode) {
      case 1:
        return (
          <span className="text-2xl text-center">
            Mayormente despejado{" "}
            <WiNightAltCloudyHigh className="text-8xl mx-auto" />
          </span>
        );
      case 2:
        return (
          <span className="text-2xl text-center">
            Parcialmente nublado{" "}
            <WiNightAltCloudy className="text-8xl mx-auto" />
          </span>
        );
      case 3:
        return (
          <span className="text-2xl text-center">
            Nublado cubierto{" "}
            <WiCloudy className="text-8xl mx-auto" />
          </span>
        );
      case 45:
        return (
          <span className="text-2xl text-center">
            Niebla{" "}
            <WiFog className="text-8xl mx-auto" />
          </span>
        );
      case 48:
        return (
          <span className="text-2xl text-center">
            Niebla con escarcha{" "}
            <WiSnowflakeCold className="text-8xl mx-auto" />
          </span>
        );
      case 51:
        return (
          <span className="text-2xl text-center">
            LLovizna ligera{" "}
            <WiNightAltSprinkle className="text-8xl mx-auto" />
          </span>
        );
      case 53:
        return (
          <span className="text-2xl text-center">
            LLovizna moderada{" "}
            <WiNightAltShowers className="text-8xl mx-auto" />
          </span>
        );
      case 55:
        return (
          <span className="text-2xl text-center">
            LLovizna intensa{" "}
            <WiNightAltRain className="text-8xl mx-auto" />
          </span>
        );
      case 56:
        return (
          <span className="text-2xl text-center">
            LLovizna helada ligera{" "}
            <WiNightAltSleet className="text-8xl mx-auto" />
          </span>
        );
      case 57:
        return (
          <span className="text-2xl text-center">
            LLovizna helada intensa{" "}
            <WiNightAltRainMix className="text-8xl mx-auto" />
          </span>
        );
      case 61:
        return (
          <span className="text-2xl text-center">
            Lluvias ligeras{" "}
            <WiSprinkle className="text-8xl mx-auto" />
          </span>
        );
      case 63:
        return (
          <span className="text-2xl text-center">
            Lluvias moderadas{" "}
            <WiShowers className="text-8xl mx-auto" />
          </span>
        );
      case 65:
        return (
          <span className="text-2xl text-center">
            Lluvias intensas{" "}
            <WiRain className="text-8xl mx-auto" />
          </span>
        );
      case 66:
        return (
          <span className="text-2xl text-center">
            Lluvias heladas ligeras{" "}
            <WiSleet className="text-8xl mx-auto" />
          </span>
        );
      case 67:
        return (
          <span className="text-2xl text-center">
            Lluvias heladas intensas{" "}
            <WiRainMix className="text-8xl mx-auto" />
          </span>
        );
      case 71:
        return (
          <span className="text-2xl text-center">
            Nevadas ligeras{" "}
            <WiNightAltSnow className="text-8xl mx-auto" />
          </span>
        );
      case 73:
        return (
          <span className="text-2xl text-center">
            Nevadas moderadas{" "}
            <WiNightAltSnow className="text-8xl mx-auto" />
          </span>
        );
      case 75:
        return (
          <span className="text-2xl text-center">
            Nevadas intensas{" "}
            <WiSnow className="text-8xl mx-auto" />
          </span>
        );
      case 77:
        return (
          <span className="text-2xl text-center">
            Nevizcas{" "}
            <WiNightAltSleet className="text-8xl mx-auto" />
          </span>
        );
      case 80:
        return (
          <span className="text-2xl text-center">
            Lluvias aisladas ligeras{" "}
            <WiNightAltSprinkle className="text-8xl mx-auto" />
          </span>
        );
      case 81:
        return (
          <span className="text-2xl text-center">
            Lluvias aisladas moderadas{" "}
            <WiNightAltShowers className="text-8xl mx-auto" />
          </span>
        );
      case 82:
        return (
          <span className="text-2xl text-center">
            Lluvias aisladas intensas{" "}
            <WiNightAltRain className="text-8xl mx-auto" />
          </span>
        );
      case 85:
        return (
          <span className="text-2xl text-center">
            Nevadas aisladas ligeras{" "}
            <WiNightAltSnow className="text-8xl mx-auto" />
          </span>
        );
      case 86:
        return (
          <span className="text-2xl text-center">
            Nevadas aisladas intensas{" "}
            <WiSnow className="text-8xl mx-auto" />
          </span>
        );
      case 95:
        return (
          <span className="text-2xl text-center">
            Tormentas eléctricas{" "}
            <WiNightAltLightning className="text-8xl mx-auto" />
          </span>
        );
      case 96:
        return (
          <span className="text-2xl text-center">
            Tormentas eléctricas con granizo ligero{" "}
            <WiNightAltSnowThunderstorm className="text-8xl mx-auto" />
          </span>
        );
      case 99:
        return (
          <span className="text-2xl text-center">
            Tormentas eléctricas con granizo intenso{" "}
            <WiNightAltStormShowers className="text-8xl mx-auto" />
          </span>
        );
      default:
        return (
          <span className="text-2xl text-center">
            Despejado{" "}
            <WiNightClear className="text-8xl mx-auto" />
          </span>
        );
    }
  } else {
    switch (data.current_weather.weathercode) {
      case 1:
        return (
          <span className="text-2xl text-center">
            Mayormente despejado{" "}
            <WiDayCloudyHigh className="text-8xl mx-auto" />
          </span>
        );
      case 2:
        return (
          <span className="text-2xl text-center">
            Parcialmente nublado{" "}
            <WiDayCloudy className="text-8xl mx-auto" />
          </span>
        );
      case 3:
        return (
          <span className="text-2xl text-center">
            Nublado cubierto{" "}
            <WiCloudy className="text-8xl mx-auto" />
          </span>
        );
      case 45:
        return (
          <span className="text-2xl text-center">
            Niebla{" "}
            <WiFog className="text-8xl mx-auto" />
          </span>
        );
      case 48:
        return (
          <span className="text-2xl text-center">
            Niebla con escarcha{" "}
            <WiSnowflakeCold className="text-8xl mx-auto" />
          </span>
        );
      case 51:
        return (
          <span className="text-2xl text-center">
            LLovizna ligera{" "}
            <WiDaySprinkle className="text-8xl mx-auto" />
          </span>
        );
      case 53:
        return (
          <span className="text-2xl text-center">
            LLovizna moderada{" "}
            <WiDayShowers className="text-8xl mx-auto" />
          </span>
        );
      case 55:
        return (
          <span className="text-2xl text-center">
            LLovizna intensa{" "}
            <WiDayRain className="text-8xl mx-auto" />
          </span>
        );
      case 56:
        return (
          <span className="text-2xl text-center">
            LLovizna helada ligera{" "}
            <WiDaySleet className="text-8xl mx-auto" />
          </span>
        );
      case 57:
        return (
          <span className="text-2xl text-center">
            LLovizna helada intensa{" "}
            <WiDayRainMix className="text-8xl mx-auto" />
          </span>
        );
      case 61:
        return (
          <span className="text-2xl text-center">
            Lluvias ligeras{" "}
            <WiSprinkle className="text-8xl mx-auto" />
          </span>
        );
      case 63:
        return (
          <span className="text-2xl text-center">
            Lluvias moderadas{" "}
            <WiShowers className="text-8xl mx-auto" />
          </span>
        );
      case 65:
        return (
          <span className="text-2xl text-center">
            Lluvias intensas{" "}
            <WiRain className="text-8xl mx-auto" />
          </span>
        );
      case 66:
        return (
          <span className="text-2xl text-center">
            Lluvias heladas ligeras{" "}
            <WiSleet className="text-8xl mx-auto" />
          </span>
        );
      case 67:
        return (
          <span className="text-2xl text-center">
            Lluvias heladas intensas{" "}
            <WiRainMix className="text-8xl mx-auto" />
          </span>
        );
      case 71:
        return (
          <span className="text-2xl text-center">
            Nevadas ligeras{" "}
            <WiDaySnow className="text-8xl mx-auto" />
          </span>
        );
      case 73:
        return (
          <span className="text-2xl text-center">
            Nevadas moderadas{" "}
            <WiDaySnow className="text-8xl mx-auto" />
          </span>
        );
      case 75:
        return (
          <span className="text-2xl text-center">
            Nevadas intensas{" "}
            <WiSnow className="text-8xl mx-auto" />
          </span>
        );
      case 77:
        return (
          <span className="text-2xl text-center">
            Nevizcas{" "}
            <WiDaySleet className="text-8xl mx-auto" />
          </span>
        );
      case 80:
        return (
          <span className="text-2xl text-center">
            Lluvias aisladas ligeras{" "}
            <WiDaySprinkle className="text-8xl mx-auto" />
          </span>
        );
      case 81:
        return (
          <span className="text-2xl text-center">
            Lluvias aisladas moderadas{" "}
            <WiDayShowers className="text-8xl mx-auto" />
          </span>
        );
      case 82:
        return (
          <span className="text-2xl text-center">
            Lluvias aisladas intensas{" "}
            <WiDayRain className="text-8xl mx-auto" />
          </span>
        );
      case 85:
        return (
          <span className="text-2xl text-center">
            Nevadas aisladas ligeras{" "}
            <WiDaySnow className="text-8xl mx-auto" />
          </span>
        );
      case 86:
        return (
          <span className="text-2xl text-center">
            Nevadas aisladas intensas{" "}
            <WiSnow className="text-8xl mx-auto" />
          </span>
        );
      case 95:
        return (
          <span className="text-2xl text-center">
            Tormentas eléctricas{" "}
            <WiDayLightning className="text-8xl mx-auto" />
          </span>
        );
      case 96:
        return (
          <span className="text-2xl text-center">
            Tormentas eléctricas con granizo ligero{" "}
            <WiDaySnowThunderstorm className="text-8xl mx-auto" />
          </span>
        );
      case 99:
        return (
          <span className="text-2xl text-center">
            Tormentas eléctricas con granizo intenso{" "}
            <WiDayStormShowers className="text-8xl mx-auto" />
          </span>
        );
      default:
        return (
          <span className="text-2xl text-center">
            Despejado{" "}
            <WiDaySunny className="text-8xl mx-auto" />
          </span>
        );
    }
  }
}

WeatherCode.propTypes = {
  data: PropTypes.object,
};

export default WeatherCode;