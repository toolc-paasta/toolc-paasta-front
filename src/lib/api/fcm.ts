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
export const sendShuttleFCMMessageTeacher = async () => {
   try {
      console.log("asdasd");
      const res = await axios.post(
         `${Address}/api/member/teacher/send/shuttle`,
         {}
      );
      console.log(res.data.response);
   } catch (err) {
      console.log(err.response.data);
   }
};
export const sendFCMToMyClass = async (
   centerName: string,
   className: string,
   title: string,
   body: string
) => {
   try {
      const res = await axios.post(
         `${Address}/api/member/teacher/message/sendClass`,
         { centerName, className, title, body }
      );
   } catch (err) {
      console.log(err.response.data);
   }
};
