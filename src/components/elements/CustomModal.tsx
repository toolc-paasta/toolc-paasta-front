import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { MODAL_PADDING, W_HEIGHT, W_WIDTH } from "../../lib/utils/variables";

type Props = {
   children: React.ReactNode;
   visible: boolean | undefined;
   title?: React.ReactNode;
   footer: React.ReactNode;
};

function CustomModal({ children, visible, title, footer }: Props) {
   return (
      <Modal isVisible={visible} style={styles.container}>
         {title}
         <View
            style={
               styleFunc({ hasTitle: title ? true : false }).childrenContainer
            }>
            {children}
         </View>
         {footer}
      </Modal>
   );
}

type styleFuncType = {
   hasTitle: Boolean;
};

const styleFunc = ({ hasTitle }: styleFuncType) =>
   StyleSheet.create({
      childrenContainer: {
         backgroundColor: "white",
         borderTopLeftRadius: hasTitle ? 0 : 10,
         borderTopRightRadius: hasTitle ? 0 : 10,
         overflow: "hidden",
         padding: MODAL_PADDING,
      },
   });

const styles = StyleSheet.create({
   container: {
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
   },
   content: {
      height: W_HEIGHT * 0.7,
      width: W_WIDTH,
   },
});

export default CustomModal;
