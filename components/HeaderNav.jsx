import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import color from '../theme/colors'
import { TouchableOpacity, View } from 'react-native'
import AppStateContext from '../hook/AppStateContext'

const HeaderNav = ({ navigation, backTo, forwardTo, left }) => {

  const context = useContext(AppStateContext)
  const { contextRole, updateContextCurrentTab } = context


  return (
    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10}}>
      <TouchableOpacity
        onPress={() => {
          if(backTo == 'Home') {
            updateContextCurrentTab('Home')
          }
          navigation.navigate(backTo)
        }}
      >
        <Icon name="chevron-left" size={30} color={color.black} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(forwardTo)}
      >
        {forwardTo == 'Cart' && contextRole != 'Chef' ? 
          <Icon name="shopping-cart" size={30} color={color.black} /> 
        : left ?
          <Icon name="notifications" size={30} color={color.black} />
          :
          ""
        }
      </TouchableOpacity>
    </View>
  )
}

export default HeaderNav