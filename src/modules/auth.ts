export type authStateType = {
   id: number;
   profileImg?: string;
   loginId: string;
   name: string;
   connectionNumber: string;
   sex: string;
   hasCenter: boolean;
   authority: string;
   center?: string;
   childId?: number;
   childName?: string;
   childBirthday?: string;
   childSex?: string;
   directorLoginId?: string | null;
   teacherLoginId?: string | null;
   centerName?: string | null;
   centerId?: string | null;
   classId?: string | null;
   className?: string | null;
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
   hasCenter: false,
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
         return initialState;
      default:
         return state;
   }
}
