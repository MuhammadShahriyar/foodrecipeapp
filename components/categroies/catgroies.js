import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated,{ FadeInDown} from 'react-native-reanimated';

export default function Categories({ categories,activeCatogry, handleCategories }) {


    return (
        <>
            <Animated.View entering={FadeInDown.duration(500).springify()}>
                <Text style={{ textAlign: "right", position: "relative", right: hp(1), top: hp(2) }}>See more</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    {
                        categories.map((cat, index) => {

                            let isActive = cat.strCategory === activeCatogry;
                            let activeClassbutton = isActive ? "orange" : "transparent"
                            return (

                                <TouchableOpacity key={index}
                                    onPress={() => handleCategories(cat.strCategory)}
                                >

                                    <View style={{ marginTop: hp(2), padding: hp(0.5), }}>

                                        <View style={{display:"flex",justifyContent:"center",alignItems:"center", borderRadius: hp(18),backgroundColor: activeClassbutton, overflow: 'hidden', height: hp(10), width: hp(10)}}>
                                        <Image style={{ height: hp(6), width: hp(10) }} source={{uri:cat.strCategoryThumb}} />
                                        </View>
                                        <View>
                                            <Text style={{ textAlign: "center", fontSize: hp(1.5) }}>{cat.strCategory}</Text>
                                        </View>

                                    </View>

                                </TouchableOpacity>

                            )
                        })
                    }
                </ScrollView>
            </Animated.View>

        </>
    );
}