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
import LiveScreen from "./src/screens/LiveScreen";
import SearchScreen from './src/screens/SearchScreen'
import { Icon } from "react-native-elements";
import { useFonts } from 'expo-font';
import AuthScreen from "./src/screens/AuthScreen";
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
};
const Tab = createBottomTabNavigator<RootBottomTabParamList>();

export default function App() {

   const [loaded] = useFonts({
      Font: require('./assets/Font.ttf'),
    });

   return (
      <SafeAreaProvider>
         <StatusBar style="auto" />
         <SafeAreaView
            style={{
               flex: 1
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
                     </Tab.Navigator>
                     
                  </NavigationContainer>
               </AppInit>
            </Provider>
         </SafeAreaView>
      </SafeAreaProvider>
   );
}
