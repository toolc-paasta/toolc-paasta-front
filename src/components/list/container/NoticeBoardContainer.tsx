import React, { useState, useEffect } from "react";
import { BottomTabNavigation } from "../../../screens/NoticeBoardScreen";
import { RootState } from "../../../modules";
import { useDispatch, useSelector } from "react-redux";
import List from "../view/List";
import { getNotice } from "../../../lib/api/forAdmin";
import { getNotice_T } from "../../../lib/api/forAdmin";
import { getNotice_D } from "../../../lib/api/forAdmin";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../App";

type Props = {
   navigation: BottomTabNavigation;
};

function noticeBoardContainer({
   navigation,
   route,
}: StackScreenProps<RootStackParamList, "NoticeBoard">) {
   const auth = useSelector(({ auth }: RootState) => auth);
   const [list, setList] = useState<any>();

   const getData = async () => {
      let data;
      if (auth.authority == "DIRECTOR") data = await getNotice_D();
      else if (auth.authority == "TEACHER") data = await getNotice_T();
      else data = await getNotice();
      setList(data);
   };

   useEffect(() => {
      getData();
   }, [route?.params?.refresh]);

   return (
      <List
         navigation={navigation}
         headerTitle={"공지 모아보기"}
         auth={auth}
         list={list}
      />
   );
}

export default noticeBoardContainer;
