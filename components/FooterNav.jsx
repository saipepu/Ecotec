import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import color from '../theme/colors'

const FooterNav = ({ navigation }) => {

  let chief = true

  const link = [
    {
      icon: 'home-filled',
      link: 'Home'
    },
    {
      icon: 'leaderboard',
      link: 'Home'
    },
    {
      icon: 'person',
      link: chief ? 'ChiefProfile' : 'Home'
    },
    {
      icon: 'shopping-cart',
      link: 'Cart'
    }
  ]
  
  return (
    <View style={styles.navContainer}>
      {link.map((item, i) => (
        <TouchableOpacity key={i} style={{ width: 35, height: 35, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate(item.link)}
        >
          <Icon name={item.icon} size={30} color={color.primary} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default FooterNav

const styles = StyleSheet.create({
  navContainer: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 28
  }
})