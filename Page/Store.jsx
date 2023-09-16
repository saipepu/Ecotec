import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../theme/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FooterNav from '../components/FooterNav'
import { getAllItem } from '../api/Item/getAllItem'

const Store = ({ navigation }) => {

  const [itemList, setItemList] = useState([])

  useEffect(() => {
    getAllItem()
    .then(data => {
      if(data?.success) {
        console.log('Getting Store Item Success!')
        setItemList(data?.message)
      }
    })
    .catch(err => console.log('Getting Store Item Failed!'))
  }, [])

  // let itemList = [
  //   {
  //     name: 'item1',
  //     cost: 100,
  //     image: 'https://i.pinimg.com/564x/31/32/59/3132590699d2763ea2a9071b5f5f45ed.jpg'
  //   },
  //   {
  //     name: 'item2',
  //     cost: 130,
  //     image: 'https://i.pinimg.com/564x/74/4a/a0/744aa0ea6e1223f1ca0269a185e01686.jpg'
  //   },
  //   {
  //     name: 'item3',
  //     cost: 200,
  //     image: 'https://i.pinimg.com/564x/be/65/75/be657503a405488fd208f87f3a327bc3.jpg'
  //   },
  //   {
  //     name: 'item4',
  //     cost: 30,
  //     image: 'https://i.pinimg.com/564x/d7/e1/0d/d7e10d4510aab9d28d9584532fcc81fd.jpg'
  //   },
  // ]

  const Header = () => {
    return (
      <View style={{ width: '100%' }}>
        <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Store</Text>
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
            <View style={{ display: 'flex' }}>
              <TouchableOpacity
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: color.primary, paddingHorizontal: 8, paddingVertical: 4, gap: 4}}
                  onPress={() => {}}
                >
                  <Text style={{ fontSize: 12, color: 'white', fontWeight: '400' }}>Buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{ width: '100%', display: 'flex', gap: 12}}>
        <View>
        </View>
        {itemList?.map((item, i) => (
          <RenderItem item={item} key={i} />
        )
        )}
      </View>
    )
  }

  return (
    <View style={{ width: '100%', height: '100%', paddingTop: 56 }}>
      <Header />
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        <ItemContainer />

      </ScrollView>
      <FooterNav navigation={navigation} profile={true} />
    </View>
  )
}

export default Store

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 24,
  },
})