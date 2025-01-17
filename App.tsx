import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import HomeScreen from './src/screens/home';
import CallScreen from './src/screens/call';
import useZegoCallService from './src/screens/serviceZego';

const Stack = createNativeStackNavigator();

export default function App() {
  const { initializeCallService } = useZegoCallService();

  useEffect(() => {
    initializeCallService();
  }, [initializeCallService]);
  return (
    <NavigationContainer>
      {/* Call Invitation Dialog to handle incoming calls */}
      <ZegoCallInvitationDialog />

      {/* Stack Navigator for screen navigation */}
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CallScreen" component={CallScreen} />
        <Stack.Screen
          options={{headerShown: false}}
          name="ZegoUIKitPrebuiltCallWaitingScreen"
          component={ZegoUIKitPrebuiltCallWaitingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ZegoUIKitPrebuiltCallInCallScreen"
          component={ZegoUIKitPrebuiltCallInCallScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
