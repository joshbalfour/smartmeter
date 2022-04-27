export const dateToGlowmarktString = (date: Date) => {
  return date.toISOString().split('.')[0]
}