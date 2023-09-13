import React, { useContext, useEffect, useState } from 'react'
import HeaderNav from '../components/HeaderNav'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import color from '../theme/colors'
import t_menu1 from '../assets/trendingMenu/trendingMenu1.png'
import t_menu2 from '../assets/trendingMenu/trendingMenu2.png'
import t_menu3 from '../assets/trendingMenu/trendingMenu3.png'
import PrimaryButton from '../components/PrimaryButton'
import AppStateContext from '../hook/AppStateContext'
import { createOrder } from '../api/Order/CreateOrder'
import { createOrderItem } from '../api/OrderItem/createOrderItem'

const Cart = ({ navigation }) => {

  const context = useContext(AppStateContext)
  const [total, setTotal] = useState()
  const [point, setPoint] = useState()
  const { contextCurrentUser, contextCart, setContextCart } = context
  const [loading, setLoading] = useState(false)
  const [cartList, setCartList] = useState([])

  let sum = 0
  let p = 0

  useEffect(() => {
    console.log('hi')
    let arr = []
    for(var item in contextCart) {
      arr.push(contextCart[item]);
      sum += contextCart[item].quantity * contextCart[item].price
      p += contextCart[item].quantity * contextCart[item].points
    }
    setCartList(arr)
  }, [contextCart])
  console.log(contextCart)
  console.log(cartList)
  
  useEffect(() => {
    setTotal(sum)
    setPoint(p)
  }, [sum, p])

  const Header = () => {
    return (
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
        <Text style={{ fontSize: 16 }}>{cartList.length} items</Text>
      </View>
    )
  }

  const OrderList = ({ cartItem }) => {

    const RenderItem = ({ cartItem }) => {
      return (
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 12, borderBottomColor: '#CBCBCB', borderBottomWidth: 0.5 }}>
          <Text style={{ fontSize: 16 }}>{cartItem.quantity}X</Text>
            <View style={{ width: 75, height: 75, overflow: 'hidden'}}>
              <Image source={t_menu1} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </View>
          <View style={{ maxWidth: '80%', gap: 4, flexWrap: 'wrap'}}>
            <Text style={{ maxWidth: '80%', fontSize: 16, fontWeight: 'bold', flexWrap: 'wrap' }}>{cartItem.name}</Text>
          </View>
          <Text style={{ marginLeft: 'auto', fontSize: 16 }}>{cartItem.price} Baht</Text>
        </View>
      )
    }
    return (
      <View>
        {cartList.map((item, i) => {
          return <RenderItem key={i} cartItem={item} />
        })}
      </View>
    )
  }

  const BillDisplay = () => {

    const handleCheckOut = () => {
      console.log('Checkout')
      var total_amount = total
      var total_points = point
      var customer_id = contextCurrentUser?.id
      setLoading(true)

      createOrder({total_amount, total_points, customer_id})
      .then(data => {
        if(data.success) {
          createOrderItem(cartList, data.message.rows[0].id)
          .then(data => {
            if(data.success) {
              console.log(data.message, 'created all items')
            } else {
              console.log(data.message, 'error')
            }
          })
          console.log('Order Created Successfully')
          setContextCart({})
          setTotal(0)
          setPoint(0)
          alert('Order Created Successfully. Check Your Profile to Edit Your Order!')
        } else {
          alert('Order Creating Failed. Please try again!')
          console.log('Order creation failed')
        }
      })
      .catch(err => err)

      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    return (
      <View style={{ width: '100%' }}>
      {cartList.length > 0 ? (
          <>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: color.black }}>Subtotal</Text>
              <Text style={{ fontSize: 16, color: color.black }}>{total} Baht</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{total} Baht</Text>
            </View>
            <TouchableOpacity
              style={{ ...styles.button, opacity: loading ? 0.5 : 1 }}
              onPress={() => handleCheckOut()}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>{loading ? "Please Wait" : "Checkout"}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={{ fontSize: 18, textAlign: 'center' }}>No Item selected</Text>
        )}

        </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderNav navigation={navigation} backTo={'RestaurantMenu'} left={false} />
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
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: color.primary,
    shadowOffset: {width: 0, height: 5},  
    shadowColor: color.shadowGreen,  
    shadowOpacity: 1,
    shadowRadius: 0,
  }
})