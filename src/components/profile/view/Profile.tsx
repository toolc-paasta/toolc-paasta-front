import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Button } from "react-native-elements";
import Header from "./Header";
import { authStateType } from "../../../modules/auth";

type thisLoadingType = {
   photo: boolean;
   name: boolean;
};

type Props = {
   user: authStateType;
   changeAvatar: () => Promise<void>;
   loading: thisLoadingType;
   showChangePassword: () => void;
   showRemoveUser: () => void;
   onPressLogout: () => Promise<void>;
};

function Profile({
   user,
   changeAvatar,
   loading,
   showChangePassword,
   showRemoveUser,
   onPressLogout,
}: Props) {
   return (
      <View style={styles.container}>
         <View style={styles.avatar}>
            <Header user={user} changeAvatar={changeAvatar} loading={loading} />
         </View>
         <View style={styles.content}>
            <ListItem
               bottomDivider
               containerStyle={{ backgroundColor: "white" }}>
               <Text style={styles.lineHeader}>아이디</Text>
               <ListItem.Content>
                  <ListItem.Title>{user?.id}</ListItem.Title>
               </ListItem.Content>
            </ListItem>
         </View>
         <View style={styles.bottomBar}>
            <Button
               title="탈퇴"
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               titleStyle={[{ color: "red" }]}
               onPress={showRemoveUser}
            />
            <Button
               title="비밀번호 변경"
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               onPress={showChangePassword}
            />
            <Button
               title="로그아웃"
               type="clear"
               containerStyle={styles.buttonContainer}
               buttonStyle={styles.buttonStyle}
               onPress={onPressLogout}
            />
         </View>
      </View>
   );
}

export default Profile;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingBottom: 0,
      paddingTop: 30,
      backgroundColor: "white",
   },
   avatar: {
      height: 200,
      alignItems: "center",
      justifyContent: "center",
   },
   content: {
      padding: 10,
   },
   lineHeader: {
      opacity: 0.8,
   },
   bottomBar: {
      position: "absolute",
      width: "100%",
      bottom: 0,
      height: 80,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
   },
   buttonContainer: {
      width: "33%",
      alignItems: "center",
   },
   buttonStyle: {
      width: "100%",
   },
});
