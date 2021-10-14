import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";
import {
   DirectorSignUpType,
   LoginType,
   ParentSignup,
   TeacherSignUpType,
} from "./authTypes";

const Address = "http://www.stmap.kro.kr:8080";

/*
   모든 api는 token으로 이루어짐.

   따라서 비회원이더라도 token을 받아야함.

   0. 회원 auth 토큰, 비회원 아이디가 둘 다 없으면 비회원 아이디 생성
   1. 회원 auth 토큰이 있으면, 회원 auth 토큰을 우선.
      1-1. 로그인 성공하면, 토큰과 함께 프로필 정보 받음.
   2. 만약 비회원 아이디만 있거나, 회원 토큰이 invalid 할 경우, 비회원ID를 보내고 토큰을 받음.
      2-1. 만약 비회원 아이디가 invalid 할 경우 새로 생성

*/

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
      console.log(err.response.data);
      throw err;
   }
};

export const parentLogin = async (props: LoginType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/parents/login`,
         props
      );
      await setTokens(res.data.response.accessToken);
   } catch (err) {
      console.log(err.response.data);
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
      // 로그인 성공시 정보조회
      console.log(res.data.response);
      return res.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

// 원장
export const getDirectorInfo = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/director`);
      return res.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const directorLogin = async (props: LoginType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/director/login`,
         props
      );
      await setTokens(res.data.response.accessToken);
   } catch (err) {
      console.log(err.response.data);
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
      // 로그인 성공시 정보조회
      console.log(res.data.response);
      return res.data.response;
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
      console.log(err.response.data);
      throw err;
   }
};

export const teacherLogin = async (props: LoginType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/teacher/login`,
         props
      );
      await setTokens(res.data.response.accessToken);
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
         props,
         {
            withCredentials: true,
         }
      );
      // 성공시 로그인
      await teacherLogin({
         loginId: props.loginId,
         password: props.password,
         expoToken: expoToken,
      });
      // 로그인 성공시 정보조회
      console.log(res.data.response);
      return res.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};
