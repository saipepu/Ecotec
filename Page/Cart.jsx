import React from 'react'
import HeaderNav from '../components/HeaderNav'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import color from '../theme/colors'
import t_menu1 from '../assets/trendingMenu/trendingMenu1.png'
import t_menu2 from '../assets/trendingMenu/trendingMenu2.png'
import t_menu3 from '../assets/trendingMenu/trendingMenu3.png'
import PrimaryButton from '../components/PrimaryButton'

const Cart = ({ navigation }) => {

  let cartList = [
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

  const Header = () => {
    return (
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
        <Text style={{ fontSize: 16 }}>2 items</Text>
      </View>
    )
  }

  const OrderList = ({ cartItem }) => {

    const RenderItem = ({ cartItem }) => {
      return (
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 12, borderBottomColor: '#CBCBCB', borderBottomWidth: 0.5 }}>
          <Text style={{ fontSize: 16 }}>1X</Text>
            <View style={{ width: 75, height: 75, overflow: 'hidden'}}>
              <Image source={cartItem.image} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
          <View style={{ maxHeight: '80%', gap: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{cartItem.name}</Text>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              {cartItem.ingredients.map((item, i) => (
                  <Text key={i} style={{ fontSize: 10, color: color.black, marginRight: 4}}>{item} .</Text>
                ))}
            </View>
          </View>
          <Text style={{ marginLeft: 'auto', fontSize: 16 }}>{cartItem.price} Baht</Text>
        </View>
      )
    }
    return (
      <View>
        {cartList.map((item, i) => {
          return (
            <RenderItem key={i} cartItem={item} />
          )
        })}
      </View>
    )
  }

  const BillDisplay = () => {

    return (
      <View style={{ width: '100%' }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: color.black }}>Subtotal</Text>
          <Text style={{ fontSize: 16, color: color.black }}>22 Baht</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: color.black }}>VAT 7%</Text>
          <Text style={{ fontSize: 16, color: color.black }}>1.5 Baht</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>23.5 Baht</Text>
        </View>
        <PrimaryButton text={'Checkout'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} backTo={'RestaurantMenu'} />
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 20 }}>
          <Header />
          <OrderList />
          <BillDisplay />
      </ScrollView>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 56,
    overflow: 'visible',
  },
})