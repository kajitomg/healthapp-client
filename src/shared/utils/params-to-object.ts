export function paramsToObject(entries: IterableIterator<[string, string]>) {
  let result:{[key:string]:string} = {}
  for(const [key] of entries) { // each 'entry' is a [key, value] tupple
    result = JSON.parse(key)
  }
  return result;
}