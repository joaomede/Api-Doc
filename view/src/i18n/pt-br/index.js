export default {
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
      code: 'The request has succeeded.'
    }
  }
}
