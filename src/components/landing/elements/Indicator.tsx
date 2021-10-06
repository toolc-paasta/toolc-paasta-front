import React from "react";
import { Animated, StyleSheet, View } from "react-native";

const DOT_SIZE = 10;

const Indicator = ({
   scrollOffsetAnimatedValue,
   positionAnimatedValue,
   length,
}: {
   scrollOffsetAnimatedValue: Animated.Value;
   positionAnimatedValue: Animated.Value;
   length: number;
}) => {
   const interpolations = Array(length)
      .fill(1)
      .map((item, index) => {
         const inputRange = [index - 1, index, index + 1];
         const scale = Animated.add(
            positionAnimatedValue,
            scrollOffsetAnimatedValue
         ).interpolate({
            inputRange: inputRange,
            outputRange: [1, 1.5, 1],
            extrapolate: "clamp",
         });
         return scale;
      });

   return (
      <View style={[styles.pagination]}>
         {Array(length)
            .fill(1)
            .map((item, idx) => {
               return (
                  <Animated.View
                     key={idx}
                     style={[
                        styles.paginationIndicator,
                        {
                           transform: [{ scale: interpolations[idx] }],
                        },
                     ]}
                  />
               );
            })}
      </View>
   );
};

const styles = StyleSheet.create({
   pagination: {
      height: 100,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
   },
   paginationIndicator: {
      width: DOT_SIZE,
      height: DOT_SIZE,
      margin: DOT_SIZE * 0.2,
      borderRadius: DOT_SIZE / 2,
      borderWidth: 2,
      borderColor: "#ddd",
   },
});

export default Indicator;
