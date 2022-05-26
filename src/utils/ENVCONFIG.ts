const ENVCONFIG = {
  development: {
    dbUri: "http://localhost:3001",
  },
  deployment: {
    dbUri: "https://137.147.94.100:3001",
  },
};

interface IEnvConfig {
  development: Object;
  deployment: Object;
}
const envSwitch = (switchSelector: "dev" | "dep") => {
  if (switchSelector === "dev") {
    return ENVCONFIG.development;
  }
  if (switchSelector === "dep") {
    return ENVCONFIG.deployment;
  } else {
    throw new Error("Wrong Env selection");
  }
};

export default envSwitch;
