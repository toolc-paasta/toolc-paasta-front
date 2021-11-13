import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/ManagementScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import Contact from "../view/Contact";
import { getParent } from "../../../lib/api/forAdmin"


type Props = {
   navigation: BottomTabNavigation;
};

function ContactContainer({ navigation }: Props) {

   const auth =  useSelector(({auth} :RootState) => auth)   
   const [filteredDataSource, setFilteredDataSource] = useState<any>([]);
   const [masterDataSource, setMasterDataSource] = useState<any>([]);

   const getListData = async () => {
      const data = await getParent();
      setMasterDataSource(data)
      setFilteredDataSource(data)
   }
   
   
   useEffect(() => {
      getListData();
   }, []);

   return <Contact navigation={navigation} setFilteredDataSource={setFilteredDataSource} filteredDataSource={filteredDataSource} 
            masterDataSource={masterDataSource}
          />;
}

export default ContactContainer;
