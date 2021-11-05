import axios from "axios";

const Address = "http://www.stmap.kro.kr:8080";
//센터 등록 요청 조회
export const getCenterRequest = async () => {
   try {
      const response = await axios.get(`${Address}/api/member/admin/registers`);
      return response.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const admitCenterRequest = async (messageId: number) => {
   try {
      const response = await axios.post(
         `${Address}/api/member/admin/allowCenter/${messageId}`
      );
      return response.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const denyCenterRequest = async (messageId: number) => {
   try {
      const response = await axios.post(
         `${Address}/api/member/admin/rejectCenter/${messageId}`
      );
      return response.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

//반 등록 요청 조회
export const getClassRequest = async () => {
   try {
      const response = await axios.get(
         `${Address}/api/member/director/request/registerClass`
      );
      return response.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const admitClassRequest = async (messageId: number) => {
   try {
      const response = await axios.post(
         `${Address}/api/member/director/request/allowRegister/${messageId}`
      );
      return response.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const denyClassRequest = async (messageId: number) => {
   try {
      const response = await axios.post(
         `${Address}/api/member/director/request/rejectRegister/${messageId}`
      );
      return response.data.response;
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};
