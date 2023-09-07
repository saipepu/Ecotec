import React, { useContext } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Button, Text, TouchableOpacity, View } from 'react-native'
import WelcomePng from '../assets/welcome.png'
import color from '../theme/colors'
import PrimaryButton from '../components/PrimaryButton'
import AppStateContext from '../hook/AppStateContext'

const Welcome = ({ navigation }) => {

  // const context = useContext(AppStateContext)
  // const update = () => {
  //   console.log(context.contextRestaurant)
  //   setTimeout(() => context.updateRestaurant('pepu restaurant'), 1000)
  // }
  // update()

  return (
    <>
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={WelcomePng}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ecotec</Text>
        <Text style={styles.subtitle}>Spark Change: Embrace Sustainability for a Greener Future!</Text>
      </View>
      <PrimaryButton navigation={navigation} props={'SignUp'} text={'Get Started'} />
    </View>
    </>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24
  },
  imgContainer: {
    width: '100%',
    height: '45%',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: color.primary
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    color: color.black,
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