import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import 'react-native-gesture-handle';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator}from "@react-navigation/stack"
import { HomeScreen } from '../screens/homescreen';
import { WelcomeScreen } from '../screens/welcomescreen';
import { DetailScreen } from '../screens/recipescreendetail';
import FavList from '../favlist/favlist';

export default function Navigation() {
    const Stack  = createStackNavigator()
    return (
        <>
          <NavigationContainer>
                <Stack.Navigator initialRouteName='welcome' screenOptions={{headerShown:false}}>
                <Stack.Screen  name='home' component={HomeScreen}/>
                <Stack.Screen  name='welcome' component={WelcomeScreen}/>
                <Stack.Screen  name='detailScreen' component={DetailScreen}/>
                <Stack.Screen  name='fav' component={FavList}/>

                </Stack.Navigator>
          </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
