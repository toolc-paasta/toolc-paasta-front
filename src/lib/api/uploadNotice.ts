import axios from "axios";

const Address = "http://www.stmap.kro.kr:8080";

export const postNoticeTeacher = async (
   title: string,
   content: string,
   img: string | undefined
) => {
   try {
      const res = await axios.post(`${Address}/api/member/teacher/notice`, {
         title,
         content,
         img,
      });
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};

export const postNoticeDirector = async (
   title: string,
   content: string,
   img: string | undefined
) => {
   try {
      const res = await axios.post(`${Address}/api/member/director/notice`, {
         title,
         content,
         img,
      });
   } catch (err) {
      console.log(err.response.data);
      throw err;
   }
};
