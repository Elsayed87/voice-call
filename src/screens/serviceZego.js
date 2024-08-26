import {useCallback} from 'react';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';
import KeyCenter from '../constant/eunms';

const useZegoCallService = () => {
  const initializeCallService = useCallback(() => {
    try {
      // Check if ZegoUIKitPrebuiltCallService exists and has an 'init' function
      if (
        ZegoUIKitPrebuiltCallService &&
        typeof ZegoUIKitPrebuiltCallService.init === 'function'
      ) {
        ZegoUIKitPrebuiltCallService.init(
          KeyCenter.APPID, // Replace with your actual APPID
          KeyCenter.APPSIGN, // Replace with your actual APPSIGN
          '+201017616140', // Example user ID, replace with dynamic value if needed
          'sayed', // Example username, replace with dynamic value if needed
          [ZIM, ZPNs], // Plugins for ZIM and ZPNs
          {
            ringtoneConfig: {
              incomingCallFileName: 'zego_incoming.mp3',
              outgoingCallFileName: 'zego_outgoing.mp3',
            },
            androidNotificationConfig: {
              channelID: 'ZegoUIKit',
              channelName: 'ZegoUIKit',
            },
            notifyWhenAppRunningInBackgroundOrQuit: true,
          },
        );

        console.log('Zego call service initialized successfully');
      } else {
        console.error(
          'Initialization function not found on ZegoUIKitPrebuiltCallService.',
        );
      }
    } catch (error) {
      console.error('Error initializing Zego call service:', error);
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return {
    initializeCallService,
  };
};

export default useZegoCallService;

//[he error message Attempt to invoke virtual method "boolean java.lang.Boolean.booleanValue() on a null object reference" suggests that the Zego SDK is trying to access or modify a value that hasn't been initialized properly.]
