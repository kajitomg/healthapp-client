import {Box} from "@mui/material";
import {Option, SelectForm} from "../../shared/components/select";
import {useCallback, useMemo, useState} from "react";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
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
  const {params,setParams, deleteParams} = useParams({page})
  
  const options = {
    sort:useMemo<SortOption[]>(() => ([
      {value:'+price',data:{fieldName:'price',direction:SortDirections.ASC},title:'По возрастанию цены'},
      {value:'-price',data:{fieldName:'price',direction:SortDirections.DESC},title:'По убыванию цены'},
      {value:'+count',data:{fieldName:'count',direction:SortDirections.DESC},title:'По наличию'},
    ]),[])
  }
  const [initialValue] = useState<SortOption | undefined>(options.sort.find((item) => params?.sort?.[item.data.fieldName] === item.data.direction))  //FIX Поправить типизацию, возможно изменить реализацию
  
  const callbacks = {
    
    onSort:useCallback((value:string) => {
      const sort = options.sort.find((item) => item.value === value)
      if(sort){
        deleteParams({sort:''})
        setParams({sort:{[sort.data.fieldName]:sort.data.direction}})
      }
    },[setParams,params,page,options.sort])
    
  }
  
  return (
    <Box width={'200px'}>
      <SelectForm values={options.sort} onSelect={callbacks.onSort} label={'Сортировка'} initialValue={initialValue}/>
    </Box>
  );
};

export {CatalogSortSelectForm};