export type RegisterCenterNoti = {
   id: number;
   user: {
      id: number;
      loginId: string;
      name: string;
      connectionNumber: string;
      sex: "남성" | "여성";
   };
   centerName?: string;
   address?: string;
   foundationDate?: string;
   centerId?: string;
   classId?: string;
};
