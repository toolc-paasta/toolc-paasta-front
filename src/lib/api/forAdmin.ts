import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigationRef } from "../../../RootNavigation";
import { kinderType } from "../../components/auth/types";
import {
    addClassType
 } from "./authTypes";

const Address = "http://www.stmap.kro.kr:8080";

export const clearAccessToken = () => {
   axios.defaults.headers.common["Authorization"] = null;
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





