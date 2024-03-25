import {ManagerLayout} from "../../shared/components/manager-layout";
import {CatalogManagerSortList} from "../../features/catalog-manager-sort-list";
import {memo} from "react";

const CatalogManagerSort = memo(() => {
  
  return (
    <ManagerLayout>
      <CatalogManagerSortList/>
    </ManagerLayout>
);
});

export {CatalogManagerSort};