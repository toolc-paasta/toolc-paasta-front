import { signInInfoType, userInfoType } from "../../components/auth/types";

type setErrMsg<T> = (value: T | ((prevState: T) => T)) => void;

export default function handleError<T>(code: string, setErrMsg: setErrMsg<T>) {
   switch (code) {
      case "blank_id":
         setErrMsg((prev) => ({
            ...prev,
            loginId: "아이디를 입력해주세요.",
         }));
         return true;
      case "blank_password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호를 입력해주세요.",
         }));
         return true;
      case "auth/wrong-password":
         setErrMsg((prev) => ({
            ...prev,
            password: "비밀번호가 틀렸습니다.",
         }));
         return true;
      case "auth/user-not-found":
         setErrMsg((prev) => ({
            ...prev,
            loginId: "존재하지 않는 회원입니다.",
         }));
         return true;
      case "auth/id-already-in-use":
         setErrMsg((prev) => ({
            ...prev,
            loginId: "이미 사용중인 아이디입니다.",
         }));
         return true;
      case "not_match_password_and_check":
         setErrMsg((prev) => ({
            ...prev,
            passwordCheck: "비밀번호가 일치하지 않습니다.",
         }));
         return true;
      case "password_not_formmatted":
         setErrMsg((prev) => ({
            ...prev,
            password:
               "비밀번호는 알파벳, 숫자, 특수문자 조합으로 8~20자여야 합니다.",
         }));
         return true;
      case "wrong_email":
         setErrMsg((prev) => ({
            ...prev,
            email: "이메일 형식을 지켜주세요.",
         }));
         return true;
      case "기존 비밀번호와 같은 비밀번호 입니다.":
         setErrMsg((prev) => ({
            ...prev,
            password: "기존 비밀번호와 같은 비밀번호입니다.",
         }));
         return true;
      case "blank_name":
         setErrMsg((prev) => ({
            ...prev,
            name: "이름을 입력해주세요.",
         }));
         return true;
      case "blank_gender":
         setErrMsg((prev) => ({
            ...prev,
            name: "성별을 선택해주세요",
         }));
         return true;
      case "blank_phone":
         setErrMsg((prev) => ({
            ...prev,
            connectionNumber: "전화번호를 입력해주세요.",
         }));
         return true;
      case "connectionNumber_not_formmatted":
         setErrMsg((prev) => ({
            ...prev,
            connectionNumber: "01012345678 형태로 입력해주세요.",
         }));
      default:
         return false;
   }
}

export const checkLoginInfo = <T extends Partial<signInInfoType>>(
   info: T,
   setErrMsg: setErrMsg<T>,
   isLogin: boolean,
   isDirector?: boolean
) => {
   if (!info.loginId) {
      handleError<T>("blank_id", setErrMsg);
      return false;
   } else if (!info.password) {
      handleError<T>("blank_password", setErrMsg);
      return false;
   } else if (!testPassword(info.password)) {
      handleError<T>("password_not_formmatted", setErrMsg);
      return false;
   }
   if (!isLogin) {
      if (info.password !== info.passwordCheck) {
         handleError<T>("not_match_password_and_check", setErrMsg);
         return false;
      } else if (!info.name) {
         handleError<T>("blank_name", setErrMsg);
         return false;
      } else if (!info.connectionNumber) {
         handleError<T>("blank_phone", setErrMsg);
         return false;
      } else if (!info.connectionNumber) {
         handleError<T>("blank_phone", setErrMsg);
         return false;
      } else if (
         !/^01([0|1|6|7|8|9])([0-9]{4})([0-9]{4})$/.test(info.connectionNumber)
      ) {
         handleError<T>("connectionNumber_not_formmatted", setErrMsg);
         return false;
      }
   }
   return true;
};
export const checkPassword = <T>(password: string, setErrMsg: setErrMsg<T>) => {
   if (!password) {
      handleError<T>("blank_password", setErrMsg);
      return false;
   } else if (!testPassword(password)) {
      handleError<T>("password_not_formmatted", setErrMsg);
      return false;
   }
   return true;
};

export const catchError = <T>(
   code: string,
   setErrMsg: setErrMsg<T>,
   lastSection: string
) => {
   if (!handleError(code, setErrMsg)) {
      setErrMsg((prev) => ({
         ...prev,
         [lastSection]: "알 수 없는 에러가 발생했습니다. 다시 시도해주세요.",
      }));
   }
};

export function testPassword(pw: string): boolean {
   return /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/.test(
      pw
   );
}

export function testEmail(email: string): boolean {
   return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      email
   );
}
