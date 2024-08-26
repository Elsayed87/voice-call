import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet, PermissionsAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ZegoUIKitPrebuiltCall } from '@zegocloud/zego-uikit-prebuilt-call-rn';
import KeyCenter from '../constant/eunms';
import useZegoCallService from './serviceZego';

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      return (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true; // For iOS or if permissions are already granted
};

const CallScreen = () => {
  const [permissionsChecked, setPermissionsChecked] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { userID = 'defaultID', userName = 'defaultName', callID = 'defaultCallID' } = route.params || {};
  const { initializeCallService } = useZegoCallService();

  useEffect(() => {
    initializeCallService();
  }, [initializeCallService]);
  useEffect(() => {
    const initialize = async () => {
      const permissionsGranted = await requestPermissions();
      if (permissionsGranted) {
        console.log('Permissions granted');
        setPermissionsChecked(true);
      } else {
        console.error('Permissions not granted');
      }
    };
    initialize();
  }, [userID, userName, callID]);

  if (!permissionsChecked) {
    return (
      <View style={styles.container}>
        <Text>Checking permissions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={KeyCenter.APPID}
        appSign={KeyCenter.APPSIGN}
        userID={userID}
        userName={userName}
        callID={callID}
        config={{
          onHangUp: () => {
            console.log('Hang up called');
            navigation.goBack();
          },
          onError: (error) => {
            console.error('ZegoUIKitPrebuiltCall Error:', error);
          },
          onCameraStatusChanged: (status) => {
            console.log('Camera Status Changed:', status);
          },
          onMicStatusChanged: (status) => {
            console.log('Microphone Status Changed:', status);
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default CallScreen;

