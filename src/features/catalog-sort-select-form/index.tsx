import {Box} from "@mui/material";
import {Option, SelectForm} from "../../shared/components/select";
import {useCallback, useMemo} from "react";
import {useSetParams} from "../../entities/params-controller/hooks/use-set-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";

enum SortDirections {
  ASC = 'ASC',
  DESC = 'DESC',
}

interface SortOption extends Option {
  data: { fieldName:string,direction:SortDirections }
}

/*
  Сортировка по (цена, наличие)..., выбор нескольких категорий
 */
 

const CatalogSortSelectForm = () => {
  const {page} = useSetPage()
  const {params,setParams} = useSetParams({page})
  
  const options = {
    sort:useMemo<SortOption[]>(() => ([
      {value:'+price',data:{fieldName:'price',direction:SortDirections.ASC},title:'По возрастанию цены'},
      {value:'-price',data:{fieldName:'price',direction:SortDirections.DESC},title:'По убыванию цены'},
      {value:'+count',data:{fieldName:'count',direction:SortDirections.DESC},title:'По наличию'},
    ]),[])
  }
  const callbacks = {
    
    onSort:useCallback((value:string) => {
      const sort = options.sort.find((item) => item.value === value)
      if(sort){
        setParams({'sort':JSON.stringify({[sort.data.fieldName]:sort.data.direction})})
      }
    },[setParams,params,page,options.sort])
    
  }
  
  return (
    <Box width={'200px'}>
      <SelectForm values={options.sort} onSelect={callbacks.onSort} label={'Сортировка'} initialValue={options.sort[0]}/>
    </Box>
  );
};

export {CatalogSortSelectForm};