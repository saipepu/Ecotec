import React, { useState } from 'react'
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SignUpPng from '../../assets/SignUp.png'
import color from '../../theme/colors'
import font from '../../theme/font'
import userIcon from '../../assets/Icon/user.png'
import passwordIcon from '../../assets/Icon/password.png'
import { Link } from '@react-navigation/native'

const SignIn = ({ navigation }) => {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    let formData = {
      userName: userName,
      password: password
    }
    console.log(formData)
  }

  return (
    <View style={{ width: '100%', height: '100%'}}>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>

        <View style={{ width: '100%', height: '100%', display: 'flex'}}>
          {/* <View style={{ width: '100%', height: '45%', position: 'relative' }}> */}
            <Image source={SignUpPng} style={{ width: '130%', height: '45%', top: 0, left: -55, zIndex: 1, overflow: 'visible' }} resizeMode="contain" />
          {/* </View> */}
          <View style={{ width: '100%', flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, paddingBottom: 32, gap: 8}}>
            <Text htmlfor='legend' style={{ fontSize: 24, fontWeight: 'bold' }}>Sign In</Text>
            {/* Username */}
            <Text htmlfor='label' style={{ fontSize: 18, }}>Username</Text>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 12, gap: 8, backgroundColor: '#F0F0F0', borderRadius: 8, }}>
              <Image source={userIcon} resizeMode="contain" style={{ width: 18, height: 18 }}/>
              <TextInput 
                placeholder='Username' style={{ fontSize: 18, borderLeftWidth: 1, borderColor: '#4d4d4d', paddingHorizontal: 8}}
                value={userName}
                onChangeText={setUserName}
                />
            </View>
            {/* Password */}
            <Text htmlfor='label' style={{ fontSize: 18, }}>Password</Text>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', padding: 12, gap: 8, backgroundColor: '#F0F0F0', borderRadius: 8 }}>
              <Image source={passwordIcon} resizeMode="contain" style={{ width: 18, height: 18 }}/>
              <TextInput
                secureTextEntry={true} placeholder='*****' style={{ fontSize: 18, borderLeftWidth: 1, borderColor: '#4d4d4d', paddingHorizontal: 8}}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Text style={{ width: '100%', textAlign: 'center'}}>Don't have an account yet? <Link to={{ screen: 'SignUp'}} style={{ color: color.primary, textDecorationLine: 'underline' }}>Sign Up</Link></Text>
            <TouchableOpacity
              style={{ ...styles.button}}
              onPress={() => {
                navigation.navigate('Home')
                handleSubmit()
              }}
            >
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, fontWeight: '500' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 56,
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    gap: 24,
  },
  button: {
    marginTop: 'auto',
    width: '100%',
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