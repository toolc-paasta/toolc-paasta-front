import React, { useState, useEffect } from "react";
import {
   Text,
   View,
   StyleSheet,
   ScrollView,
   TouchableOpacity,
   Dimensions,
} from "react-native";

import MenuWithBtns from "../elements/MenuWithBtns";
import MenuWithList from "../elements/MenuWithList";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomTabNavigation } from "../../../screens/SearchScreen";
import { logout } from "../../../lib/api/auth";
import constants from "../../../lib/utils/constants";

const articleTopStyleConst = {
   parent: {
      height: 206,
      marginBottom: 100,
   },
   teacher: {
      height: 256,
      marginBottom: 150,
   },
};

type Props = {
   navigation: BottomTabNavigation;
   auth: any;
};

function Home({ navigation, auth }: Props) {
   let res;
   const [isAuth, setIsAuth] = useState(auth.hasCenter); //auth.hasCenter
   /*
   어드민 admin qwer1234!
   선생 qwer1106 qwer1106^
   학부모 shkim1106 qwer1106^ p1/01012344321
   학부모 shkim1107 qwer1106^ p2/01012344322
   원장 asdf1106 qwer1106^
   
 */
   return (
      <View style={styles.container}>
         {isAuth ? (
            <ScrollView>
               <View
                  style={[
                     styles.articleTop,
                     {
                        height:
                           auth.authority === "PARENT"
                              ? articleTopStyleConst.parent.height
                              : articleTopStyleConst.teacher.height,
                        marginBottom:
                           auth.authority === "PARENT"
                              ? articleTopStyleConst.parent.marginBottom
                              : articleTopStyleConst.teacher.marginBottom,
                     },
                  ]}>
                  <View style={styles.header}>
                     <Text style={styles.headerText}>{auth?.centerName}</Text>
                     <View style={styles.headerIcon}>
                        {auth.authority === constants.authority_director && (
                           <Icon
                              name={"notifications-outline"}
                              size={35}
                              color="white"
                              style={styles.icon}
                              onPress={() => navigation.navigate("Notice")}
                           />
                        )}
                        <Icon
                           name={"log-out-outline"}
                           size={35}
                           color="white"
                           style={styles.icon}
                           onPress={() => [
                              logout(),
                              navigation.navigate("Auth"),
                           ]}
                        />
                     </View>
                  </View>
                  <Text style={styles.articleTopText}>
                     {auth.name}{" "}
                     {auth.authority == "TEACHER"
                        ? "선생님"
                        : auth.authority == "DIRECTOR"
                        ? "원장님"
                        : "학부모님"}{" "}
                     환영합니다.
                  </Text>
               </View>

               <View style={styles.menuWithBtns}>
                  <MenuWithBtns
                     user_type={auth.authority}
                     navigation={navigation}
                  />
               </View>
               <View style={styles.menuWithList}>
                  <MenuWithList />
               </View>
            </ScrollView>
         ) : (
            <View style={{ flex: 1 }}>
               <View
                  style={[
                     styles.header,
                     {
                        position: "absolute",
                        top: 0,
                        left: Dimensions.get("window").width,
                     },
                  ]}>
                  <View style={styles.headerIcon}>
                     <Icon
                        name={"log-out-outline"}
                        size={35}
                        color="black"
                        style={styles.icon}
                        onPress={() => [logout(), navigation.navigate("Auth")]}
                     />
                  </View>
               </View>
               <View style={styles.blankContainer}>
                  <Text style={styles.blankText}>
                     등록된 유치원이 없습니다.{" "}
                  </Text>
                  <Text style={styles.blankText}>
                     먼저 등록을 해야 서비스를{" "}
                  </Text>
                  <Text style={styles.blankText}>이용할 수 있습니다. </Text>
                  {auth.authority == "TEACHER" && (
                     <TouchableOpacity
                        style={styles.blackBtn}
                        onPress={() => navigation.navigate("Kinger")}>
                        <Text style={[styles.blankText, styles.blankBtnText]}>
                           유치원 인증하기
                        </Text>
                     </TouchableOpacity>
                  )}
               </View>
            </View>
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      // paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
      width: "100%",
   },
   blankContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   blankText: {
      fontSize: 25,
      paddingBottom: 10,
   },
   blackBtn: {
      marginTop: 10,
      borderRadius: 10,
      backgroundColor: "#ffd257",
      width: 150,
      paddingTop: 5,
      height: 50,
      justifyContent: "center",
   },
   blankBtnText: {
      fontSize: 18,
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
   },
   header: {
      height: 50,
      alignItems: "center",
      flexDirection: "row",
      marginBottom: 24,
   },
   headerText: {
      fontSize: 28,
      fontFamily: "Font",
      color: "white",
   },
   headerIcon: {
      position: "absolute",
      right: 10,
      flexDirection: "row",
   },
   headerIconText: {
      color: "red",
   },
   icon: {
      fontSize: 30,
      paddingLeft: 10,
   },
   articleTop: {
      backgroundColor: "#FFD257",
      paddingHorizontal: 16,
      paddingTop: 12,
   },
   articleTopText: {
      fontSize: 20,
      width: 250,
      fontFamily: "Font",
      color: "white",
   },
   menuWithBtns: {
      width: "80%",
      position: "absolute",
      top: 144,
      marginHorizontal: "10%",
      paddingTop: 8,
      backgroundColor: "#FDFCF8",
      borderRadius: 32,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 5,
   },
   menuWithList: {
      paddingHorizontal: 24,
   },
});

export default Home;
