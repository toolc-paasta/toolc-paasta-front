import axios from "axios";

type LoginType = {
   loginId: string;
   password: string;
   expoToken: string;
};
const Address = "http://www.stmap.kro.kr:8080";

export const clearAccessToken = () => {
   axios.defaults.headers.common["Authorization"] = null;
};

export const getCenter = async () => {
   try {
      const res = await axios.get(`${Address}/api/center`);
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};