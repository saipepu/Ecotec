import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import HeaderNav from '../components/HeaderNav'
import Icon from 'react-native-vector-icons/MaterialIcons'
import color from '../theme/colors'
import t_menu1 from '../assets/trendingMenu/trendingMenu1.png'
import t_menu2 from '../assets/trendingMenu/trendingMenu2.png'
import t_menu3 from '../assets/trendingMenu/trendingMenu3.png'
import AppStateContext from '../hook/AppStateContext'
import { getAllCategory } from '../api/Category/getAllCategory'
import { getAllMenu } from '../api/Menu/getAllMenu'
import { getMenuByRestaurant } from '../api/Menu/getMenuByRestaurant'

const RestaurantMenu = ({ navigation }) => {

  const [searchValue, setSearchValue] = useState('')
  const context = useContext(AppStateContext)
  const [restaurant, setRestaurant] = useState(context.contextRestaurant)
  const [categoryList, setCategoryList] = useState([])
  const [menu, setMenu] = useState([])
  const { contextRole } = context
  console.log(restaurant)

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
  let trendingMenu = [
    {
      name: 'Vegan Quesadillas',
      ingredients: ['cheese','bean','salad'],
      price: 10,
      point: 25,
      image: t_menu1
    },
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

  useEffect(() => {
    Promise.all([
      getAllCategory(), getMenuByRestaurant(restaurant?.id),
    ])
    .then(([categoryData, menuData]) => {
      if(categoryData.success) {
        setCategoryList(categoryData.message)
      } else {
        console.log('fetch category error')
      }
      if(menuData.success) {
        setMenu(menuData.message)
      } else {
        console.log('fetch menu error')
      }
    })
  }, [])
  
  const Header = () => {
    return (
      <View style={{ width: '100%', display: 'flex', gap: 8}}>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{restaurant.name}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <Icon size={14} name="location-on" color={color.primary}/>
              <Text style={{ fontSize: 10, color: color.black }}>{restaurant.location}</Text>
          </View>
        </View>
        <View style={{ width: '100%' }}>
          <TextInput value={searchValue} onChangeText={newValue => setSearchValue(newValue)} style={{ width: '100%', fontSize: 18, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'black' }} placeholder='Search'/>
        </View>
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
          data={categoryList}
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

  const TopChoices = () => {

    const {contextCart, setContextCart} = context
    const addToCart = (menu) => {
      console.log(menu.id, '139')
      if(menu.id in contextCart) {
        contextCart[menu.id].quantity = contextCart[menu.id].quantity + 1
        setContextCart(contextCart)
      } else {
        contextCart[menu.id] = {...menu, quantity: 1}
        setContextCart(contextCart)
      }
    }

    const RenderItem = ({ menu }) => {
      return (
        <TouchableOpacity
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',borderWidth: 1, borderColor: '#dbdbdb', borderRadius: 15, paddingHorizontal: 12, paddingVertical: 8, gap: 12 }}
        >
          <View style={{ width: 75, height: 75, overflow: 'hidden'}}>
            <Image source={t_menu1} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
          </View>
          <View style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignContent: 'flex-start'}}>
            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ maxHeight: '80%', gap: 4 }}>
                <Text style={{ maxWidth: '90%', fontSize: 16, fontWeight: 'bold' }}>{menu.name}</Text>
                {/* <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  {menu.ingredients.map((item, i) => (
                      <Text key={i} style={{ fontSize: 10, color: color.black, marginRight: 4}}>{item} .</Text>
                    ))}
                </View> */}
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2}}>
                <Text style={{ fontSize: 16 }}>+{menu.points}</Text>
                <Icon name="stars" size={12} color={color.primary} />
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ fontSize: 16 }}>{menu.price} Baht</Text>
              {contextRole == 'Customer' ? (
                <TouchableOpacity
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: color.primary, paddingHorizontal: 8, paddingVertical: 4, gap: 4}}
                  onPress={() => addToCart(menu)}
                >
                  <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>Add</Text>
                  <Icon name="add" size={12} color={'white'} />
                </TouchableOpacity>
              ) : (
                <></>
              )}
                <></>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={{ width: '100%', display: 'flex', gap: 8}}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Top Choices</Text>
        </View>
        {menu.map((menu, i) => (
          <RenderItem menu={menu} key={i} />
        )
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} backTo={'Restaurants'} forwardTo={'Cart'} />
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}>
        <Header />
        <Categories />
        <TopChoices />
      </ScrollView>
    </View>
  )
}

export default RestaurantMenu

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 56,
    overflow: 'visible',
  },
})