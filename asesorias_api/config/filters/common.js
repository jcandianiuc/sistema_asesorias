
const config = {
  env: process.env.NODE_ENV,
  endpoint: {
    laboratorio: `${process.env.API_GATEWAY_URL}/asesoria/`,
  },
};

module.exports = config;
