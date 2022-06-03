const ENVCONFIG = {
  development: {
    dbUri: "http://localhost:3001",
  },
  deployment: {
    dbUri: "http://121.220.33.19:2096",
  },
};

const envSwitch = (switchSelector: "development" | "production" | "test") => {
  if (switchSelector === "development") {
    return ENVCONFIG.development;
  }
  if (switchSelector === "production") {
    return ENVCONFIG.deployment;
  }
  if (switchSelector === "test") {
    return ENVCONFIG.deployment;
  } else {
    throw new Error("Wrong Env selection");
  }
};

export default envSwitch;
