
export type HildebrandError = {
  error: string
  isValid?: boolean
  missingElements?: string[]
}


export type AuthResponse = {
  accountId: string
  valid: boolean
  exp: number
  name: string
}

export type AuthResponseDetailed = {
  value: boolean
  name: string
  accountId: string
  token: string
  exp: number
  functionalGroupAccounts: string[]
  userGroups: string[]
}

export type RegisterUserArgs = {
  name: string
  username: string
  email: string
  password: string
  applicationId: string
  directoryId: string
}

export type UserApplication = {
  applicationId: string
  active: boolean
  accountId: string
}

export type RegisterUserResponse = {
  userId: string
  status: string
  active: boolean
  applications: UserApplication[]
  createdAt: string
  updatedAt: string
}

export type Resource = {
  resourceId: string
  resourceTypeId: string
  name: string
}

export type VirtualEntity<T> = {
  name: string
  veId: string
  veTypeId: string
  ownerId: string
  applicationId: string
  updatedAt: string
  createdAt: string
  resources: T[]
}

export enum Classifier {
  "electricity.consumption" = "electricity.consumption",
  "electricity.consumption.cost" = "electricity.consumption.cost",
  "gas.consumption" = "gas.consumption",
  "gas.consumption.cost" = "gas.consumption.cost",
}

export enum BaseUnit {
  "pence" = "pence",
  "kWh" = "kWh",
}

export type ResourceDetails = {
  resourceId: string
  resourceTypeId: string
  name: string
  classifier: Classifier
  description: string
  ownerId: string
  baseUnit: BaseUnit
  dataSourceType: string
  active: boolean
  label: string
}

export enum ReadingQueryPeriod {
  'PT1M' = 'PT1M',
  'PT30M' = 'PT30M',
  'PT1H' = 'PT1H',
  'P1D' = 'P1D',
  'P1W' = 'P1W',
  'P1M' = 'P1M',
  'P1Y' = 'P1Y',
}

export enum ReadingQueryFunction {
  avg = 'avg',
  sum = 'sum'
}

export type ReadingQuery = {
  from: Date
  to: Date
  period: ReadingQueryPeriod
  function: ReadingQueryFunction
  /*  All the data we store is saved in UTC (Coordinated Universal Time), regardless
      of the timezone it was collected in. For the API to correctly return the data for
      the period you request you must supply the offset in minutes between the
      timezone you require and UTC. As an example if you wish to request data in
      BST (British Summer Time, UTC+1) you should specify an offset of -60. EST (East
      Coast N America) would be +300.
   */
  offset?: string
}

export type Readings = {
  status: string
  name: string
  classifier: Classifier
  resourceTypeId: string
  resourceId: string
  query: ReadingQuery
  data: [utcTimestamp: number, reading: number][]
  units: string
}


export const isHildebrandError = (e: any): e is HildebrandError => {
  return e.error
}

export type VirtualEntityType = {
  veTypeId: string
  name: string
  description: string
  applicationId: string
  active: boolean
  resources: {
    resourceTypeId: string
    required: boolean
  }[]
}