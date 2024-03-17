

export const plural = (value?:number, variants:{zero?: string, one?: string, two?: string, few?: string, many?: string, other?:string} = {}, locale:string = 'ru-RU') => {

  if(value){
    
    const key = new Intl.PluralRules(locale).select(value);
    
    return variants[key] || '';
  }
  return '';
}