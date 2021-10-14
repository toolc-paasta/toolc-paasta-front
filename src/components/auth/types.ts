export type sexType = "남성" | "여성";
export type userInfoType = {
   loginId: string;
   password: string;
};

export type signInInfoType = {
   loginId: string;
   name: string;
   sex: sexType;
   password: string;
   passwordCheck: string;
   connectionNumber?: string;
};

export type childInfoType = {
   childName: string;
   childSex: sexType;
   childBirthday: string;
};

type areaType = {
   code: number;
   name: string;
};

export type areaInfoType = {
   state: number;
   area: number;
};

export type kinderType = {
   centerName: string;
   address: string;
   tel: string;
};

export type kinderListType = kinderType[];

export type errType = {
   birth: string;
   id: string;
   password: string;
   passwordCheck: string;
};
