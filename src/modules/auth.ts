export type authStateType = {
   id: number;
   profileImg?: string;
   loginId: string;
   name: string;
   connectionNumber: string | null;
   sex: string;
   authority: string;
   center?: string;
   role?: string | null;
   aclass?: string | null;
   childName?: string;
   childBirthday?: string;
   childSex?: string;
   student?: string | null;
   directorLoginId?: string | null;
   teacherLoginId?: string | null;
};

//액션 타입
const SIGNIN = "SIGNIN" as const;
const SIGNOUT = "SIGNOUT" as const;

//액션 생성 함수
export const signin = (userInfo: authStateType) => ({
   type: SIGNIN,
   payload: userInfo,
});
export const signout = () => ({ type: SIGNOUT });

type AuthAction = ReturnType<typeof signin> | ReturnType<typeof signout>;

const initialState: authStateType & { signined: boolean } = {
   signined: false,
   id: 123123412,
   loginId: "",
   name: "",
   connectionNumber: "",
   sex: "",
   authority: "",
};

export default function auth(
   state = initialState,
   action: AuthAction
): typeof initialState {
   switch (action.type) {
      case SIGNIN:
         return {
            signined: true,
            ...action.payload,
         };
      case SIGNOUT:
         return {
            signined: false,
            id: 41231421312,
            loginId: "",
            name: "",
            connectionNumber: "",
            sex: "",
            authority: "",
         };
      default:
         return state;
   }
}
