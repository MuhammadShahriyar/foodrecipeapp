import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import MasonryList from "@react-native-seoul/masonry-list";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Loading } from '../screens/loding'; // Corrected the file name
import { useNavigation } from '@react-navigation/native';

export default function Recipes({ categories, meals, search }) {
    const Navigation = useNavigation()
 
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recipes</Text>
            {(!categories || !meals || categories.length === 0 || meals.length === 0) ? (
                <Loading size="large" />
            ) : (
                <MasonryList
                    data={meals}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <RecipesCard item={item} index={index} Navigation={Navigation} />}
                />
            )}
        </View>
    );
}

const RecipesCard = ({ item, index, Navigation }) => {
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable onPress={() => Navigation.navigate("detailScreen", { recipe: item })} >
                <View style={styles.card}>
                    <Image source={{ uri: item.strMealThumb }} style={{
                        width: '100%',
                        borderRadius: 30,
                        height: index % 3 == 0 ? hp(15) : hp(30),
                    }} sharedTranstionTag={item.strMeal} />
                    <Text style={styles.name}>{item.strMeal}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: hp(2),
        paddingHorizontal: wp(2),
    },
    title: {
        fontSize: hp(3),
        fontWeight: 'bold',
        marginBottom: hp(2),
        marginLeft: hp(1.2),
    },
    card: {
        gap: 5,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginBottom: hp(2),
        padding: 5,
    },
    name: {
        fontSize: hp(2),
        padding: hp(1),
        fontWeight: "500",
    },
});
