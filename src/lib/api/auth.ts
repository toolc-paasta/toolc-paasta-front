import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { kinderType } from "../../components/auth/types";
import {
   DirectorSignUpType,
   LoginType,
   ParentSignup,
   TeacherSignUpType,
} from "./authTypes";

const Address = "http://www.stmap.kro.kr:8080";

export const clearAccessToken = () => {
   axios.defaults.headers.common["Authorization"] = null;
};

const setTokens = async (tokens: { accessToken: string }) => {
   const tokensObj = {
      accessToken: tokens.accessToken,
   };
   axios.defaults.headers.common[
      "Authorization"
   ] = `Bearer ${tokensObj.accessToken}`;
   await AsyncStorage.setItem("@tokens", JSON.stringify(tokensObj));
};

export const logout = async () => {
   try {
      await AsyncStorage.removeItem("@tokens");
   } catch (err) {
      throw err;
   }
};

// 학부모
export const getParentInfo = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/parents`);
      return res.data.response;
   } catch (err) {
      throw err;
   }
};

export const parentLogin = async (props: LoginType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/parents/login`,
         props
      );
      await setTokens(res.data.response);
   } catch (err) {
      throw err;
   }
};

export const parentSignUp = async (props: ParentSignup, expoToken: string) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/parents/signup`,
         props,
         {
            withCredentials: true,
         }
      );
      // 성공시 로그인
      await parentLogin({
         loginId: props.loginId,
         password: props.password,
         expoToken: expoToken,
      });
      return res.data.response;
   } catch (err) {
      throw err;
   }
};

// 원장
export const getDirectorInfo = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/director`);
      return res.data.response;
   } catch (err) {
      throw err;
   }
};

export const directorLogin = async (props: LoginType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/director/login`,
         props
      );
      console.log(res.data.response);
      await setTokens(res.data.response);
   } catch (err) {
      throw err;
   }
};

export const directorSignUp = async (
   props: DirectorSignUpType,
   expoToken: string
) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/director/signup`,
         props
      );
      // 성공시 로그인
      await directorLogin({
         loginId: props.loginId,
         password: props.password,
         expoToken: expoToken,
      });
      return res.data.response;
   } catch (err) {
      throw err;
   }
};

export const registerCenter = async (props: kinderType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/director/registerCenter`,
         {
            centerName: props.centerName,
            address: props.address,
            foundationDate: props.foundationDate,
         }
      );
      console.log(res.data.response);
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

// 선생
export const getTeacherInfo = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/teacher`);
      return res.data.response;
   } catch (err) {
      throw err;
   }
};

export const teacherLogin = async (props: LoginType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/teacher/login`,
         props
      );
      await setTokens(res.data.response);
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const teacherSignUp = async (
   props: TeacherSignUpType,
   expoToken: string
) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/teacher/signup`,
         props
      );
      // 성공시 로그인
      await teacherLogin({
         loginId: props.loginId,
         password: props.password,
         expoToken: expoToken,
      });
      return res.data.response;
   } catch (err) {
      throw err;
   }
};
