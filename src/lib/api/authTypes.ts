export type SignupInfo = {
   loginId: string;
   password: string;
   name: string;
   sex: "남성" | "여성";
};
export type ParentSignup = SignupInfo & {
   childName: string;
   childBirthday: string;
   childSex: "남성" | "여성";
};

export type DirectorSignUpType = SignupInfo & {
   connectionNumber: string;
};

export type TeacherSignUpType = SignupInfo;

export type LoginType = {
   loginId: string;
   password: string;
   expoToken: string;
};
