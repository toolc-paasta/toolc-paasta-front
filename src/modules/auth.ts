export type authStateType = {
   id: string;
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
   student?: string | null;
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
   id: "",
   loginId: "",
   name: "",
   connectionNumber: "",
   sex: "",
   authority: "",
};

export default function auth(state = initialState, action: AuthAction) {
   switch (action.type) {
      case SIGNIN:
         return {
            signined: true,
            ...action.payload,
         };
      case SIGNOUT:
         return {
            signined: false,
            id: "",
         };
      default:
         return state;
   }
}
