import { SpeedInsights } from "@vercel/speed-insights/next";
import WeatherApp from "./WeatherApp";

function SpeedInsightsWrapper() {
  return (
    <SpeedInsights>
      <WeatherApp />
    </SpeedInsights>
  );
}

export default SpeedInsightsWrapper;