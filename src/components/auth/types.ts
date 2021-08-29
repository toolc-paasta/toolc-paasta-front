export type userInfoType = {
   id: string;
   password: string;
};

export type signInInfoType = {
   id: string;
   password: string;
   passwordCheck: string;
};

export type childInfoType = {
   name: string;
   sex: string;
   birth: string[];
};

type areaType = {
   code: number;
   name: string;
};

export type areaInfoType = {
   state: number;
   area: number;
};
