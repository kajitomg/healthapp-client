import Box from "@mui/material/Box";
import {Option, SelectForm} from "../../shared/components/select";
import {useCallback, useEffect, useMemo, useState} from "react";
import {usePage} from "../../entities/page-controller/hooks/use-page.ts";
import {ParamsType, SortDirections} from "../../shared/models";
import {useParams} from "../../entities/params-controller/hooks/use-params.ts";


interface SortOption extends Option {
  data: { fieldName:string,direction:SortDirections }
}

/*
  Сортировка по (цена, наличие)..., выбор нескольких категорий
 */
 

const CatalogManagerSortSelectForm = () => {
  const {page} = usePage()
  const {params,setParams, deleteParams} = useParams({page})

  const options = {
    sort:useMemo<SortOption[]>(() => ([
      {value:'+price',data:{fieldName:'price',direction:SortDirections.ASC},title:'По возрастанию цены'},
      {value:'-price',data:{fieldName:'price',direction:SortDirections.DESC},title:'По убыванию цены'},
      {value:'+count',data:{fieldName:'count',direction:SortDirections.DESC},title:'По наличию'},
    ]),[])
  }
  
  const [initialValue, setInitialValue] = useState<SortOption>(options.sort.find((item) => (params?.sort as ParamsType)?.[item.data.fieldName] === item.data.direction) || options.sort[0])
  
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
    setInitialValue(options.sort.find((item) => (params?.sort as ParamsType)?.[item.data.fieldName] === item.data.direction) || options.sort[0])
  },[params])

  return (
    <Box width={'200px'}>
      <SelectForm values={options.sort} onSelect={callbacks.onSort} label={'Сортировка'} initialValue={initialValue}/>
    </Box>
  );
};

export {CatalogManagerSortSelectForm};