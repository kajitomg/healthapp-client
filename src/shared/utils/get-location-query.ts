export const getLocationQuery = () => {
  const splitedPath = window.location.pathname.split('/')
  
  return Number.isInteger(parseFloat(splitedPath[splitedPath.length - 1])) ? parseFloat(splitedPath[splitedPath.length - 1]) : null
}