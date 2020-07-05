export interface User {
  id: number
  name: string
  email: string
  password: string
  created_at: Date
  update_at: Date
}

export interface Api {
  id: number
  apiName: string
  descriptionApi: string
  version: string
  email: string
  license: string
  baseURL: string
  isPublic: boolean
  created_at: Date
  update_at: Date
  userIdFk: number
}

export interface Team {
  id: number
  teamName: string
  created_at: Date
  update_at: Date
  apiIdFk: number
  managerIdFk: number
}

export interface TeamRules {
  id: number
  created_at: Date
  update_at: Date
  teamIdFk: number
  userIdFk: number
}

export interface Tag {
  id: number
  nameTag: string
  descriptionTag: string
  created_at: Date
  update_at: Date
  apiIdFk: number
  userIdFk: number
}

export interface Path {
  id: number
  methodType: string
  pathName: string
  descriptionVerb: string
  path: string
  parameter: object
  headersValue: object
  bodyValue: object
  data: object
  created_at: Date
  update_at: Date
  tagsIdFk: number
  userIdFk: number
}

export interface Response {
  id: number
  typeCode: string
  responseModel: object
  created_at: Date
  update_at: Date
  pathsIdFk: number
  userIdFk: number
}

export interface Model {
  id: number
  model: object
  created_at: Date
  update_at: Date
  tagsIdFk: number
  userIdFk: number
}
