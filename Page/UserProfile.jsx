import React, { useContext, useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FooterNav from '../components/FooterNav'
import avatar from '../assets/avatar.png'
import color from '../theme/colors'
import PrimaryButton from '../components/PrimaryButton'
import AppStateContext from '../hook/AppStateContext'
import restaurant1 from '../assets/popularRestaurants/restaurant1.png'
import Icon from 'react-native-vector-icons/MaterialIcons'
import star from '../assets/star.png'
import task from '../assets/task.png'
import t_menu1 from '../assets/trendingMenu/trendingMenu1.png'
import t_menu2 from '../assets/trendingMenu/trendingMenu2.png'
import t_menu3 from '../assets/trendingMenu/trendingMenu3.png'
import { getOrderByCustomerId } from '../api/Order/GetOrderByCustomerId'
import { GetOrderItemByOrderId } from '../api/OrderItem/GetOrderItemByOrderId'
import { getAllMenu } from '../api/Menu/getAllMenu'

const UserProfile = ({ navigation }) => {

  const context = useContext(AppStateContext)
  const { contextCurrentUser } = context
  const [user, setUser] = useState()
  const [orderList, setOrderList] =  useState([])
  const [menuList, setMenuList] = useState([])

  useEffect(() => {
    setUser(contextCurrentUser)
  }, [contextCurrentUser])

  useEffect(() => {
    if(user) {
      getOrderByCustomerId(user?.id)
      .then(data => {
        if(data.success) {
          setOrderList(data.message)
        }
      })
      .catch(err => console.log(err))
      getAllMenu()
      .then(data => {
        if(data.success) {
          setMenuList(data.message)
        }
      })
      .catch(err => console.log(err))
    }
  }, [user])

  const Header = () => {
    return (
      <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 12}}>
        <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 12
          }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, overflow: 'hidden', borderRadius: 1000}}>
                <Image source={avatar} style={{ width: '100%', height: '100%' }}/>
              </View>
            </View>
            <View style={{ display: 'flex' }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 30}}>{user?.name}</Text>
            </View>
        </View>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <PrimaryButton navigation={navigation} props={'UserProfile'} text={'Add Friends'} styleConfig={{ flex: 1 }} />
          <PrimaryButton text={'Share'} />
        </View>
      </View>
    )
  }

  const Statistic = () => {

    return (
      <View style={{ width: '100%', gap: 8}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Stats</Text>
        <View style={{ width: '100%', gap: 8 }}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1, display: 'flex' , flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: 'white', borderRadius: 12, padding: 12, gap: 12 }}>
              {/* icon */}
              <View style={{ width: 32, height: 32, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'white', opacity: 0.5 }}>
                <Image source={star} style={{ width: '60%', height: '60%' , resizeMode: 'contain'}} />
              </View>
              {/* point */}
              <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{user?.points}</Text>
                <Text style={{ fontSize: 14, color: color.dark }}>Total Points</Text>
              </View>
            </View>

            <View style={{ flex: 1, display: 'flex' , flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: 'white', borderRadius: 12, padding: 12, gap: 12 }}>
              {/* icon */}
              <View style={{ width: 32, height: 32, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'white', opacity: 0.5 }}>
                <Image source={task} style={{ width: '60%', height: '60%' , resizeMode: 'contain'}} />
              </View>
              {/* point */}
              <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{user?.level?.toUpperCase()}</Text>
                <Text style={{ fontSize: 14, color: color.dark }}>Rank</Text>
              </View>
            </View>

          </View>
        </View>
      </View>
    )
  }

  const OrderList = () => {

    const [orderItemList, setOrderItemList] = useState([])
    const [selectOrder, setSelectOrder] = useState()

    useEffect(() => {
      var orderId = []
      orderList.map((order, i) => orderId.push(order.id))
      GetOrderItemByOrderId(orderId)
      .then(data => {
        if(data?.success) {
          setOrderItemList(data?.message)
        }
      })
    }, [orderList])

    const convertTimeForamt = (timestampString) => {
      const timestamp = new Date(timestampString);
      const day = String(timestamp.getDate()).padStart(2, '0');
      const month = String(timestamp.getMonth() + 1).padStart(2, '0'); // Month is 0-based
      const hours = String(timestamp.getHours()).padStart(2, '0');
      const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    
      return `${day}/${month} - ${hours}:${minutes}`;
    }

    const RenderItem = ({ cartItem, quantity }) => {
        return (
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 12, borderBottomColor: '#CBCBCB', borderBottomWidth: 0.5 }}>
            <Text style={{ fontSize: 16 }}>{quantity}X</Text>
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
      <View style={{ width: '100%', gap: 8}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Order Lists</Text>
        {orderList?.map((order, i) => {
          return (
            <View key={i} style={{ width: '100%', display: 'flex' }}>
              <TouchableOpacity 
                key={i} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'white', borderRadius: 8}}
                onPress={() => selectOrder == order.id ? setSelectOrder() : setSelectOrder(order.id)}
              >
                <Text style={{ fontSize: 16 }}>Order {i+1}</Text>
                <Text style={{ fontSize: 16 }}>{convertTimeForamt(order.created_at)}</Text>
              </TouchableOpacity>
              {selectOrder == order.id ? (
                <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 8 }}>
                  {orderItemList?.map((item, i) => (
                      item.order_id == order.id ? 
                        menuList.map((menu, i) => (
                          menu.id == item.menu_id ? (
                            <RenderItem key={i} cartItem={menu} quantity={item.quantity} />
                          ) : ""
                        ))
                      : (
                        ""
                      )
                  ))}
                </View>
              ) : ""}
            </View>
          )
        })}

      </View>
    )
  }

  return (
    <View style={{ width: '100%', height: '100%'}}>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Header />

          <View style={{ width: '100%', height: 0.5, backgroundColor: '#cbcbcb' }}></View>

          <Statistic />

          <View style={{ width: '100%', height: 0.5, backgroundColor: '#cbcbcb' }}></View>

          <OrderList />

      </ScrollView>
      <FooterNav navigation={navigation} profile={true} />

    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingTop: 56,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 24,
  },
})