import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

/*리덕스 */
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "./src/modules";
import logger from "redux-logger";

import AppInit from "./AppInit";

import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import ManagementScreen from "./src/screens/ManagementScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ListDetailScreen from "./src/screens/ListDetailScreen";
import ParentBoardScreen from "./src/screens/ParentBoardScreen";
import NoticeBoardScreen from "./src/screens/NoticeBoardScreen";
import UploadNoticeScreen from "./src/screens/UploadNoticeScreen";
import ContactScreen from "./src/screens/ContactScreen";
import ShuttleScreen from "./src/screens/ShuttleScreen";
import TalkScreen from "./src/screens/TalkScreen";
import NoticeScreen from "./src/screens/NoticeScreen";
import KingerScreen from "./src/screens/KingerScreen";
import ForAdminScreen from "./src/screens/ForAdminScreen";
import { useFonts } from "expo-font";
import AuthScreen from "./src/screens/AuthScreen";
import { navigationRef } from "./RootNavigation";

import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { PubNubProvider } from "pubnub-react";
import PubNub from "pubnub";
import { REACT_APP_PUBLISH_KEY, REACT_APP_SUBSCRIBE_KEY } from "@env";
import { List } from "./src/components/list/view/ListDetail";

LogBox.ignoreLogs(["Setting a timer"]);

//pubnub config

const pubnub = new PubNub({
   publishKey: REACT_APP_PUBLISH_KEY,
   subscribeKey: REACT_APP_SUBSCRIBE_KEY,
   uuid: Math.ceil(Math.random() * 1000000).toString(),
});

// redux

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(logger))
);

// 여기서 스크린 props 정의
export type RootStackParamList = {
   Auth: undefined;
   Home: undefined;
   Search: undefined;
   NoticeBoard: { refresh: string };
   ParentBoard: undefined;
   ListDetail: {
      data: List;
      header_title: string;
   };
   Management: undefined;
   Contact: undefined;
   UploadNotice: undefined;
   Shuttle: undefined;
   Talk: undefined;
   Notice: undefined;
   Kinger: undefined;
   Admin: undefined;
   ForAdmin: undefined;
};
export type StackScreenList =
   | "Auth"
   | "Home"
   | "Search"
   | "NoticeBoard"
   | "ParentBoard"
   | "ListDetail"
   | "Management"
   | "Contact"
   | "UploadNotice"
   | "Shuttle"
   | "Talk"
   | "Notice"
   | "Kinger"
   | undefined;

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
   const [loaded] = useFonts({
      Font: require("./assets/Font.ttf"),
   });
   const [initialRouteName, setInitialRouteName] =
      React.useState<StackScreenList>("Auth");

   /*
      https://pacific-jeep-805.notion.site/DayCare-API-Specification-2ba71edd27054a42a5d9a167e46688ab
      */
   return (
      <SafeAreaProvider>
         <StatusBar style="auto" />
         <SafeAreaView
            style={{
               flex: 1,
            }}>
            <Provider store={store}>
               <PubNubProvider client={pubnub}>
                  <AppInit setInitialRouteName={setInitialRouteName}>
                     <NavigationContainer
                        ref={navigationRef}
                        documentTitle={{ enabled: false }}>
                        <Stack.Navigator initialRouteName={initialRouteName}>
                           <Stack.Screen
                              name="Auth"
                              component={AuthScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Home"
                              component={HomeScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Search"
                              component={SearchScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="ListDetail"
                              component={ListDetailScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="NoticeBoard"
                              component={NoticeBoardScreen}
                              options={{
                                 headerShown: false,
                              }}
                              initialParams={{ refresh: "123" }}
                           />
                           <Stack.Screen
                              name="ParentBoard"
                              component={ParentBoardScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Management"
                              component={ManagementScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Contact"
                              component={ContactScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="UploadNotice"
                              component={UploadNoticeScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Shuttle"
                              component={ShuttleScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Talk"
                              component={TalkScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Notice"
                              component={NoticeScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="Kinger"
                              component={KingerScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                           <Stack.Screen
                              name="ForAdmin"
                              component={ForAdminScreen}
                              options={{
                                 headerShown: false,
                              }}
                           />
                        </Stack.Navigator>
                     </NavigationContainer>
                  </AppInit>
               </PubNubProvider>
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
