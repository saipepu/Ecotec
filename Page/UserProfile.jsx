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
import { DeleteOrderById } from '../api/Order/DeleteOrder'
import { UpdatePoints } from '../api/Customer/UpdatePoints'
import { getItemByCustomerId } from '../api/CustomerItem/getItemByCustomerId'
import { getAllItem } from '../api/Item/getAllItem'

const UserProfile = ({ navigation }) => {

  const context = useContext(AppStateContext)
  const { contextCurrentUser, setContextCurrentUser } = context
  const [showItem, setShowItem] = useState(false)
  const [user, setUser] = useState()
  const [itemList, setItemList] = useState([])
  const [customerItemList, setCustomerItemList] = useState([])
  
  useEffect(() => {
    setUser(contextCurrentUser)
    getItemByCustomerId(contextCurrentUser?.id)
    .then(data => {
      if(data.success) {
        setCustomerItemList(data.message)
      }
    })
    getAllItem()
    .then(data => {
      if(data.success) {
        setItemList(data.message)
      }
    })
  }, [contextCurrentUser])

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
              <Text style={{ fontSize: 24, fontWeight: 600, lineHeight: 30}}>{user?.name}</Text>
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

    const [orderList, setOrderList] =  useState([])
    const [menuList, setMenuList] = useState([])
    
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

    const handleDeleteOrder = (order) => {
      console.log('Deleting Order Id ', order?.id)
      var reducedPoints = -order?.total_points

      if(contextCurrentUser.points + reducedPoints >= 0) {
        DeleteOrderById(order?.id)
        .then(data => {
            if(data.success) {
              // update customer points -> reduce
              var points = { points: reducedPoints }
              var customer_id = contextCurrentUser?.id
              var formData = {
                customer_id: customer_id,
                points: points
              }
              UpdatePoints(formData)
              .then(data => {
                if(data.success) {
                  setContextCurrentUser({...contextCurrentUser, points: contextCurrentUser.points + reducedPoints })
                }
              })
              .catch(err => console.log(err))
  
              // update order list UI
              getOrderByCustomerId(user?.id)
              .then(data => {
                if(data.success) {
                  setOrderList(data.message)
                }
              })
              .catch(err => console.log(err))
  
            alert('Delete Order Successfully.', order_id)
          } else {
            console.log('Deleting Order Failed!', data)
          }
        })
        .catch(err => console.log(err, 198))
      } else {
        alert("Cannot delete order as you have already used up your points!")
      }
    }

    const RenderItem = ({ cartItem, quantity }) => {
        return (
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingBottom: 12, borderBottomColor: '#CBCBCB', borderBottomWidth: 0.5 }}>
            <Text style={{ fontSize: 16 }}>{quantity}X</Text>
              <View style={{ width: 75, height: 75, overflow: 'hidden'}}>
                <Image source={t_menu1} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
              </View>
            <View style={{ flex: 1, maxWidth: '80%', gap: 4, flexWrap: 'wrap'}}>
              <Text style={{ maxWidth: '80%', fontSize: 16, fontWeight: 'bold', flexWrap: 'wrap' }}>{cartItem.name}</Text>
            </View>
            <View style={{ display: 'flex' }}>
              <Text style={{ marginLeft: 'auto', fontSize: 16 }}>{cartItem.price} Baht</Text>
              <Text style={{ marginLeft: 'auto', fontSize: 16 }}>{cartItem.points} Points</Text>
            </View>
          </View>
        )
    }

    return (
      <View style={{ width: '100%', gap: 8}}>
        {orderList && orderList?.map((order, i) => {
          return (
            <View key={i} style={{ width: '100%', display: 'flex' }}>
              <TouchableOpacity 
                key={i} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: 'white', borderRadius: 8}}
                onPress={() => selectOrder == order.id ? setSelectOrder() : setSelectOrder(order.id)}
              >
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 12 }}>
                  <Text style={{ fontSize: 16 }}>Order {order.id}</Text>
                  <Text style={{ fontSize: 16 }}>{convertTimeForamt(order.created_at)}</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteOrder(order)}>
                  <Icon name={'delete'} size={18} color="gray" style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
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

  const ItemContainer = () => {

    const RenderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ width: '100%', display: 'flex', backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', shadowColor: '#00000050', shadowOffset: {width: 0, height: 10}, shadowOpacity: 1, shadowRadius: 10 }}
          onPress={() => {}}>
          <View style={{ width: '100%', height: 120, display: 'flex' }}>
            <Image source={{ uri: item?.image }} style={{ width: '100%', height: '100%', resizeMode: 'cover'}} />
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12}}>
            <View style={{ display: 'flex', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item?.name}</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Icon size={14} name="star" color={color.primary}/>
                <Text style={{ fontSize: 10, color: color.black }}>{item?.cost}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ width: '100%', display: 'flex', gap: 12}}>
        <View>
        </View>
        {itemList?.map((item, i) => 
          customerItemList?.map((citem, i) => citem.item_id == item.id ? (
              <RenderItem item={item} key={i} />
          ) : ( <></> ) )
        )}
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

          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 4, borderRadius: 5, gap: 12, backgroundColor: '#eeeeee'}}>
            <TouchableOpacity 
              onPress={() => setShowItem(false)}
              style={{ flex: 1, backgroundColor: showItem ? '#eeeeee': 'white', paddingVertical: 4, borderRadius: 5, overflow: 'hidden' }}><Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Order List</Text></TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowItem(true)}
              style={{ flex: 1, backgroundColor: showItem ? 'white': '#eeeeee', paddingVertical: 4, borderRadius: 5, overflow: 'hidden' }}><Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>Item List</Text></TouchableOpacity>
          </View>

          {showItem ? (
              <ItemContainer />
            ) : (
              <OrderList />
          )}

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