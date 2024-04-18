import { Text, StyleSheet, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Loading } from './loding';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';


export function DetailScreen({ route }) {
    const { recipe } = route.params;
    const [isFavrioute, setFaveriout] = useState(false)
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)
    const [Fav,setFav]=useState("")

    const Navigations = useNavigation()
    useEffect(() => {
        getMealsData(recipe.idMeal)
    }, [])


    const getMealsData = async (id) => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            console.log("getting detail", response.data)
            if (response && response.data) {
                setMeal(response.data.meals[0])
                setLoading(false)
            }
        }
        catch (e) {
            console.log(e, "error getting categories")
            // setLoading(false)
        }
    }
    console.log(recipe)

    const ingriedientsIndexes = () => {
        if (!meal) return []
        let indexes = []
        for (let i = 1; i <= 20; i++) {
            if (meal["strIngredient" + i]) {
                indexes.push(i)
            }
        }
        return indexes;
    }
    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex)
        if (match && match[1]) {
            return match[1];
        }
        console.log("YouTube Video URL:", meal.strYoutube);

        return null;
    };

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 25 }}
        >

            <View style={styles.imageCon}>
                <Image source={{ uri: recipe.strMealThumb }} style={styles.image} sharedTranstionTag={recipe.strMeal} />
            </View>

            <Animated.View entering={FadeIn.delay(200).duration(1000)} style={styles.iconContainer}>
                <TouchableOpacity style={styles.icon} onPress={() => Navigations.navigate("home")}>
                    <Icon name="chevron-left" size={hp(4)} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon} onPress={() => setFaveriout(!isFavrioute)}>
                    <Icon name="heart" size={hp(4)} color={isFavrioute ? "red" : "grey"} onPress={()=>setFav(recipe.idMeal)} />
                </TouchableOpacity>
            </Animated.View>
            <View>

                {loading ? (<Loading size="large" style={{ marginTop: hp(2) }} />) : (
                    <>
                        <View style={styles.maintitleView}>
                            <Animated.View entering={FadeInDown.duration(750).springify().damping(12)}>
                                <View>
                                    <Text style={{ fontSize: hp(3.5), fontWeight: 'bold' }}>{meal?.strMeal}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: hp(2.5) }}>{meal?.strArea}</Text>
                                </View>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(100).duration(600).springify().damping(12)} style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "row", padding: hp(2) }}>
                                <View style={{ display: "flex", flexDirection: 'column', backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 25, padding: hp(1) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", height: hp(5), width: hp(5), borderRadius: 55 }}>
                                        <Icon name="clock-o" size={hp(4)} color="black" />
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            30
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            mint
                                        </Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: 'column', backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 25, padding: hp(1) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", height: hp(5), width: hp(5), borderRadius: 55 }}>
                                        <Icon name="user" size={hp(4)} color="black" />
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            03
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            serve
                                        </Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: 'column', backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 25, padding: hp(1) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", height: hp(5), width: hp(5), borderRadius: 55, overflow: "hidden" }}>
                                        <Icon name="fire" size={hp(4)} color="black" />
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            130
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            cal
                                        </Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>
                                <View style={{ display: "flex", flexDirection: 'column', backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 25, padding: hp(1) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "white", height: hp(5), width: hp(5), borderRadius: 55 }}>
                                        <Icon name="cube" size={hp(4)} color="black" />
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{ fontWeight: "bold" }}>
                                            30
                                        </Text>
                                        <Text style={{ fontWeight: "bold" }}>
                                            Easy
                                        </Text>
                                    </View>
                                    <View>

                                    </View>
                                </View>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(200).duration(600).springify().damping(12)} style={{ marginVertical: hp(2) }}>
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold', marginBottom: hp(2) }}>
                                    Ingredients
                                </Text>
                                <View>
                                    {ingriedientsIndexes(meal).map(i => (
                                        <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: hp(1.5) }}>
                                            <View style={styles.dot} />
                                            <Text style={styles.ingredientText}>
                                                {meal["strMeasure" + i]} {meal["strIngredient" + i]}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(300).duration(600).springify().damping(12)} >
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold', marginBottom: hp(2) }}>
                                    Instructions
                                </Text>
                                <Text style={{ fontSize: hp(2) }}>
                                    {
                                        meal?.strInstructions
                                    }
                                </Text>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(400).duration(600).springify().damping(12)} >
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold', marginBottom: hp(2) }}>
                                    Recipe Video
                                </Text>
                                <View >
                                    <WebView

                                        allowsFullscreenVideo
                                        source={{ uri: `https://www.youtube.com/embed/${getYoutubeVideoId(meal.strYoutube)}` }}
                                        style={{ height: hp(30),marginRight:hp(1.5)}}
                                    />
                                </View>

                            </Animated.View>


                        </View>


                    </>
                )

                }
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    imageCon: {
        alignItems: 'center'
    },
    image: {
        width: wp(98),
        height: hp(50),
        borderRadius: 52
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp(5), // Padding added to space the icons from the screen edges
        marginTop: hp(2),
        position: "absolute",
        width: wp(100)

    },
    icon: {
        backgroundColor: "white",
        padding: hp(1),
        borderRadius: 80,
        paddingLeft: hp(1),
        textAlign: "center"
    },
    maintitleView: {
        display: "flex",
        marginTop: hp(4),
        marginLeft: hp(2),
    },
    ingredientItem: {
        backgroundColor: "#F5F5F5",
        padding: hp(1),
        marginVertical: hp(1),
        borderRadius: 10,
    },
    ingredientText: {
        fontSize: hp(2),
        fontWeight: "bold",
    },
    dot: {
        backgroundColor: 'orange',
        width: hp(1),
        height: hp(1),
        borderRadius: hp(1),
        marginRight: hp(1),
    },


})
