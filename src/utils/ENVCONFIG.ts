const ENVCONFIG = {
  development: {
    dbUri: "http://localhost:3001",
  },
  deployment: {
    dbUri: "http://avarile.com:2095",
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
