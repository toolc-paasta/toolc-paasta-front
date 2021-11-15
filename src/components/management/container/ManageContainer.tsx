import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ManagementScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import Manage from "../view/Manage";
import { getParent } from "../../../lib/api/forAdmin"
import { getAllParent } from "../../../lib/api/forAdmin"


type Props = {
   navigation: BottomTabNavigation;
};

function ManageContainer({ navigation }: Props) {

   const auth =  useSelector(({auth} :RootState) => auth)
   const [list, setList] = useState<any>();
   const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
   const [masterDataSource, setMasterDataSource] = useState<any>([]);

   const getListData = async () => {
      let data;
      if(auth.authority == "DIRECTOR")
         data = await getAllParent();
      else
         data = await getParent();
      setMasterDataSource(data)
      setFilteredDataSource(data)
   }
   
   
   useEffect(() => {
      getListData();
   }, []);

   return <Manage navigation={navigation} setFilteredDataSource={setFilteredDataSource} filteredDataSource={filteredDataSource} 
            masterDataSource={masterDataSource}
          />;
}

export default ManageContainer;
