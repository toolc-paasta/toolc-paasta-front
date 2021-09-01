import React, { useState } from "react";
import ReauthenticateModal from "../view/ReauthenticateModal";
import handleError, { checkPassword } from "../../../lib/utils/authFunctions";
import { useDispatch } from "react-redux";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { authStateType } from "../../../modules/auth";
import { SERVER_ERROR } from "../../../lib/utils/strings";

type Props = {
   user: authStateType;
   setReauthenticated: (value: boolean | ((prev: boolean) => boolean)) => void;
   reauthVisible: boolean;
   setReauthVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
   password: string;
   setPassword: (value: string | ((prev: string) => string)) => void;
};

function ReauthenticateModalContainer({
   user,
   setReauthenticated,
   reauthVisible,
   setReauthVisible,
   password,
   setPassword,
}: Props) {
   const [errMsg, setErrMsg] = useState({ password: "" });
   const dispatch = useDispatch();

   const reauthWithPw = async () => {
      try {
         if (!checkPassword(password, setErrMsg)) {
            return;
         }

         dispatch(loading());
         //   await login(user.loginId, password);
         setReauthenticated(true);
         // 아이디 받아온 걸로 재 로그인
      } catch (err) {
         if (err.message === "비밀번호가 일치하지 않습니다.") {
            handleError("auth/wrong-password", setErrMsg);
         } else {
            dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
         }
      }
      dispatch(unloading());
   };
   const onChange = (v: string) => {
      if (errMsg.password) {
         setErrMsg({ password: "" });
      }
      if (v && !/[0-9a-zA-Z.;\-]/.test(v)) {
         setErrMsg({
            password:
               "비밀번호는 알파벳, 숫자, 특수문자 조합으로 8~20자여야 합니다.",
         });
         return;
      }
      setPassword(v);
   };
   const onClose = () => {
      setReauthVisible(false);
   };

   return (
      <ReauthenticateModal
         visible={reauthVisible}
         onClose={onClose}
         reauthWithPw={reauthWithPw}
         onChange={onChange}
         errMsg={errMsg}
         password={password}
      />
   );
}

export default ReauthenticateModalContainer;
