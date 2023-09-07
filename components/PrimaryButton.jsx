import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import color from '../theme/colors'

const PrimaryButton = ({ navigation, props, text, styleConfig }) => {

  return (
    <TouchableOpacity
      style={{ ...styles.button, ...styleConfig}}
      onPress={() => props ? navigation.navigate(props) : ""}
    >
      <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>{text}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
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