import {Box} from "@mui/material";
import {Option, SelectForm} from "../../shared/components/select";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";
import {useSetPage} from "../../entities/page-controller/hooks/use-set-page.ts";
import {ParamsType, SortDirections} from "../../shared/models";


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
  
  const [initialValue, setInitialValue] = useState<SortOption>(options.sort.find((item) => (params?.filter as ParamsType)?.[item.data.fieldName] === item.data.direction) || options.sort[0])
  
  const callbacks = {
    
    onSort:useCallback((value:string) => {
      const sort = options.sort.find((item) => item.value === value)
      if(sort){

        deleteParams({sort:''})
        
        setParams({sort:{[sort.data.fieldName]:sort.data.direction}})
        
      }
    },[setParams,deleteParams,options.sort])
    
  }
  
  useEffect(() => {
    setInitialValue(options.sort.find((item) => (params?.filter as ParamsType)?.[item.data.fieldName] === item.data.direction) || options.sort[0])
  },[params])
  
  return (
    <Box width={'200px'}>
      <SelectForm values={options.sort} onSelect={callbacks.onSort} label={'Сортировка'} initialValue={initialValue}/>
    </Box>
  );
};

export {CatalogSortSelectForm};