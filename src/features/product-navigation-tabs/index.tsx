import {Tab, Tabs} from "@mui/material";
import {ProductNavigationTabs} from "../../widgets/product-navigation";

interface ProductNavigationsTabsProps {

  list?:ProductNavigationTabs[],
  
}

const ProductNavigationsTabs = (props:ProductNavigationsTabsProps) => {
  

  
  return (
    <Tabs
      variant={'fullWidth'}
      orientation="vertical"
      aria-label='Вертикальный таб'
      sx={{
        borderRight: 1,
        borderColor: 'divider'
      }}
    >
      {props.list?.map((item:ProductNavigationTabs) =>
        <Tab label={item?.label} key={item.label} sx={{textTransform:'capitalize'}}/>
      )}
    </Tabs>
  );
};

export {ProductNavigationsTabs};