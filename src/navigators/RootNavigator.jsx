import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useRef } from 'react';

import LoggedOutNavigator from 'src/navigators/LoggedOutNavigator';

let devMode = false;
devMode = true;

export default function RootNavigator(props) {
  const navigationRef = useRef();
  const routeNameRef = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          devMode && console.log(`\n\n\n📲 NAV\n  [FROM] ${previousRouteName}\n  [  TO] ${currentRouteName}\n_`);
        }

        routeNameRef.current = currentRouteName;
      }}
    >
      <LoggedOutNavigator />
    </NavigationContainer>
  );
}
