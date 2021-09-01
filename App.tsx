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
import SearchScreen from './src/screens/SearchScreen'
import { Icon } from "react-native-elements";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);
sagaMiddleware.run(rootSaga);

// 여기서 스크린 props 정의
export type RootBottomTabParamList = {
   Home: undefined;
   Search: undefined;
};
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function App() {
   return (
      <SafeAreaProvider>
         <StatusBar style="auto" />
         <SafeAreaView
            style={{
               flex: 1,
            }}>
            <Provider store={store}>
               <AppInit>
                  <NavigationContainer documentTitle={{ enabled: false }}>
                     <Tab.Navigator initialRouteName="Home">
                        <Tab.Screen
                           name="Home"
                           component={HomeScreen}
                           options={{
                              headerShown: false,
                              tabBarIcon: () => <Icon name="home" />,
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
                     </Tab.Navigator>
                  </NavigationContainer>
               </AppInit>
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
