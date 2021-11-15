import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigationRef } from "../../../RootNavigation";
import { kinderType } from "../../components/auth/types";
import {
    addClassType,
    postParentType
 } from "./authTypes";

const Address = "http://www.stmap.kro.kr:8080";

export const clearAccessToken = () => {
   axios.defaults.headers.common["Authorization"] = null;
};

export const getClass = async () => {
   try {
      const res = await axios.get(`${Address}/api/center`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const getParent = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/teacher/read`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const getAllParent = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/director/read/parents`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const getNotice = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/parents/notice`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const getNotice_T = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/teacher/notice`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const getNotice_D = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/director/notice`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const findParent = async (name:string,number:string) => {
   try {
      const res = await axios.get(`${Address}/api/member/parents/search?name=${name}&connectionNumber=${number}`);      
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const postParent = async (props: postParentType) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/teacher/enter/child/${props.id}`,
         props
      );
      console.log(props.id)
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const addClass = async (props: addClassType) => {
    try {
       const res = await axios.post(
          `${Address}/api/member/director/create/class`,
          props
       );
       console.log(res.data.response)
    } catch (err) {
        console.log(err);
       throw err;
    }
 };





