export type authStateType = {
   id: string;
   signined?: Boolean;
   profileImg?: string;
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

const initialState: authStateType = {
   signined: false,
   id: "",
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
