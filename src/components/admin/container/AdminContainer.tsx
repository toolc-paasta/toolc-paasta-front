import React, { useEffect } from "react";
import { StackScreenNavigation } from "../../../screens/NoticeScreen";
import { RegisterCenterNoti } from "../types";
import Admin from "../view/Admin";

type Props = {
   navigation: StackScreenNavigation;
};

const tempDatas: RegisterCenterNoti[] = [
   {
      title: "Center 등록 신청",
      body: "원장이다 님의 center 이름 Center 등록 신청",
      data: {
         foundationDate: "2020-11-22",
         address: "서울 어딘가",
         centerName: "center 이름",
      },
   },
   {
      title: "Center 등록 신청",
      body: "신성일 님의 떡잎유치원 Center 등록 신청",
      data: {
         foundationDate: "2020-11-22",
         address: "떡잎마을",
         centerName: "떡잎유치원",
      },
   },
];

function AdminContainer({}: Props) {
   const [registerCenterNotis, setRegisterCenterNotis] = React.useState<
      RegisterCenterNoti[]
   >([]);

   useEffect(() => {
      setRegisterCenterNotis(tempDatas);
   }, []);

   const onPressAdmit = async (item: RegisterCenterNoti) => {
      console.log(item);
   };
   const onPressDeny = async (item: RegisterCenterNoti) => {
      console.log(item);
   };

   return (
      <Admin
         registerCenterNotis={registerCenterNotis}
         onPressAdmit={onPressAdmit}
         onPressDeny={onPressDeny}
      />
   );
}

export default AdminContainer;
