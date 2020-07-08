export default {
  geral: {
    questionDelete: 'Do you really want to delete this item?',
    confirm: 'Yes',
    deny: 'No',
    back: 'Back'
  },
  menu: {
    dialogAddApi: {
      title: 'Enter your API data',
      form: {
        apiName: 'New API name',
        descriptionApi: 'Enter a description',
        version: 'Enter the current version of the api',
        email: 'Enter a contact email',
        license: 'Enter the type of license or link',
        isPublic: 'Is it public?',
        baseURL: 'Enter the URL address of the API'
      }
    }
  },
  commonCodes: {
    // 1xx
    '100': {
      code: '100 Continue',
      reason: 'This interim response indicates that everything so far is OK and that the client should continue the request, or ignore the response if the request is already finished.'
    },
    '101': {
      code: '101 Switching Protocol',
      reason: 'This code is sent in response to an Upgrade request header from the client, and indicates the protocol the server is switching to.'
    },
    '103': {
      code: '103 Early Hints',
      reason: 'This status code is primarily intended to be used with the Link header, letting the user agent start preloading resources while the server prepares a response.'
    },
    // 2xx
    '200': {
      code: '200 OK',
      reason: 'The request has succeeded.'
    },
    '201': {
      code: '201 Created.',
      reason: 'The request has succeeded and a new resource has been created as a result. This is typically the response sent after POST requests, or some PUT requests.'
    },
    '202': {
      code: '202 Accepted.',
      reason: 'The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.'
    },
    '203': {
      code: '203 Non-Authoritative Information.',
      reason: 'This response code means the returned meta-information is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the "200 OK" response is preferred to this status.'
    },
    '204': {
      code: '204 No Content',
      reason: 'There is no content to send for this request, but the headers may be useful. The user-agent may update its cached headers for this resource with the new ones.'
    },
    '205': {
      code: '205 Reset Content',
      reason: 'Tells the user-agent to reset the document which sent this request.'
    },
    '206': {
      code: '206 Partial Content',
      reason: 'This response code is used when the Range header is sent from the client to request only part of a resource.'
    },
    // 3xx
    '300': {
      code: '300 Multiple Choice',
      reason: 'The request has more than one possible response. The user-agent or user should choose one of them.'
    },
    '301': {
      code: '301 Moved Permanently',
      reason: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.'
    },
    '302': {
      code: '302 Found',
      reason: 'This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future.'
    },
    '303': {
      code: '303 See Other',
      reason: 'The server sent this response to direct the client to get the requested resource at another URI with a GET request.'
    },
    '304': {
      code: '304 Not Modified',
      reason: 'This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.'
    },
    '307': {
      code: '307 Temporary Redirect',
      reason: 'The server sends this response to direct the client to get the requested resource at another URI with same method that was used in the prior request.'
    },
    '308': {
      code: '308 Permanent Redirect',
      reason: 'This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.'
    },
    // 4xx
    '400': {
      code: '400 Bad Request',
      reason: 'The server could not understand the request due to invalid syntax.'
    },
    '401': {
      code: '401 Unauthorized',
      reason: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".'
    },
    '403': {
      code: '403 Forbidden',
      reason: 'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.'
    },
    '404': {
      code: '404 Not Found',
      reason: 'The server can not find requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist.'
    },
    '405': {
      code: '405 Method Not Allowed',
      reason: 'The request method is known by the server but has been disabled and cannot be used. For example, an API may forbid DELETE-ing a resource.'
    },
    '406': {
      code: '406 Not Acceptable',
      reason: 'This response is sent when the web server, after performing server-driven content negotiation, doesnt find any content that conforms to the criteria given by the user agent.'
    },
    '407': {
      code: '407 Proxy Authentication Required',
      reason: 'This is similar to 401 but authentication is needed to be done by a proxy.'
    },
    '408': {
      code: '408 Request Timeout',
      reason: 'This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection.'
    },
    '409': {
      code: '409 Conflict',
      reason: 'This response is sent when a request conflicts with the current state of the server.'
    },
    '410': {
      code: '410 Gone',
      reason: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.'
    },
    '411': {
      code: '411 Length Required',
      reason: 'Server rejected the request because the Content-Length header field is not defined and the server requires it.'
    },
    '412': {
      code: '412 Precondition Failed',
      reason: 'The client has indicated preconditions in its headers which the server does not meet.'
    },
    '413': {
      code: '413 Payload Too Large',
      reason: 'Request entity is larger than limits defined by server; the server might close the connection or return an Retry-After header field.'
    },
    '414': {
      code: '414 URI Too Long',
      reason: 'The URI requested by the client is longer than the server is willing to interpret.'
    },
    '415': {
      code: '415 Unsupported Media Type',
      reason: 'The media format of the requested data is not supported by the server, so the server is rejecting the request.'
    },
    '416': {
      code: '416 Range Not Satisfiable',
      reason: 'The range specified by the Range header field in the request cant be fulfilled; its possible that the range is outside the size of the target URIs data.'
    },
    '417': {
      code: '417 Expectation Failed',
      reason: 'This response code means the expectation indicated by the Expect request header field cant be met by the server.'
    },
    '418': {
      code: '418 Im a teapot',
      reason: 'The server refuses the attempt to brew coffee with a teapot.'
    },
    '425': {
      code: '425 Too Early',
      reason: 'Indicates that the server is unwilling to risk processing a request that might be replayed.'
    },
    '426': {
      code: '426 Upgrade Required',
      reason: 'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.'
    },
    '428': {
      code: '428 Precondition Required',
      reason: 'The origin server requires the request to be conditional.'
    },
    '429': {
      code: '429 Too Many Requests',
      reason: 'The user has sent too many requests in a given amount of time ("rate limiting").'
    },
    '431': {
      code: '431 Request Header Fields Too Large',
      reason: 'The server is unwilling to process the request because its header fields are too large.'
    },
    '451': {
      code: '451 Unavailable For Legal Reasons',
      reason: 'The user-agent requested a resource that cannot legally be provided, such as a web page censored by a government.'
    },
    // 5xx
    '500': {
      code: '500 Internal Server Error',
      reason: 'The server has encountered a situation it doesnt know how to handle.'
    },
    '501': {
      code: '501 Not Implemented',
      reason: 'The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are GET and HEAD.'
    },
    '502': {
      code: '502 Bad Gateway',
      reason: 'This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.'
    },
    '503': {
      code: '503 Service Unavailable',
      reason: 'The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.'
    },
    '504': {
      code: '504 Gateway Timeout',
      reason: 'This error response is given when the server is acting as a gateway and cannot get a response in time.'
    },
    '505': {
      code: '505 HTTP Version Not Supported',
      reason: 'The HTTP version used in the request is not supported by the server.'
    },
    '506': {
      code: '506 Variant Also Negotiates',
      reason: 'The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.'
    },
    '510': {
      code: '510 Not Extended',
      reason: 'Further extensions to the request are required for the server to fulfil it.'
    },
    '511': {
      code: '511 Network Authentication Required',
      reason: 'The 511 status code indicates that the client needs to authenticate to gain network access.'
    }
  }
}
