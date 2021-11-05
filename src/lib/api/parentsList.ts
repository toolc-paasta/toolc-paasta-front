import axios from "axios";

const Address = "http://www.stmap.kro.kr:8080";

export const getParentsList = async () => {
   try {
      const res = await axios.get(`${Address}/api/member/teacher/read`);
      return res.data.response;
   } catch (e) {
      console.log(e.response.data);
      throw e;
   }
};
