import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import Fcm from "../view/Fcm";
import * as Clipboard from "expo-clipboard";
import { setSnackbar } from "../../../modules/snackbar";

type Props = {};

function FcmContainer({}: Props) {
   const token = useSelector(({ pushToken }: RootState) => pushToken.token);
   const dispatch = useDispatch();

   const onPressCopyToken = () => {
      Clipboard.setString(token);
      dispatch(
         setSnackbar({
            visible: true,
            snackbar: "토큰이 클립보드에 복사되었습니다.",
         })
      );
   };
   return <Fcm token={token} onPressCopyToken={onPressCopyToken} />;
}

export default FcmContainer;
