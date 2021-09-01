import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { BottomTabNavigation } from "../../../screens/HomeScreen";

type Props = {
   navigation: BottomTabNavigation;
};

function Home({ navigation }: Props) {
   return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
         <Text>HomeScreen</Text>
         <Button
            title="유치원 검색(임시)"
            onPress={() => navigation.navigate("Search")}
         />
      </View>
   );
}

export default Home;
