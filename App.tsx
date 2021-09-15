import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

/*리덕스 */
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./src/modules";
import logger from "redux-logger";

import AppInit from "./AppInit";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ManagementScreen from "./src/screens/ManagementScreen";
import LiveScreen from "./src/screens/LiveScreen";
<<<<<<< HEAD
import SearchScreen from "./src/screens/SearchScreen";
import ListScreen from "./src/screens/ListScreen";
=======
import SearchScreen from './src/screens/SearchScreen'
import ListDetailScreen from './src/screens/ListDetailScreen'
import ParentBoardScreen from './src/screens/ParentBoardScreen'
import NoticeBoardScreen from './src/screens/NoticeBoardScreen'
import UploadNoticeScreen from './src/screens/UploadNoticeScreen'
import ContactScreen from './src/screens/ContactScreen'
>>>>>>> sunghyun/3
import { Icon } from "react-native-elements";
import { useFonts } from "expo-font";
import AuthScreen from "./src/screens/AuthScreen";
import { navigationRef } from "./RootNavigation";

import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { REACT_APP_PUBLISH_KEY, REACT_APP_SUBSCRIBE_KEY } from "@env";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["Setting a timer"]);
// pubnub 설정

const pubnub = new PubNub({
   publishKey: REACT_APP_PUBLISH_KEY,
   subscribeKey: REACT_APP_SUBSCRIBE_KEY,
   uuid: Math.ceil(Math.random() * 1000000).toString(),
});

// redux

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

// 여기서 스크린 props 정의
export type RootBottomTabParamList = {
   Home: undefined;
   Auth: undefined;
   Search: undefined;
   NoticeBoard: undefined;
   ParentBoard: undefined;
   ListDetail: undefined;
   Management: undefined;
   Contact: undefined;
   UploadNotice: undefined;
};
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function App() {
   const [loaded] = useFonts({
      Font: require("./assets/Font.ttf"),
   });

   return (
      <SafeAreaProvider>
         <StatusBar style="auto" />
         <SafeAreaView
            style={{
               flex: 1,
            }}>
            <Provider store={store}>
               <AppInit>
                  <PubNubProvider client={pubnub}>
                     <NavigationContainer
                        ref={navigationRef}
                        documentTitle={{ enabled: false }}>
                        <Tab.Navigator initialRouteName="Home">
                           <Tab.Screen
                              name="Home"
                              component={HomeScreen}
                              options={{
                                 headerShown: false,
                                 tabBarIcon: () => <Icon name="home" />,
                              }}
                           />

<<<<<<< HEAD
                           <Tab.Screen
                              name="Auth"
                              component={AuthScreen}
                              options={{
                                 headerShown: false,
                                 tabBarIcon: () => <Icon name="lock" />,
                              }}
                           />
                           <Tab.Screen
                              name="Search"
                              component={SearchScreen}
                              options={{
                                 headerShown: false,
                                 tabBarIcon: () => <Icon name="home" />,
                              }}
                           />
                           <Tab.Screen
                              name="List"
                              component={ListScreen}
                              options={{
                                 headerShown: false,
                                 tabBarIcon: () => <Icon name="home" />,
                              }}
                           />
                        </Tab.Navigator>
                     </NavigationContainer>
                  </PubNubProvider>
=======
                        <Tab.Screen
                           name="Auth"
                           component={AuthScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="lock" />,
                           }}
                        />
                        <Tab.Screen
                           name="Search"
                           component={SearchScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                        <Tab.Screen
                           name="ListDetail"
                           component={ListDetailScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                        <Tab.Screen
                           name="NoticeBoard"
                           component={NoticeBoardScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                        <Tab.Screen
                           name="ParentBoard"
                           component={ParentBoardScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                        <Tab.Screen
                           name="Management"
                           component={ManagementScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                        <Tab.Screen
                           name="Contact"
                           component={ContactScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                        <Tab.Screen
                           name="UploadNotice"
                           component={UploadNoticeScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
                           }}
                        />
                     </Tab.Navigator>
                  </NavigationContainer>
>>>>>>> sunghyun/3
               </AppInit>
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}