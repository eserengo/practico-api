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

const WeatherCode = ({ is_day, code, text, icon }) => {
  if (!is_day) {
    switch (code) {
      case 1:
        return (
          <span className={`${text}`}>
            Mayormente despejado{" "}
            <WiNightAltCloudyHigh className={`${icon}`} />
          </span>
        );
      case 2:
        return (
          <span className={`${text}`}>
            Parcialmente nublado{" "}
            <WiNightAltCloudy className={`${icon}`} />
          </span>
        );
      case 3:
        return (
          <span className={`${text}`}>
            Nublado cubierto{" "}
            <WiCloudy className={`${icon}`} />
          </span>
        );
      case 45:
        return (
          <span className={`${text}`}>
            Niebla{" "}
            <WiFog className={`${icon}`} />
          </span>
        );
      case 48:
        return (
          <span className={`${text}`}>
            Niebla con escarcha{" "}
            <WiSnowflakeCold className={`${icon}`} />
          </span>
        );
      case 51:
        return (
          <span className={`${text}`}>
            LLovizna ligera{" "}
            <WiNightAltSprinkle className={`${icon}`} />
          </span>
        );
      case 53:
        return (
          <span className={`${text}`}>
            LLovizna moderada{" "}
            <WiNightAltShowers className={`${icon}`} />
          </span>
        );
      case 55:
        return (
          <span className={`${text}`}>
            LLovizna intensa{" "}
            <WiNightAltRain className={`${icon}`} />
          </span>
        );
      case 56:
        return (
          <span className={`${text}`}>
            LLovizna helada ligera{" "}
            <WiNightAltSleet className={`${icon}`} />
          </span>
        );
      case 57:
        return (
          <span className={`${text}`}>
            LLovizna helada intensa{" "}
            <WiNightAltRainMix className={`${icon}`} />
          </span>
        );
      case 61:
        return (
          <span className={`${text}`}>
            Lluvias ligeras{" "}
            <WiSprinkle className={`${icon}`} />
          </span>
        );
      case 63:
        return (
          <span className={`${text}`}>
            Lluvias moderadas{" "}
            <WiShowers className={`${icon}`} />
          </span>
        );
      case 65:
        return (
          <span className={`${text}`}>
            Lluvias intensas{" "}
            <WiRain className={`${icon}`} />
          </span>
        );
      case 66:
        return (
          <span className={`${text}`}>
            Lluvias heladas ligeras{" "}
            <WiSleet className={`${icon}`} />
          </span>
        );
      case 67:
        return (
          <span className={`${text}`}>
            Lluvias heladas intensas{" "}
            <WiRainMix className={`${icon}`} />
          </span>
        );
      case 71:
        return (
          <span className={`${text}`}>
            Nevadas ligeras{" "}
            <WiNightAltSnow className={`${icon}`} />
          </span>
        );
      case 73:
        return (
          <span className={`${text}`}>
            Nevadas moderadas{" "}
            <WiNightAltSnow className={`${icon}`} />
          </span>
        );
      case 75:
        return (
          <span className={`${text}`}>
            Nevadas intensas{" "}
            <WiSnow className={`${icon}`} />
          </span>
        );
      case 77:
        return (
          <span className={`${text}`}>
            Nevizcas{" "}
            <WiNightAltSleet className={`${icon}`} />
          </span>
        );
      case 80:
        return (
          <span className={`${text}`}>
            Lluvias aisladas ligeras{" "}
            <WiNightAltSprinkle className={`${icon}`} />
          </span>
        );
      case 81:
        return (
          <span className={`${text}`}>
            Lluvias aisladas moderadas{" "}
            <WiNightAltShowers className={`${icon}`} />
          </span>
        );
      case 82:
        return (
          <span className={`${text}`}>
            Lluvias aisladas intensas{" "}
            <WiNightAltRain className={`${icon}`} />
          </span>
        );
      case 85:
        return (
          <span className={`${text}`}>
            Nevadas aisladas ligeras{" "}
            <WiNightAltSnow className={`${icon}`} />
          </span>
        );
      case 86:
        return (
          <span className={`${text}`}>
            Nevadas aisladas intensas{" "}
            <WiSnow className={`${icon}`} />
          </span>
        );
      case 95:
        return (
          <span className={`${text}`}>
            Tormentas eléctricas{" "}
            <WiNightAltLightning className={`${icon}`} />
          </span>
        );
      case 96:
        return (
          <span className={`${text}`}>
            Tormentas eléctricas con granizo ligero{" "}
            <WiNightAltSnowThunderstorm className={`${icon}`} />
          </span>
        );
      case 99:
        return (
          <span className={`${text}`}>
            Tormentas eléctricas con granizo intenso{" "}
            <WiNightAltStormShowers className={`${icon}`} />
          </span>
        );
      default:
        return (
          <span className={`${text}`}>
            Despejado{" "}
            <WiNightClear className={`${icon}`} />
          </span>
        );
    }
  } else {
    switch (code) {
      case 1:
        return (
          <span className={`${text}`}>
            Mayormente despejado{" "}
            <WiDayCloudyHigh className={`${icon}`} />
          </span>
        );
      case 2:
        return (
          <span className={`${text}`}>
            Parcialmente nublado{" "}
            <WiDayCloudy className={`${icon}`} />
          </span>
        );
      case 3:
        return (
          <span className={`${text}`}>
            Nublado cubierto{" "}
            <WiCloudy className={`${icon}`} />
          </span>
        );
      case 45:
        return (
          <span className={`${text}`}>
            Niebla{" "}
            <WiFog className={`${icon}`} />
          </span>
        );
      case 48:
        return (
          <span className={`${text}`}>
            Niebla con escarcha{" "}
            <WiSnowflakeCold className={`${icon}`} />
          </span>
        );
      case 51:
        return (
          <span className={`${text}`}>
            LLovizna ligera{" "}
            <WiDaySprinkle className={`${icon}`} />
          </span>
        );
      case 53:
        return (
          <span className={`${text}`}>
            LLovizna moderada{" "}
            <WiDayShowers className={`${icon}`} />
          </span>
        );
      case 55:
        return (
          <span className={`${text}`}>
            LLovizna intensa{" "}
            <WiDayRain className={`${icon}`} />
          </span>
        );
      case 56:
        return (
          <span className={`${text}`}>
            LLovizna helada ligera{" "}
            <WiDaySleet className={`${icon}`} />
          </span>
        );
      case 57:
        return (
          <span className={`${text}`}>
            LLovizna helada intensa{" "}
            <WiDayRainMix className={`${icon}`} />
          </span>
        );
      case 61:
        return (
          <span className={`${text}`}>
            Lluvias ligeras{" "}
            <WiSprinkle className={`${icon}`} />
          </span>
        );
      case 63:
        return (
          <span className={`${text}`}>
            Lluvias moderadas{" "}
            <WiShowers className={`${icon}`} />
          </span>
        );
      case 65:
        return (
          <span className={`${text}`}>
            Lluvias intensas{" "}
            <WiRain className={`${icon}`} />
          </span>
        );
      case 66:
        return (
          <span className={`${text}`}>
            Lluvias heladas ligeras{" "}
            <WiSleet className={`${icon}`} />
          </span>
        );
      case 67:
        return (
          <span className={`${text}`}>
            Lluvias heladas intensas{" "}
            <WiRainMix className={`${icon}`} />
          </span>
        );
      case 71:
        return (
          <span className={`${text}`}>
            Nevadas ligeras{" "}
            <WiDaySnow className={`${icon}`} />
          </span>
        );
      case 73:
        return (
          <span className={`${text}`}>
            Nevadas moderadas{" "}
            <WiDaySnow className={`${icon}`} />
          </span>
        );
      case 75:
        return (
          <span className={`${text}`}>
            Nevadas intensas{" "}
            <WiSnow className={`${icon}`} />
          </span>
        );
      case 77:
        return (
          <span className={`${text}`}>
            Nevizcas{" "}
            <WiDaySleet className={`${icon}`} />
          </span>
        );
      case 80:
        return (
          <span className={`${text}`}>
            Lluvias aisladas ligeras{" "}
            <WiDaySprinkle className={`${icon}`} />
          </span>
        );
      case 81:
        return (
          <span className={`${text}`}>
            Lluvias aisladas moderadas{" "}
            <WiDayShowers className={`${icon}`} />
          </span>
        );
      case 82:
        return (
          <span className={`${text}`}>
            Lluvias aisladas intensas{" "}
            <WiDayRain className={`${icon}`} />
          </span>
        );
      case 85:
        return (
          <span className={`${text}`}>
            Nevadas aisladas ligeras{" "}
            <WiDaySnow className={`${icon}`} />
          </span>
        );
      case 86:
        return (
          <span className={`${text}`}>
            Nevadas aisladas intensas{" "}
            <WiSnow className={`${icon}`} />
          </span>
        );
      case 95:
        return (
          <span className={`${text}`}>
            Tormentas eléctricas{" "}
            <WiDayLightning className={`${icon}`} />
          </span>
        );
      case 96:
        return (
          <span className={`${text}`}>
            Tormentas eléctricas con granizo ligero{" "}
            <WiDaySnowThunderstorm className={`${icon}`} />
          </span>
        );
      case 99:
        return (
          <span className={`${text}`}>
            Tormentas eléctricas con granizo intenso{" "}
            <WiDayStormShowers className={`${icon}`} />
          </span>
        );
      default:
        return (
          <span className={`${text}`}>
            Despejado{" "}
            <WiDaySunny className={`${icon}`} />
          </span>
        );
    }
  }
}

WeatherCode.propTypes = {
  is_day: PropTypes.number,
  code: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.string,
};

export default WeatherCode;
