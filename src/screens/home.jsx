// import * as React from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {View, StyleSheet, Button} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import useZegoCallService from './serviceZego';

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const {initializeCallService} = useZegoCallService();
//   const [callId, setCallID] = React.useState('');

//   React.useEffect(() => {
//     setCallID(String(Math.floor(Math.random() * 10000)));
//   }, []);

//   const onJoinPress = () => {
//     initializeCallService();
//     navigation.navigate('CallScreen', {
//       userID: '+201555465611',
//       userName: 'mostafa',
//       callID: callId,
//     });
//   };

//   const insets = useSafeAreaInsets();

//   return (
//     <View
//       style={[
//         styles.container,
//         {paddingTop: insets.top, paddingBottom: insets.bottom},
//       ]}>
//       <View style={[styles.buttonLine, styles.leftPadding]}>
//         <Button
//           title="Start a Call"
//           style={styles.button}
//           onPress={onJoinPress}
//         />
//         <View style={styles.buttonSpacing} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//   },
//   buttonLine: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: 42,
//   },
//   buttonSpacing: {
//     width: 13,
//   },
//   button: {
//     height: 42,
//     borderRadius: 9,
//     backgroundColor: '#F4F7FB',
//   },
//   leftPadding: {
//     paddingLeft: 35,
//   },
// });

import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ZegoSendCallInvitationButton} from '@zegocloud/zego-uikit-prebuilt-call-rn';

import useZegoCallService from './serviceZego';

export default function HomeScreen() {
  const navigation = useNavigation();
  const {initializeCallService} = useZegoCallService();
  const [callId, setCallID] = React.useState('');

  React.useEffect(() => {
    setCallID(String(Math.floor(Math.random() * 10000)));
  }, []);

  const onJoinPress = () => {
    initializeCallService();
    navigation.navigate('CallScreen', {
      userID: '+201555465611',
      userName: 'mostafa',
      callID: callId,
    });
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={[styles.buttonLine, styles.leftPadding]}>
        <ZegoSendCallInvitationButton
          invitees={[{userID: '+201555465611', userName: 'mostafa'}]} // Provide invitee information
          isVideoCall={false} // Set to true if initiating a video call
          resourceID="zegouikit_call" // For offline call notification
          onPress={onJoinPress} // Call the function when the button is pressed
        />
        <View style={styles.buttonSpacing} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 42,
  },
  buttonSpacing: {
    width: 13,
  },
  leftPadding: {
    paddingLeft: 35,
  },
});
