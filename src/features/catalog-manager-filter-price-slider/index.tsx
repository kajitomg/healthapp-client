import {useCallback} from 'react';
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${Intl.NumberFormat('ru',{style: 'currency', currency: 'RUB'}).format(value)}`;
}

interface CatalogManagerFilterPriceSliderProps {
  
  value:number[],
  
  onChange:(newValue:number | number[]) => void
  
  max?:number | null
  
}

const CatalogManagerFilterPriceSlider = (props:CatalogManagerFilterPriceSliderProps) => {
  
  const callbacks = {
    //@ts-expect-error Неиспользуемая константа
    onChange:useCallback((event: Event, newValue: number | number[]) => {
      props.onChange(newValue)
    },[props.onChange])
  }
  
  return (
    <Slider
      getAriaLabel={() => 'Цена'}
      value={props.value}
      onChange={callbacks.onChange}
      min={0}
      size={'small'}
      step={1}
      max={props.max || 0}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
    />
  );
};
export {CatalogManagerFilterPriceSlider};