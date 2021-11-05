import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { navigationRef } from "../../../RootNavigation";
import { kinderType } from "../../components/auth/types";


const Address = "http://www.stmap.kro.kr:8080";

export const clearAccessToken = () => {
   axios.defaults.headers.common["Authorization"] = null;
};

// 학부모
export const getParentList = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/teacher/read`);
      return res.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};






