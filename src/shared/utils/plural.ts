

export const plural = (value?:number | string, variants:{zero?: string, one?: string, two?: string, few?: string, many?: string, other?:string} = {}, locale:string = 'ru-RU') => {
  if(typeof value === "string"){
    value = +value
  }
  if(value){
    
    const key = new Intl.PluralRules(locale).select(value);
    
    return variants[key] || '';
  }
  return '';
}