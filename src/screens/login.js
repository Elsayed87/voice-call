import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getFirstInstallTime} from 'react-native-device-info';
import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';

const LoginScreen = () => {
  const navigation = useNavigation();

  const onUserLogin = async (userID, userName) => {
    return ZegoUIKitPrebuiltCallService.init(
      1371578460,
      '286fea7a2965cb5380049b8237cd3f2c9b3778df64c5b57f904d17ef00a79855',
      userID,
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      }
    );
  };

  const loginHandler = () => {
    const userID = '1000';
    const userName = 'sayed';

    onUserLogin(userID, userName).then(() => {
      navigation.navigate('HomeScreen');
    });
  };

  useEffect(() => {
    // Pre-setting user ID and userName to display in the login screen
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}>
        <Text>appID: {1371578460}</Text>
        <Text>userID: {'1000'}</Text>
        <Text>userName: {'sayed'}</Text>
      </View>
      <View style={{width: 160}}>
        <Button title="Login" onPress={loginHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
});

export default LoginScreen;
