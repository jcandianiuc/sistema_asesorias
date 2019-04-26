
const processType = process.env.PROCESS_TYPE
const config = require(`./${processType}`);

module.exports = config;