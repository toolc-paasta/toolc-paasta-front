import React, { useState } from "react";
import { useDispatch } from "react-redux";
import handleError, { checkLoginInfo } from "../../../lib/utils/authFunctions";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { BottomTabNavigation } from "../../../screens/AuthScreen";
import Auth from "../view/Auth";

type Props = {
   navigation: BottomTabNavigation;
};
export type userInfoType = {
   id: string;
   password: string;
   passwordCheck: string;
};

function AuthContainer({ navigation }: Props) {
   const [isLogin, setIsLogIn] = useState(true);
   const [userInfo, setUserInfo] = useState<userInfoType>({
      password: "",
      passwordCheck: "",
      id: "",
   });
   const [errMsg, setErrMsg] = useState<userInfoType>({
      id: "",
      password: "",
      passwordCheck: "",
   });
   const [wrongPW, setWrongPW] = useState(false);
   const dispatch = useDispatch();

   const onChange = (name: string, value: string): void => {
      setErrMsg((prev) => ({ ...prev, [name]: "" }));
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (!checkLoginInfo(userInfo, setErrMsg, isLogin)) return;
      dispatch(loading());
      if (isLogin) {
         try {
            //     const res = await login(userInfo.id, userInfo.password);
            //      dispatch(signin(res));
         } catch (err) {
            // 비밀번호, 아이디 처리
            if (err.message === "비밀번호가 일치하지 않습니다.") {
               handleError("auth/wrong-password", setErrMsg);
               setWrongPW(true);
            } else if (err.message === "존재하지 않는 회원입니다.") {
               handleError("auth/user-not-found", setErrMsg);
            } else {
               dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
            }
            dispatch(unloading());
            return;
         }
      } else {
         try {
            // const res = await SignUp(userInfo.id, userInfo.password);
            // dispatch(signin(res));
         } catch (err) {
            // 중복 아이디 처리
            if (err.message === "ID가 중복된 회원입니다.") {
               handleError("auth/id-already-in-use", setErrMsg);
            } else {
               dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
            }
            dispatch(unloading());
            return;
         }
      }
   };

   return (
      <Auth
         isLogin={isLogin}
         userInfo={userInfo}
         errMsg={errMsg}
         onChange={onChange}
         onPressLogin={onPressLogin}
         setIsLogIn={setIsLogIn}
      />
   );
}

export default AuthContainer;
