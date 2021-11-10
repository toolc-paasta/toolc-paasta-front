import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   admitCenterRequest,
   admitClassRequest,
   denyCenterRequest,
   denyClassRequest,
   getCenterRequest,
} from "../../../lib/api/notice";
import { RootState } from "../../../modules";
import { loading, unloading } from "../../../modules/loading";
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
   const dispatch = useDispatch();
   const [refresh, setRefresh] = React.useState(0);

   useEffect(() => {
      const getDatas = async () => {
         dispatch(loading());
         try {
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
         } catch (e) {
            console.log(e.response.data);
         }
         dispatch(unloading());
      };
      getDatas();
   }, [auth, refresh]);

   const onPressAdmit = async (item: RegisterCenterNoti) => {
      dispatch(loading());
      try {
         if (auth.authority === "ADMIN") {
            await admitCenterRequest(item.id);
         } else if (auth.authority === "DIRECTOR") {
            await admitClassRequest(item.id);
         }
         setRefresh((prev) => prev + 1);
      } catch (err) {
         console.log(err.response.data);
         dispatch(unloading());
      }
   };

   const onPressDeny = async (item: RegisterCenterNoti) => {
      dispatch(loading());
      try {
         if (auth.authority === "ADMIN") {
            await denyCenterRequest(item.id);
         } else if (auth.authority === "DIRECTOR") {
            await denyClassRequest(item.id);
         }
         setRefresh((prev) => prev + 1);
      } catch (err) {
         console.log(err.response.data);
         dispatch(unloading());
      }
   };

   return (<>
      <Notice
         navigation={navigation}
         registerCenterNotis={registerCenterNotis}
         onPressAdmit={onPressAdmit}
         onPressDeny={onPressDeny}
      />
      </>
   );
}

export default NoticeContainer;
