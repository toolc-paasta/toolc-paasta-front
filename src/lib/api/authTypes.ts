export type SignupInfo = {
   loginId: string;
   password: string;
   name: string;
   sex: "남성" | "여성";
   connectionNumber: string;
};
export type ParentSignup = SignupInfo & {
   childName: string;
   childBirthday: string;
   childSex: "남성" | "여성";
   spouseLoginId?: string;
};

export type DirectorSignUpType = SignupInfo;

export type TeacherSignUpType = SignupInfo;

export type LoginType = {
   loginId: string;
   password: string;
   expoToken: string;
};

export type authorityType = "TEACHER" | "DIRECTOR" | "ADMIN" | "PARENT";

export type addClassType = {
   name: string;
};
