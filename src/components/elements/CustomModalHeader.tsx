import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MODAL_PADDING } from "../../lib/utils/variables";

type propsType = {
   title: String;
};

type Props = {
   props: propsType;
   width: number;
};

function CustomModalHeader({ props, width }: Props) {
   return (
      <View
         {...props}
         style={
            stylesFunc({ width: width + MODAL_PADDING * 2 }).titleContainer
         }>
         <Text style={[styles.titleText]}>{props.title}</Text>
      </View>
   );
}

type stylesFuncType = {
   width: number;
};

const stylesFunc = ({ width }: stylesFuncType) =>
   StyleSheet.create({
      titleContainer: {
         width: width,
         height: 48,

         alignItems: "center",
         justifyContent: "center",

         backgroundColor: "white",

         borderTopRightRadius: 10,
         borderTopLeftRadius: 10,

         shadowColor: "#000",
         shadowOpacity: 0.25,
         shadowRadius: 3.84,

         elevation: 1,
      },
   });

const styles = StyleSheet.create({
   titleText: {
      fontWeight: "500",
      fontSize: 20,
   },
});

export default CustomModalHeader;
