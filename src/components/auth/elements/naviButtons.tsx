import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

type Props = {
   position: number;
   last: boolean;
   goNext: () => void;
   goPrev: () => void;
};

export default function NaviButtons({ goNext, goPrev, position, last }: Props) {
   return (
      <View
         style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 20,
         }}>
         {position !== 0 && (
            <Button title="이전" onPress={goPrev} type="clear" />
         )}
         {!last && <Button title="다음" onPress={goNext} type="clear" />}
      </View>
   );
}
