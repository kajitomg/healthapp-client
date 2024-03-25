import {Pagination as MuiPagination} from "@mui/material";
import {PaginationProps as MuiPaginationProps} from "@mui/material/Pagination";
import {ChangeEvent, useCallback, useState} from "react";
import Box from "@mui/material/Box";


type PaginationProps = {
  
  maxCount?:number,
  
  onChange?:(page?:number) => void
  
} & Omit<MuiPaginationProps, 'onChange'>


const Pagination = (props:PaginationProps) => {
  const {maxCount, count,page, onChange, ...defProps } = props
  const [currentPage, setCurrentPage] = useState<number>(page || 1)
  const itemsCount = Math.ceil( (count || 1) / (maxCount || 1))
  
  const callbacks = {
    //@ts-expect-error Неиспользуемая переменная
    onChange:useCallback((event: ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value)
      onChange && onChange(value)
    },[onChange])
    
  }
  
  return (
    <Box m={1} width={'100%'} display={'flex'} justifyContent={'center'}>
      <MuiPagination
        page={currentPage}
        count={itemsCount}
        color={'primary'}
        size={'large'}
        onChange={callbacks.onChange}
        {...defProps}
      />;
    </Box>
  )
};

export {Pagination};