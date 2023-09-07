import React, { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FooterNav from '../components/FooterNav'
import avatar from '../assets/ChiefAvatar.png'
import color from '../theme/colors'
import PrimaryButton from '../components/PrimaryButton'
import AppStateContext from '../hook/AppStateContext'
import restaurant1 from '../assets/popularRestaurants/restaurant1.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ChiefProfile = ({ navigation }) => {

  let restaurant = {
    name: 'Vengish',
    location: 'pavia, 27st, Franci',
    openingTime: '6:30am - 9:00pm',
    image: restaurant1
  }

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
              <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 30}}>Example Chef</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20}}>
                <Text style={{ fontSize: 16, color: color.black }}>20 Follwers</Text>
                <Text style={{ fontSize: 16, color: color.black }}>10 Following</Text>
              </View>
            </View>
        </View>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <PrimaryButton navigation={navigation} props={'CreateMenu'} text={'Create New Menu'} styleConfig={{ flex: 1 }} />
          <PrimaryButton text={'Share'} />
        </View>
      </View>
    )
  }

  const Restaurant = () => {

    return (
      <TouchableOpacity
          style={{ width: '100%', display: 'flex', backgroundColor: 'white', borderRadius: 12, overflow: 'hidden', shadowColor: '#00000050', shadowOffset: {width: 0, height: 10}, shadowOpacity: 1, shadowRadius: 10 }}
      >
          <View style={{ width: '100%', height: 120, display: 'flex' }}>
            <Image source={restaurant.image} style={{ width: '100%', height: '100%', resizeMode: 'cover'}} />
          </View>
          <View style={{ width: '100%', display: 'flex', padding: 8}}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{restaurant.name}</Text>
              <Text style={{ fontSize: 10, color: color.black }}>{restaurant.openingTime}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
              <Icon size={14} name="location-on" color={color.primary}/>
              <Text style={{ fontSize: 10, color: color.black }}>{restaurant.location}</Text>
            </View>
          </View>
        </TouchableOpacity>
    )
  }

  return (
    <View style={{ width: '100%', height: '100%'}}>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <Header />

          <View style={{ width: '100%', height: 0.5, backgroundColor: '#cbcbcb' }}></View>

          <Restaurant />
      </ScrollView>
      <FooterNav navigation={navigation} chef={true} profile={true} />

    </View>
  )
}

export default ChiefProfile

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