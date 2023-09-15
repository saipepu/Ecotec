import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import color from '../theme/colors'
import AppStateContext from '../hook/AppStateContext'
import { BlurView } from '@react-native-community/blur'

const FooterNav = ({ navigation, chef, profile }) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('light');
  const context = useContext(AppStateContext)
  const { contextRole } = context

  let IsChef = chef ? chef : false;

  const link = [
    {
      icon: 'home-filled',
      link: 'Home'
    },
    // {
    //   icon: 'leaderboard',
    //   link: ''
    // },
    {
      icon: 'person',
      link: IsChef ? 'ChefProfile' : 'UserProfile'
    },
    {
      icon: 'shopping-cart',
      link: 'Cart'
    }
  ]
  
  return (
    <View style={styles.navContainer}>
      {/* <BlurView style={{}} viewRef={null} blurRadius={1} blurType={blurType} /> */}
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <TouchableOpacity
            style={styles.container} 
            onPress={() => {
              // context.updateContextCurrentTab('Home')
              setModalVisible(false)
            }}
          >
            <TouchableOpacity onPress={() => ''}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Choose a Role</Text>
                  <TouchableOpacity 
                    style={{ width: '100%', padding: 12, borderRadius: 12, backgroundColor: color.primary }} 
                    onPress={() => {
                      setModalVisible(false)
                      context.updateContextCurrentTab('ChefProfile')
                      navigation.navigate('ChefProfile')
                    }}
                  >
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'white' }}>Chef Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={{ width: '100%', padding: 12, borderRadius: 12, backgroundColor: color.primary }} 
                    onPress={() => {
                      setModalVisible(false)
                      context.updateContextCurrentTab('UserProfile')
                      navigation.navigate('UserProfile')
                    }}
                  >
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: 'white' }}>User Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
        {link.map((item, i) => {
          return contextRole == 'Chef' && item.link == 'Cart' ? "" : (
            <TouchableOpacity key={i} style={{ width: 35, height: 35, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              item.icon == 'person' ? setModalVisible(true) : item.link ? navigation.navigate(item.link) : ""
              if(item.icon != 'person') {
                context.updateContextCurrentTab(item.link)
              }
            }}
            >
              <Icon name={item.icon} size={30} color={context.contextCurrentTab == item.link ? color.primary : '#cbcbcb'} />
            </TouchableOpacity>
          )
        }
        )}
    </View>
  )
}

export default FooterNav

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#4d4d4d90'
  },
  navContainer: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 28,
    paddingTop: 4,
    backgroundColor: '#ffffff10',
    shadowColor: '#00000080',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 12
  },
})