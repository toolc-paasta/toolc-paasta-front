import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
   admitCenterRequest,
   admitClassRequest,
   denyCenterRequest,
   denyClassRequest,
   getCenterRequest,
} from "../../../lib/api/notice";
import { RootState } from "../../../modules";
import { StackScreenNavigation } from "../../../screens/NoticeScreen";
import { RegisterCenterNoti } from "../types";
import Notice from "../view/Notice";

type Props = {
   navigation: StackScreenNavigation;
};

const tempDatas: RegisterCenterNoti[] = [
   {
      id: 3,
      user: {
         id: 1,
         loginId: "testd312",
         name: "홍길동",
         connectionNumber: "010-2321-3213",
         sex: "남성",
      },
      centerName: "하나유치원",
      address: "서울시 강동구",
      foundationDate: "2012-12-12",
   },
   {
      id: 3,
      user: {
         id: 1,
         loginId: "testd312",
         name: "홍길동",
         connectionNumber: "010-2321-3213",
         sex: "남성",
      },
      centerName: "하나유치원",
      address: "서울시 강동구",
      foundationDate: "2012-12-12",
   },
];

function NoticeContainer({ navigation }: Props) {
   const [registerCenterNotis, setRegisterCenterNotis] = React.useState<
      RegisterCenterNoti[]
   >([]);

   const auth = useSelector(({ auth }: RootState) => auth);

   useEffect(() => {
      const getDatas = async () => {
         if (auth.authority === "ADMIN") {
            const data = await getCenterRequest();
            setRegisterCenterNotis(
               data.map((item: any) => ({
                  ...item,
                  user: item.director,
               }))
            );
         } else if (auth.authority === "DIRECTOR") {
            const data = await getCenterRequest();
            setRegisterCenterNotis(
               data.map((item: any) => ({
                  ...item,
                  user: item.teacher,
               }))
            );
         }
      };
      getDatas();
   }, [auth]);

   const onPressAdmit = async (item: RegisterCenterNoti) => {
      if (auth.authority === "ADMIN") {
         await admitCenterRequest(item.id);
         setRegisterCenterNotis((prev) => prev.filter((i) => i.id !== item.id));
      } else if (auth.authority === "DIRECTOR") {
         await admitClassRequest(item.id);
         setRegisterCenterNotis((prev) => prev.filter((i) => i.id !== item.id));
      }
   };

   const onPressDeny = async (item: RegisterCenterNoti) => {
      if (auth.authority === "ADMIN") {
         await denyCenterRequest(item.id);
         setRegisterCenterNotis((prev) => prev.filter((i) => i.id !== item.id));
      } else if (auth.authority === "DIRECTOR") {
         await denyClassRequest(item.id);
         setRegisterCenterNotis((prev) => prev.filter((i) => i.id !== item.id));
      }
   };

   return (
      <Notice
         navigation={navigation}
         registerCenterNotis={registerCenterNotis}
         onPressAdmit={onPressAdmit}
         onPressDeny={onPressDeny}
      />
   );
}

export default NoticeContainer;
