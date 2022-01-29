
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


export type Classifier = "electricity.consumption" | "electricity.consumption.cost" | "gas.consumption" | "gas.consumption.cost"
export type BaseUnit = "pence" | "kWh"

export type ResourceDetails = {
  resourceId: string
  resourceTypeId: string
  name: string
  classifier: Classifier
  description: string
  ownerId: string
  baseUnit: BaseUnit
  active: boolean
}

export type Period = 'PT1M' | 'PT30M' | 'PT1H' | 'P1D' | 'P1W' | 'P1M' | 'P1Y'

export type ReadingQuery = {
  from: string
  to: string
  period: Period
  function: 'sum' | 'avg'
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
