import { coalesce } from "./utils.js";

const vu = parseInt(coalesce(__ENV.VUS_MAX_ENV, 3));

const rampStageNumber = Math.max(
  parseInt(coalesce(__ENV.SCENARIO_RAMP_STAGE_NUMBER_ENV, 3)),
  3
);

export const CONFIG = {
  TARGET_ENV: __ENV.TARGET_ENV,
  USE_INTERNAL_ACCESS_ENV:
    __ENV.USE_INTERNAL_ACCESS_ENV &&
    __ENV.USE_INTERNAL_ACCESS_ENV.toLowerCase() === "true",

  DUMP_REQUESTS: __ENV.REQ_DUMP && __ENV.REQ_DUMP.toLowerCase() === "true",

  VIRTUAL_USERS: vu,
  MAX_AVAILABLE_TEST_ENTITIES_ENV: coalesce(
    __ENV.MAX_AVAILABLE_TEST_ENTITIES_ENV,
    vu
  ),

  CONTEXT: {
    AUTH: {
      SELFCARE: {
        TOKEN_EXCHANGE: __ENV.SELFCARE_TOKEN_EXCHANGE_ENV,
        ISSUER: __ENV.SELFCARE_TOKEN_ISSUER_ENV,
      },
      PU: {
        CLIENT_ID: "piattaforma-unitaria",
        CLIENT_SECRET: __ENV.CLIENT_SECRET_PU_ENV,
      },
    },
    EXTERNAL_USER_ID: __ENV.EXTERNAL_USER_ID_ENV,
    ORG_IPA_CODE: coalesce(__ENV.ORG_IPA_CODE_ENV, "IPA_TEST_2"),
  },

  SCENARIOS: {
    TYPES: coalesce(__ENV.SCENARIO_TYPE_ENV, "constant-arrival-rate").split(
      ","
    ),

    perVuIterations: {
      RAMPING_SIZE:
        __ENV.SCENARIO_PER_VU_RAMPING_SIZE &&
        __ENV.SCENARIO_PER_VU_RAMPING_SIZE.toLowerCase() === "true",
      ONESHOT:
        __ENV.SCENARIO_PER_VU_SINGLE_ITERATION_ENV &&
        __ENV.SCENARIO_PER_VU_SINGLE_ITERATION_ENV.toLowerCase() !== "false",
      EXECUTIONS: parseInt(coalesce(__ENV.SCENARIO_PER_VU_EXECUTIONS_ENV, 1)),
      DURATION: parseInt(coalesce(__ENV.SCENARIO_DURATION_ENV, 3)),
    },

    constantArrivalRate: {
      RATE: vu,
      DURATION: parseInt(coalesce(__ENV.SCENARIO_DURATION_ENV, 3)),
      TIME_UNIT: parseInt(coalesce(__ENV.SCENARIO_TIME_UNIT_ENV, 1)),
    },

    RAMPS: {
      STAGES_NUMBER: rampStageNumber,
      STAGE_SECONDS_DURATION: Math.max(
        parseInt(coalesce(__ENV.SCENARIO_DURATION_ENV, 1)) / rampStageNumber,
        1
      ),

      rampingGrowingArrivalRate: {
        RAMP_BUILDING_VU_POOL: Math.min(
          parseInt(
            coalesce(
              __ENV.SCENARIO_RAMP_GROWING_RAMP_BUILDING_VU_POOL,
              Math.ceil((vu * (rampStageNumber - 1)) / 2)
            )
          ),
          Math.ceil((vu * (rampStageNumber - 1)) / 2)
        ),
      },
    },
  },

  THRESHOLDS: {
    DURATIONS: {
      AVG: parseInt(coalesce(__ENV.THRESHOLDS_API_MAX_AVG_MS_ENV, 700)),
      MAX: parseInt(coalesce(__ENV.THRESHOLDS_API_MAX_MAX_MS_ENV, 2500)),
      P90: parseInt(coalesce(__ENV.THRESHOLDS_API_MAX_P90_MS_ENV, 900)),
      P95: parseInt(coalesce(__ENV.THRESHOLDS_API_MAX_P95_MS_ENV, 1500)),
    },
    REQ_FAILED: {
      RATE: parseFloat(
        coalesce(__ENV.THRESHOLDS_API_MAX_FAILED_REQ_RATE_ENV, 0.05)
      ),
    },
  },

  SUMMARY: {
    RESULTS_DIR: __ENV.RESULTS_DIR,
  },
};

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export function buildDefaultParams(apiName, token) {
  return {
    headers: Object.assign(
      {},
      defaultHeaders,
      token ? { Authorization: `Bearer ${token}` } : {}
    ),
    tags: { apiName },
    redirects: 0,
  };
}
