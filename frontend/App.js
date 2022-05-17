// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import SliderScreen from './screens/Slider';
import HomeScreen from './screens/Home';
import DoctorsScreen from './screens/Doctors';
import SignUpScreens from './screens/SignUp';
import SignInScreen from './screens/SignIn';
import ProfileScreen from './screens/Profile';


const Stack = createNativeStackNavigator();

function App() {

  /*
    Fonts
  */
  const  [loaded] = useFonts({
    SSTFonts: require('./assets/fonts/SST-Arabic-Medium.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            textAlign: 'right',
            fontFamily: 'SSTFonts',
          },
        }}
      >
        <Stack.Screen 
          name="Slider" 
          component={SliderScreen}  
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen}  
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Doctors" 
          component={DoctorsScreen} 
          options={{title: 'الاطباء' }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreens} 
          options={{title: 'حساب جديد' }}
        />
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen} 
          options={{title: 'تسجيل دخول' }}
        />

        <Stack.Screen
          name="Profile"
          options={{
            title: 'الملف الشخصي',
          }}
          component={ProfileScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;