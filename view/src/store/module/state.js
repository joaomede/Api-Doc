import listCodes from '../../utils/commonCodes'

export default function () {
  return {
    user: null,
    version: process.env.VERSION,
    apisList: null,
    urlApi: null,
    tag: {
      id: ''
    },
    path: {
      id: ''
    },
    response: {
      id: ''
    },
    apiData: {},
    tagIndex: null,
    pathIndex: null,
    responseIndex: null,
    rulesId: null,
    typeMethods: [
      {
        label: 'Get',
        value: 'GET'
      },
      {
        label: 'Post',
        value: 'POST'
      },
      {
        label: 'Put',
        value: 'PUT'
      },
      {
        label: 'Delete',
        value: 'DELETE'
      }
    ],
    typeCodes: listCodes
  }
}
