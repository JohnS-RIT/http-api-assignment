// writes responses to head
const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// If a /success url put in, send proper message
const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 200, responseString, 'application/json');
};

// If a /badRequest url put in, send proper message and id based on query
const badRequest = (request, response, acceptedTypes, params) => {
  let responseJSON = {
    message: 'Missing valid query parameter set to true',
    id: 'badRequest',
  };
  try {
    if (params.valid === 'true') {
      responseJSON = {
        message: 'This request has the required parameters',
      };

      if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
      }

      const responseString = JSON.stringify(responseJSON);
      return respond(request, response, 200, responseString, 'application/json');
    }
  } catch (e) {
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }
  }
  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 400, responseString, 'application/json');
};

// If an /unauthorized url put in, send proper message and id based on query
const unauthorized = (request, response, acceptedTypes, params) => {
  let responseJSON = {
    message: 'Missing loggedIn parameter set to yes',
    id: 'unauthorized',
  };

  try {
    if (params.loggedIn === 'yes') {
      responseJSON = {
        message: 'You have successfully viewed the content.',
      };

      if (acceptedTypes[0] === 'text/xml') {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
        responseXML = `${responseXML} </response>`;
        return respond(request, response, 200, responseXML, 'text/xml');
      }

      const responseString = JSON.stringify(responseJSON);
      return respond(request, response, 200, responseString, 'application/json');
    }
  } catch (e) {
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML, 'text/xml');
    }
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 401, responseString, 'application/json');
};

// If a /forbidden url put in, send proper message and id
const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 403, responseString, 'application/json');
};

// If a /internal url put in, send proper message and id
const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error, something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 500, responseString, 'application/json');
};

// If a /notImplemented url put in, send proper message and id
const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page had not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 501, responseString, 'application/json');
};

// If any other url put in, send proper message and id
const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseString = JSON.stringify(responseJSON);
  return respond(request, response, 404, responseString, 'application/json');
};

module.exports = {
  success, badRequest, unauthorized, forbidden, internal, notImplemented, notFound,
};
