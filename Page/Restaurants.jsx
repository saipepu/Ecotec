import React, { useContext, useEffect, useState } from 'react'
import { AppState, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderNav from '../components/HeaderNav'
import t_menu1 from '../assets/trendingMenu/trendingMenu1.png'
import t_menu2 from '../assets/trendingMenu/trendingMenu2.png'
import t_menu3 from '../assets/trendingMenu/trendingMenu3.png'
import restaurant1 from '../assets/popularRestaurants/restaurant1.png'
import restaurant2 from '../assets/popularRestaurants/restaurant2.png'
import color from '../theme/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppStateContext from '../hook/AppStateContext'
import { getAllRestaurants } from '../api/Restaurants/getAllRestaurants'

const Restaurants = ({ navigation }) => {

  const [text, onChangeText] = useState('')
  const [restaurantLists, setRestaurantLists] = useState([])
  const context = useContext(AppStateContext)

  let trendingMenu = [
    {
      name: 'Vegan Quesadillas',
      ingredients: ['cheese','bean','salad'],
      price: 10,
      point: 25,
      image: t_menu1
    }, // asdfasdfasdf
    {
      name: 'Sweetgreen',
      ingredients: ['apple','potato','salad'],
      price: 12,
      point: 25,
      image: t_menu2
    },
    {
      name: 'Vegan Sandwich',
      ingredients: ['bread','potato','salad'],
      price: 15,
      point: 9.5,
      image: t_menu3
    },
  ]
  let menuCategories = [
    {
      icon: '🍰',
      name: 'Dessert'
    },
    {
      icon: '🍛',
      name: 'Meal'
    },
    {
      icon: '🥝',
      name: 'Fruit'
    },
    {
      icon: '🍹',
      name: 'Juice'
    },
    {
      icon: '🍜',
      name: 'Noodle'
    },

  ]
  let popularRestaurants = [
    {
      name: 'Vengish',
      location: 'pavia, 27st, Franci',
      openingTime: '6:30am - 9:00pm',
      image: restaurant1
    },
    {
      name: 'Vengish',
      location: 'pavia, 27st, Franci',
      openingTime: '6:30am - 9:00pm',
      image: restaurant2
    }
  ]

  useEffect(() => {
    getAllRestaurants()
    .then(data => {
      if(data.success) {
        setRestaurantLists(data.message)
      }
    })
  }, [])

  const Trendings = () => {

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ width: 130, borderRadius: 12, borderColor: '#cbcbcb', borderWidth: 1, display: 'flex', alignItems: 'center' }}
        >
          <View style={{ width: '100%', height: 75, paddingBottom: 8 }}>
            <Image source={item.image} style={{ width: '100%', height: '100%', resizeMode: 'contain'}}/>
          </View>
          <View style={{ width: '80%', height: 0.5, backgroundColor: color.black }}></View>
          <View style={{ width: '100%', height: 100, display: 'flex', padding: 8 }}>
            <Text style={{ minHeight: 38, fontSize: 16, fontWeight: '500', flexWrap: 'wrap' }}>{item.name}</Text>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              {item.ingredients.map((item, i) => (
                <Text key={i} style={{ fontSize: 10, color: color.black, marginRight: 4}}>{item} .</Text>
              ))}
            </View>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
              <Text style={{ fontSize: 14 }}>{item.price} Baht</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ fontSize: 14 }}>+{item.point}</Text>
                <Icon name="stars" size={15} color={color.primary}/>
              </View>
            </View>
          </View>
        </TouchableOpacity> ///a asdfasdfa
      )
    }

    return (
      <View style={{ width: '100%', display: 'flex', gap: 8, overflow: 'visible'}}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Trendings</Text>
        </View>
        <FlatList
          data={trendingMenu}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => `${item.name}`}
          contentContainerStyle={{ gap: 12 }}
          style={{ overflow: 'visible' }}
        />
      </View>
    )
  }

  const Categories = () => {

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={{ width: 55, height: 55 }}>
          <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, padding: 4, borderRadius: 12, backgroundColor: color.secondary}}>
            <Text style={{ fontSize: 18 }}>{item.icon}</Text>
            <Text style={{ fontSize: 10, color: color.black}}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ width: '100%', display: 'flex', gap: 8}}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Categories</Text>
        </View>
        <FlatList
          data={menuCategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => `${item.name}`}
          contentContainerStyle={{ gap: 8 }}
          style={{ overflow: 'visible' }}
        />
      </View>
    )
  }

  const PopularRestaurants = () => {

    const RenderItem = ({ restaurant }) => {

      return (
        <TouchableOpacity 
          style={{ width: '100%', display: 'flex', backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', shadowColor: '#00000050', shadowOffset: {width: 0, height: 10}, shadowOpacity: 1, shadowRadius: 10 }}
          onPress={() => {
            context.updateContextRestaurant(restaurant)
            navigation.navigate('RestaurantMenu')
          }}>
          <View style={{ width: '100%', height: 120, display: 'flex' }}>
            <Image source={restaurant1} style={{ width: '100%', height: '100%', resizeMode: 'cover'}} />
          </View>
          <View style={{ width: '100%', display: 'flex', padding: 8}}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{restaurant?.name}</Text>
              <Text style={{ fontSize: 10, color: color.black }}>{restaurant?.schedule}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <Icon size={14} name="location-on" color={color.primary}/>
              <Text style={{ fontSize: 10, color: color.black }}>{restaurant?.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ width: '100%', display: 'flex', gap: 8}}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Popular Restarants</Text>
        </View>
        {restaurantLists.map((restaurant, i) => (
          <RenderItem restaurant={restaurant} key={i} />
        )
        )}
      </View>
    )
  }

  return (
    <View style={{ width: '100%', height: '100%', paddingTop: 56 }}>
      <HeaderNav backTo={'Home'} navigation={navigation}/>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* <Header /> */}
        <View style={{ width: '100%', display: 'flex', gap: 8}} onClick={() => console.log(text)}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Plant-Powered</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Nourish Restaurants</Text>
          </View>
          <View style={{ width: '100%' }}>
            <TextInput onChangeText={onChangeText} value={text}  style={{ width: '100%', fontSize: 18, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'black' }} placeholder='Search'/>
          </View>
        </View>
        {/* <Trendings /> */}
        {/* <Categories /> */}
        <PopularRestaurants />
      </ScrollView>
    </View>
  )
}

export default Restaurants

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    overflow: 'visible',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 100
  },
})