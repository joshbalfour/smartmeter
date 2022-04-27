import { Fuel } from './entities/resource'

export const getFuelFromClassifier: (classifier: string) => Fuel = classifier => {
  if (classifier.startsWith('E')) {
    return Fuel.ELECTRICITY
  }

  return Fuel.GAS
}
