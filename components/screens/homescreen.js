import React, { useEffect, useState } from 'react';
import { StatusBar, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather'; // Assuming Feather icons set
import Categories from '../categroies/catgroies';
import axios from 'axios';
import Recipies from '../recipies/recipies';
import Animated, { FadeInDown, FadeIn, FadeInLeft } from 'react-native-reanimated';

export function HomeScreen() {
  const [activeCatogry, setActiveCategory] = useState("Beef")
  const [categories, setCategories] = useState([])
  const [meals, setMeals] = useState([])
  const [search, setSearch] = useState([])
  useEffect(() => {
    getCategories()
    getRecipes(activeCatogry)
  }, [])

  const handleCategories = async (category) => {
    setActiveCategory(category);
    setMeals([]);
    await getRecipes(category);
  };


  const getCategories = async () => {
    try {
      const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php");
      // console.log("getting categories", response)
      if (response && response.data) {
        setCategories(response.data.categories)
      }
    }
    catch (e) {
      console.log(e, "error getting categories")
    }
  }
  const getRecipes = async (category) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log(response.data);
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (e) {
      console.log(e, "error getting recipes");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <Animated.View entering={FadeInDown.duration(100).springify()} style={styles.header}>
          <Image onPress={() => NavigationPreloadManager.navigate("fav")} source={require("../../assets/looo.png")} style={styles.logo} />
          <Icon name="bell" size={hp(4)} color="grey" />
        </Animated.View>
        <Animated.View entering={FadeInLeft.duration(200).springify()} style={styles.greeting}>
          <Text style={styles.greetingText}>Hello Foody!!</Text>
          <Text style={styles.bigText}>Make your own Food,</Text>
          <Text style={styles.bigText}>stay at <Text style={styles.orangeText}>home</Text></Text>
        </Animated.View>

        <View style={styles.searchBarContainer}>
          <Text style={styles.descriptionText}>
            <Text style={styles.boldText}>Discover thousands of mouthwatering recipes</Text>
            {" "}from around the world with our{" "}
            <Text style={[styles.boldText, styles.orangeText]}>Food Recipe App</Text>
          </Text>
        </View>

        <View>
          {categories && categories.length > 0 && <Categories categories={categories} activeCatogry={activeCatogry} handleCategories={handleCategories} />}
        </View>
        <View>

          {<Recipies meals={meals} categories={categories} search={search} />}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    paddingBottom: hp(10), // Adjust as per your needs
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(3),
    width: "100%",
    padding: hp(3),
  },
  logo: {
    height: hp(4),
    width: wp(5),
  },
  greeting: {
    marginLeft: hp(1.5),
    padding: hp(1),
  },
  greetingText: {
    fontSize: hp(1.8),
    fontWeight: "bold",
  },
  bigText: {
    fontSize: hp(4),
    fontWeight: "bold",
  },
  orangeText: {
    color: "orange",
  },
  searchBarContainer: {
    alignItems: "center",
    marginTop: hp(3),
  },
  searchBar: {
    width: hp(49),
  },
  searchBarContainer: {
    alignItems: "center",
    marginTop: hp(3),
    paddingHorizontal: hp(2), // Add padding for better readability
  },
  descriptionText: {
    fontSize: hp(1.8),
    fontWeight: "500",
    textAlign: "center", // Center align for better presentation
    color: "#555", // Adjust color to match your theme
    lineHeight: hp(3), // Adjust line height for better spacing
  },
  boldText: {
    fontWeight: "bold",
    color: "#333", // Darken color for emphasis
  },
  orangeText: {
    color: "orange",
  },
});
