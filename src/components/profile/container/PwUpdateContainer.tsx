import React, { useState } from "react";
import PwUpdate from "../view/PwUpdate";
import handleError, {
   catchError,
   checkPassword,
} from "../../../lib/utils/authFunctions";
import { useDispatch } from "react-redux";
import { loading, unloading } from "../../../modules/loading";

type Props = {
   visible: boolean;
   setVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
   oldPassword: string;
   afterPwChange: () => void;
};

function PwUpdateContainer({
   visible,
   setVisible,
   oldPassword,
   afterPwChange,
}: Props) {
   const [password, setPassword] = useState("");
   const [success, setSuccess] = useState(false);
   const [errMsg, setErrMsg] = useState({ password: "" });
   const dispatch = useDispatch();

   const onPasswordUpdate = async (pw: string) => {
      if (success) {
         return;
      } else if (!checkPassword(pw, setErrMsg)) {
         return;
      }
      try {
         dispatch(loading());
         // 비밀번호 변경
         //   await pwUpdate(oldPassword, pw);
         setSuccess(true);
      } catch (err) {
         catchError(err.message, setErrMsg, "password");
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
   const clear = (resetReauth: boolean) => {
      setPassword("");
      setErrMsg({ password: "" });
      setSuccess(false);
      setVisible(false);
      if (resetReauth) {
         afterPwChange();
      }
   };
   return (
      <PwUpdate
         visible={visible}
         password={password}
         clear={clear}
         onChange={onChange}
         onPasswordUpdate={onPasswordUpdate}
         errMsg={errMsg}
         success={success}
      />
   );
}

export default PwUpdateContainer;
