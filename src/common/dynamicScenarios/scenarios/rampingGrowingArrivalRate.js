import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.4.0/index.js";
import { CONFIG } from "../../envVars.js";

const scenarioRampCustomStages = setStages(
  CONFIG.SCENARIOS.RAMPS.rampingGrowingArrivalRate.RAMP_BUILDING_VU_POOL,
  CONFIG.SCENARIOS.RAMPS.STAGE_SECONDS_DURATION,
  CONFIG.SCENARIOS.RAMPS.STAGES_NUMBER,
  CONFIG.VIRTUAL_USERS
);

export default {
  rampingGrowingArrivalRate: {
    executor: "ramping-arrival-rate",
    timeUnit: `${CONFIG.SCENARIOS.RAMPS.STAGE_SECONDS_DURATION}s`, //period of time to apply the iteration
    preAllocatedVUs: CONFIG.VIRTUAL_USERS, //Number of VUs to pre-allocate before test start to preserve runtime resources
    maxVUs: Math.min(
      CONFIG.VIRTUAL_USERS * 2,
      Math.max(500, CONFIG.VIRTUAL_USERS)
    ),
    stages: scenarioRampCustomStages,
  },
};

function setStages(rampBuildingVuPool, timeUnit, stageNumber, maxStageVu) {
  const arr = new Array(stageNumber);
  for (let i = stageNumber - 2; i >= 0; i--) {
    if (i == 0) {
      arr[i] = {
        duration: `${timeUnit}s`,
        target: Math.min(rampBuildingVuPool, maxStageVu),
      };
    } else {
      let r = randomIntBetween(
        1,
        Math.min(maxStageVu, rampBuildingVuPool / 2 - 1)
      );
      arr[i] = { duration: `${timeUnit}s`, target: r };
      rampBuildingVuPool -= r;
    }
  }
  arr.sort((a, b) => a.target - b.target);
  arr[stageNumber - 1] = { duration: `${timeUnit}s`, target: 0 };
  return arr;
}
