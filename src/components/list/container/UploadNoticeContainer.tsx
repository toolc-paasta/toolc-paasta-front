import { ImagePickerResult } from "expo-image-picker";
import React, { useState } from "react";
import { useEffect } from "react";
import { StackScreenNavigation } from "../../../screens/UploadNoticeScreen";
import UploadNotice from "../view/UploadNotice";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../modules";
import constants from "../../../lib/utils/constants";
import {
   postNoticeTeacher,
   postNoticeDirector,
} from "../../../lib/api/uploadNotice";
import { loading, unloading } from "../../../modules/loading";
import { SERVER_ERROR } from "../../../lib/utils/strings";
import { setSnackbar } from "../../../modules/snackbar";

type Props = {
   navigation: StackScreenNavigation;
};

// launchImageLibraryAsync 함수 결과 타입
export type ImageLibraryReturn =
   | (ImagePickerResult & { uri?: string; base64?: string })
   | null;

function noticeBoardContainer({ navigation }: Props) {
   const [title, setTitle] = useState<string>("");
   const [content, setContent] = useState<string>("");
   const [isSubmit, setIsSubmit] = useState<boolean>(false);
   const [photo, setPhoto] = useState<ImageLibraryReturn>(null); // 유저가 고른 사진

   const auth = useSelector(({ auth }: RootState) => auth);
   const dispatch = useDispatch();

   useEffect(() => {
      if (isSubmit) {
         if (title && content) {
            postNotice();
         } else {
            dispatch(
               setSnackbar({
                  visible: true,
                  snackbar: "제목과 내용을 입력해주세요",
               })
            );
            setIsSubmit(false);
         }
      }
   }, [isSubmit]);

   const postNotice = async () => {
      dispatch(loading());
      try {
         if (auth.authority === constants.authority_director) {
            await postNoticeDirector(title, content, photo?.base64);
         } else if (auth.authority === constants.authority_teacher) {
            await postNoticeTeacher(title, content, photo?.base64);
         }
         navigation.goBack();
      } catch (err) {
         dispatch(
            setSnackbar({
               visible: true,
               snackbar:
                  "3천자 이내로 글자수를 줄여주시거나, 잠시 후 다시 시도해주세요.",
            })
         );
      }
      dispatch(unloading());
      setIsSubmit(false);
   };

   const inputTitle = (title: string) => {
      setTitle(title);
   };
   const inputContent = (content: string) => {
      setContent(content);
   };
   const changeIsSubmit = (isSumit: boolean) => {
      setIsSubmit(isSumit);
   };

   // 사진 고르기
   const pickPhoto = async () => {
      // 권한 얻기
      let res = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (!res.granted) {
         res = await ImagePicker.requestMediaLibraryPermissionsAsync(false);
         if (!res.granted) {
            return;
         }
      }

      // 사진 얻기
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [9, 16],
         quality: 0.5,
         base64: true,
      });

      // 취소 됐으면 이전 사진을, 아니면 결과를 넣는다.
      if (!result.cancelled) {
         // 프로필 사진 수정
         setPhoto(result);
      }
   };

   return (
      <UploadNotice
         navigation={navigation}
         inputTitle={inputTitle}
         inputContent={inputContent}
         changeIsSubmit={changeIsSubmit}
         photo={photo}
         pickPhoto={pickPhoto}
      />
   );
}

export default noticeBoardContainer;
