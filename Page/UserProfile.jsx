import React, { useContext, useState } from 'react'
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

const UserProfile = ({ navigation }) => {

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
              <Text style={{ fontSize: 24, fontWeight: 'bold', lineHeight: 30}}>Example User</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20}}>
                <Text style={{ fontSize: 16, color: color.black }}>20 Follwers</Text>
                <Text style={{ fontSize: 16, color: color.black }}>10 Following</Text>
              </View>
            </View>
        </View>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <PrimaryButton navigation={navigation} props={'CreateMenu'} text={'Add Friends'} styleConfig={{ flex: 1 }} />
          <PrimaryButton text={'Share'} />
        </View>
      </View>
    )
  }

  const Statistic = () => {

    return (
      <View style={{ width: '100%', gap: 8}}>
        <Text style={{ fontSize: 16, fontWeight: 'bold'}}>Statistics</Text>
        <View style={{ width: '100%', gap: 8 }}>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1, display: 'flex' , flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: color.themeOrange, borderRadius: 12, padding: 12, gap: 12 }}>
              {/* icon */}
              <View style={{ width: 32, height: 32, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'white', opacity: 0.5 }}>
                <Image source={star} style={{ width: '60%', height: '60%' , resizeMode: 'contain'}} />
              </View>
              {/* point */}
              <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>2756</Text>
                <Text style={{ fontSize: 14, color: color.dark }}>Total Points</Text>
              </View>
            </View>

            <View style={{ flex: 1, display: 'flex' , flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',  backgroundColor: color.themePurple, borderRadius: 12, padding: 12, gap: 12 }}>
              {/* icon */}
              <View style={{ width: 32, height: 32, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 100, backgroundColor: 'white', opacity: 0.5 }}>
                <Image source={task} style={{ width: '60%', height: '60%' , resizeMode: 'contain'}} />
              </View>
              {/* point */}
              <View style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold'}}>3/6</Text>
                <Text style={{ fontSize: 14, color: color.dark }}>Daily Tasks</Text>
              </View>
            </View>

          </View>
        </View>
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