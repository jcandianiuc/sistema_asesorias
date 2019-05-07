const polyfill = require('./polyfill');
const DEFAULT_LIMIT = 15;
const DEFAULT_OFFSET = 0;

/**
 * Método encargado de adaptar el filtro de limite para la consulta de los repositorios
 * @param {ContextDelegatedRequest.query} request 
 */
function adapt(request) {
  let limit = polyfill.is_numeric(request.limit) ? request.limit : DEFAULT_LIMIT;
  let offset = polyfill.is_numeric(request.offset) ? request.offset : DEFAULT_OFFSET;
  let parsedParms = queryStringParser(request);

  request.limit = [parseInt(offset), parseInt(limit)];

  return { ...request, ...parsedParms };
}

/**
 * 
 * @param {Object} params 
 */
function queryStringParser(params) {

  const res = {};

  for (const param in params) {
    let parseParam = setParams(params[param]);
    if (!polyfill.empty(parseParam)) {
      res[param] = parseParam;
    }
  }

  return res;
}

/**
 * 
 * @param {string} params 
 */
function setParams(params) {
  let regex = /([A-Za-z]+):(\/.*\/|[^\|]*)/gi;
  let match;
  const res = {};

  while (match = regex.exec(params)) {
    res[match[1]] = parse(match[2]);
  }

  return res;
}

/**
 * 
 * @param {string} param 
 */
function parse(param) {
  let value;

  if (polyfill.is_numeric(param)) {
    value = parseFloat(param);
  } else if (param.indexOf(',') !== -1 && /^\/.*\/$/gi.test(param) === false) {
    value = param.split(',');
  } else {
    value = param || true;
  }

  return value;
}

module.exports = { adapt };