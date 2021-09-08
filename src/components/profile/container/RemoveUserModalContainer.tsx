import React, { useState } from "react";
import RemoveUserModal from "../view/RemoveUserModal";
import { useDispatch } from "react-redux";
import { loading, unloading } from "../../../modules/loading";
import { setSnackbar } from "../../../modules/snackbar";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import { BottomTabNavigation } from "../../../screens/AuthScreen";

type Props = {
   visible: boolean;
   setVisible: (value: boolean | ((prev: boolean) => boolean)) => void;
   navigation: BottomTabNavigation;
   onPressLogout: () => Promise<void>;
};

function RemoveUserModalContainer({
   visible,
   setVisible,
   navigation,
   onPressLogout,
}: Props) {
   const [success, setSuccess] = useState(false);
   const dispatch = useDispatch();

   const removeUserFunc = async () => {
      dispatch(loading());
      try {
         // await removeUser();
         // 뭔가 회원 정보 다 날리는 작업
         onPressLogout();
         setSuccess(true);
      } catch (err) {
         dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
      }
      dispatch(unloading());
   };
   const afterRemove = () => {
      navigation.navigate("Home");
   };
   const close = () => {
      setVisible(false);
   };
   return (
      <RemoveUserModal
         visible={visible}
         close={close}
         removeUserFunc={removeUserFunc}
         afterRemove={afterRemove}
         success={success}
      />
   );
}

export default RemoveUserModalContainer;
