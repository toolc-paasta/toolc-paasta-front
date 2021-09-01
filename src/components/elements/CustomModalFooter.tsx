import React from "react";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Button, ButtonProps } from "react-native-elements";
import { MODAL_PADDING } from "../../lib/utils/variables";

interface button extends ButtonProps {}

type Props = {
   buttons: button[];
   width: number;
};

function CustomModalFooter({ buttons, width }: Props) {
   return (
      <View
         style={
            stylesFunc({ width: width + MODAL_PADDING * 2 }).footerContainer
         }>
         {buttons.map((item, key) => (
            <Button
               key={`modal_button_${key}`}
               titleStyle={[styles.footerButtonText, item.titleStyle]}
               containerStyle={
                  stylesFunc({ length: buttons.length }).buttonContainer
               }
               buttonStyle={styles.footerButton}
               title={item.title}
               onPress={item.onPress}
            />
         ))}
      </View>
   );
}

type stylesFuncType = {
   length?: number;
   width?: number;
};

const stylesFunc = ({ length, width }: stylesFuncType) =>
   StyleSheet.create({
      buttonContainer: {
         width: length === 1 ? "100%" : "50%",
         height: 48,
      },

      footerContainer: {
         flexDirection: "row",
         justifyContent: "center",
         width: width,
         height: 48,
         alignItems: "center",
         backgroundColor: "white",
         borderBottomRightRadius: 10,
         borderBottomLeftRadius: 10,
         overflow: "hidden",
      },
   });

const styles = StyleSheet.create({
   footerButton: {
      backgroundColor: "white",
      height: 48,
   },
   footerButtonText: {
      fontWeight: "500",
      color: "black",
   },
});

export default CustomModalFooter;
