import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { authStateType } from "../../../modules/auth";

const styles = StyleSheet.create({
   loading: {
      position: "absolute",
      right: 0,
      top: 110,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "gray",
   },
});

type Props = {
   user: authStateType;
   changeAvatar: () => Promise<void>;
   loading: { photo: boolean; name: boolean };
};

function Header({ user, changeAvatar, loading }: Props) {
   return (
      <Avatar
         size="xlarge"
         rounded
         activeOpacity={0.7}
         containerStyle={{ backgroundColor: "purple" }}
         {...(() => {
            return user?.profileImg
               ? { source: { uri: user?.profileImg } }
               : { title: user?.id?.slice(0, 2) };
         })()}>
         {loading.photo ? (
            <ActivityIndicator style={styles.loading} size={30} color="white" />
         ) : (
            <Avatar.Accessory
               name="pencil"
               type="font-awesome"
               size={40}
               onPress={changeAvatar}
            />
         )}
      </Avatar>
   );
}

export default Header;
