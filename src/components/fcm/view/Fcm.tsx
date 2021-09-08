import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

type Props = {
   token: string;
   onPressCopyToken: () => void;
};

function Fcm({ token, onPressCopyToken }: Props) {
   return (
      <View style={styles.container}>
         <Text>{token}</Text>
         <Button title="copy" onPress={onPressCopyToken} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
});

export default Fcm;
