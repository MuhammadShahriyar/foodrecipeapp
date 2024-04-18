import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native"

export function WelcomeScreen() {
  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)
  const Navigation = useNavigation()

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(() => { ring1padding.value = withSpring(ring1padding.value + hp(8)) }, 100)
    setTimeout(() => { ring2padding.value = withSpring(ring2padding.value + hp(7)) }, 100)

    setTimeout(() => { Navigation.navigate("home") }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Animated.View style={[styles.ring1, { padding: ring1padding }]}>
        <Animated.View style={[styles.ring2, { padding: ring2padding }]}>
          <Image source={require("../../assets/logo.png")} style={styles.logo}></Image>
        </Animated.View>
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foody</Text>
        <Text style={styles.subtitle}>Food is always right</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring1: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: hp(25),
  },
  ring2: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: hp(18),
  },
  logo: {
    height: hp(20),
    width: hp(20),
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(5),
  },
  title: {
    fontSize: hp(6),
    fontWeight: 'bold',
    color: "white",
    opacity: 0.9,
  },
  subtitle: {
    color: "white",
  },
});
