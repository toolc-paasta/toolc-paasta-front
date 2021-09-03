export type pushTokenType = {
   token: string;
};

const SET_TOKEN = "pushToken/SET_TOKEN" as const;
const CLEAR_TOKEN = "pushToken/CLEAR_TOKEN" as const;

export const setToken = (payload: pushTokenType) => ({
   type: SET_TOKEN,
   payload: payload,
});

export const clearToken = () => ({
   type: CLEAR_TOKEN,
});

type PushTokenAction =
   | ReturnType<typeof setToken>
   | ReturnType<typeof clearToken>;

const initialState: pushTokenType = {
   token: "",
};

export default function pushToken(
   state = initialState,
   action: PushTokenAction
) {
   switch (action.type) {
      case SET_TOKEN:
         return action.payload;
      case CLEAR_TOKEN:
         return { token: "" };
      default:
         return state;
   }
}
