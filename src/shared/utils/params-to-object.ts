export function paramsToObject(entries: IterableIterator<[string, string]>) {
  const result:{[key:string]:string} = {}
  for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}