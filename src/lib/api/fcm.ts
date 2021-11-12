import axios from "axios";

const Address = "http://www.stmap.kro.kr:8080";

export const sendFCMMessage = async (
   title: string,
   body: string,
   targetLoginId: string
) => {
   try {
      const res = await axios.post(`${Address}/api/member/sendMessage`, {
         title,
         body,
         targetLoginId,
      });
      console.log(res);
   } catch (err) {
      console.log(err.response.data);
   }
};

export const sendShuttleFCMMessage = async () => {
   try {
      const res = await axios.post(
         `${Address}/api/member/director/send/shuttle`,
         {}
      );
      console.log(res.data.response);
   } catch (err) {
      console.log(err.response.data);
   }
};
