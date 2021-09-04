import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import handleError, { checkLoginInfo } from "../../../lib/utils/authFunctions";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { AuthStackScreenParamList } from "../../../screens/AuthScreen";
import { userInfoType } from "../types";
import Auth from "../view/Auth";

type Props = StackScreenProps<AuthStackScreenParamList, "Login">;

function AuthContainer({ navigation }: Props) {
   const [userInfo, setUserInfo] = useState<userInfoType>({
      password: "",
      id: "",
   });
   const [errMsg, setErrMsg] = useState<userInfoType>({
      id: "",
      password: "",
   });
   const [wrongPW, setWrongPW] = useState(false);
   const dispatch = useDispatch();

   const onChange = (name: string, value: string): void => {
      setErrMsg((prev) => ({ ...prev, [name]: "" }));
      setUserInfo((prev) => ({ ...prev, [name]: value }));
   };

   const onPressLogin = async () => {
      if (!checkLoginInfo<userInfoType>(userInfo, setErrMsg, true)) return;
      dispatch(loading());
      try {
         //     const res = await login(userInfo.id, userInfo.password);
         //      dispatch(signin(res));
      } catch (err: any) {
         // 비밀번호, 아이디 처리
         if (err.message === "비밀번호가 일치하지 않습니다.") {
            handleError<userInfoType>("auth/wrong-password", setErrMsg);
            setWrongPW(true);
         } else if (err.message === "존재하지 않는 회원입니다.") {
            handleError<userInfoType>("auth/user-not-found", setErrMsg);
         } else {
            dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
         }
         return;
      }
      dispatch(unloading());
   };

   const goToSignin = (): void => {
      navigation.navigate("Signin");
   };

   return (
      <Auth
         userInfo={userInfo}
         errMsg={errMsg}
         onChange={onChange}
         onPressLogin={onPressLogin}
         goToSignin={goToSignin}
      />
   );
}

export default AuthContainer;
