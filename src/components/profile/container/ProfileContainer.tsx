import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../view/Profile";
import * as ImagePicker from "expo-image-picker";
import { signin, signout } from "../../../modules/auth";
import { setSnackbar } from "../../../modules/snackbar";
import { BottomTabNavigation } from "../../../screens/AuthScreen";
import { RootState } from "../../../modules";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import { loading, unloading } from "../../../modules/loading";
import ReauthenticateModalContainer from "./ReauthenticateModalContainer";
import PwUpdateContainer from "./PwUpdateContainer";
import RemoveUserModalContainer from "./RemoveUserModalContainer";

type Props = {
   navigation: BottomTabNavigation;
};

function ProfileContainer({ navigation }: Props) {
   const user = useSelector(({ auth }: RootState) => auth);
   const [thisLoading, setThisLoading] = useState({
      photo: false,
      name: false,
   });
   const [modalVisible, setModalVisible] = useState(false);
   const [removeUserVisible, setRemoveUserVisible] = useState(false);
   const [reauthenticated, setReauthenticated] = useState(false);
   const [reauthVisible, setReauthVisible] = useState(false);
   const [pw, setPW] = useState("");
   const dispatch = useDispatch();

   const changeAvatar = async () => {
      try {
         let res = await ImagePicker.getMediaLibraryPermissionsAsync();
         if (!res.granted) {
            res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
            if (!res.granted) {
               return;
            }
         }
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
         });
         if (!result.cancelled) {
            // 프로필 사진 수정
            setThisLoading((prev) => ({ ...prev, photo: true }));
            //    const res = await updateProfileAvatar(result.uri, user.loginId);
            // dispatch(signin(res));
         }
      } catch (err) {
         dispatch(setSnackbar({ visible: true, snackbar: SERVER_ERROR }));
      }
      setThisLoading((prev) => ({ ...prev, photo: false }));
   };

   const showChangePassword = () => {
      setModalVisible(true);
      setReauthVisible(true);
   };
   const showRemoveUser = () => {
      setRemoveUserVisible(true);
      setReauthVisible(true);
   };
   const onPressLogout = async () => {
      dispatch(loading());
      try {
         //    await logout();
      } catch (err) {
         // 재시작
         dispatch(unloading());
         return;
      }
      dispatch(signout());
      dispatch(unloading());
   };
   const afterPwChange = () => {
      setReauthenticated(false);
      setPW("");
   };
   return (
      <>
         <Profile
            user={user}
            changeAvatar={changeAvatar}
            loading={thisLoading}
            showChangePassword={showChangePassword}
            showRemoveUser={showRemoveUser}
            onPressLogout={onPressLogout}
         />
         {(modalVisible || removeUserVisible) && !reauthenticated ? (
            <ReauthenticateModalContainer
               user={user}
               reauthVisible={reauthVisible}
               setReauthVisible={setReauthVisible}
               setReauthenticated={setReauthenticated}
               password={pw}
               setPassword={setPW}
            />
         ) : (
            <>
               <PwUpdateContainer
                  visible={modalVisible}
                  setVisible={setModalVisible}
                  oldPassword={pw}
                  afterPwChange={afterPwChange}
               />
               <RemoveUserModalContainer
                  visible={removeUserVisible}
                  setVisible={setRemoveUserVisible}
                  navigation={navigation}
                  onPressLogout={onPressLogout}
               />
            </>
         )}
      </>
   );
}

export default ProfileContainer;
