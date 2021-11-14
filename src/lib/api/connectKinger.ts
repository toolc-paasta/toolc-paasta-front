import axios from "axios";

type RegisterType = {
   centerName: string;
   className: string;
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

export const registerClass = async (props: RegisterType) => {
   try {
      console.log('zzzzzz')
      const res = await axios.post(`${Address}/api/member/teacher/registerClass`, props);
      console.log('tttttt')
      console.log(res.data.response)
      return res.data.response;
   } catch (err) {
      console.log(err);
      throw err;
   }
};