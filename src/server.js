const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  let params = query.parse(request.url, '/badRequest?');

  if (params.valid !== 'true') { params = query.parse(request.url, '/unauthorized?'); }

  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[request.method][parsedUrl.pathname] && (params.valid || params.loggedIn)) {
    urlStruct[request.method][parsedUrl.pathname](request, response, acceptedTypes, params);
  } else if (urlStruct[request.method][parsedUrl.pathname] && !params.valid && !params.loggedIn) {
    urlStruct[request.method][parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    urlStruct[request.method].notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
