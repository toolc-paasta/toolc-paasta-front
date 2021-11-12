import React from "react";
import {
   Dimensions,
   View,
   StyleSheet,
   TextInput,
   ScrollView,
} from "react-native";
import Constants from "expo-constants";
import Header from "../../elements/Header";
import { StackScreenNavigation } from "../../../screens/UploadNoticeScreen";
import { Image } from "react-native-elements";
import { ImageLibraryReturn } from "../container/UploadNoticeContainer";

type Props = {
   navigation: StackScreenNavigation;
   photo: ImageLibraryReturn;
   inputTitle: (title: string) => void;
   inputContent: (content: string) => void;
   changeIsSubmit: (isSubmit: boolean) => void;
   pickPhoto: () => Promise<void>;
};

const IMAGE_WIDTH: number = Dimensions.get("window").width * 0.8;
const IMAGE_HEIGHT: number = (IMAGE_WIDTH / 4) * 3;

export default function UploadNotice({
   navigation,
   photo,
   inputTitle,
   inputContent,
   changeIsSubmit,
   pickPhoto,
}: Props) {
   return (
      <View style={styles.container}>
         <Header
            header_title={"글쓰기"}
            navigation={navigation}
            setIsSubmit={changeIsSubmit}
            IsInsert={null}
            setModalVisible={false}
         />
         <ScrollView>
            <View style={[styles.box, styles.box1]}>
               <TextInput
                  style={styles.input1}
                  onChangeText={inputTitle}
                  placeholder="제목"
               />
            </View>
            <View style={[styles.box, styles.box2]}>
               <TextInput
                  style={styles.input2}
                  onChangeText={inputContent}
                  placeholder="내용을 입력하세요"
                  multiline
                  numberOfLines={20}
               />
            </View>
            <View style={[styles.imageContainer, { height: IMAGE_HEIGHT }]}>
               <Image
                  source={{ uri: photo?.uri }}
                  defaultSource={require("../../../../assets/default.jpg")}
                  containerStyle={{
                     width: IMAGE_WIDTH,
                     height: IMAGE_HEIGHT,
                     borderRadius: 40,
                     borderWidth: 2,
                     borderColor: "#bdbdbd",
                     backgroundColor: "#bdbdbd",
                  }}
                  resizeMode="cover"
                  progressiveRenderingEnabled
                  onPress={pickPhoto}
               />
            </View>
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,

      paddingTop: Constants.statusBarHeight,
      backgroundColor: "#fff",
      padding: 15,
   },
   box: {
      paddingTop: 10,
      paddingBottom: 10,
      width: Dimensions.get("window").width,
   },
   box1: {
      borderBottomWidth: 1,
      borderBottomColor: "#bdbdbd",
   },
   box2: {
      borderBottomWidth: 1,
      borderBottomColor: "#bdbdbd",
   },
   input1: {
      padding: 5,
   },
   input2: {
      textAlignVertical: "top",
      padding: 5,
   },
   imageContainer: {
      width: "100%",
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center",
   },
});
