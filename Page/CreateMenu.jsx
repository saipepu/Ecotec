import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import HeaderNav from '../components/HeaderNav'

const CreateMenu = ({ navigation }) => {

  const Form = () => {

      let initialValue = {
          name: '',
          price: 0,
          points: 0,
          ingredients: [],
          coverPhoto: ''
        }
        
      const [formValue, setFormValue] = useState(initialValue)

      const setName = (value) => {
        setFormValue({...formValue, name: value})
      }
      const setPrice = (value) => {
        setFormValue({...formValue, price: value})
      }
      const setPoints = (value) => {
        setFormValue({...formValue, points: value})
      }
      const setIngredient = (value) => {
        setFormValue({...formValue, ingredients: formValue.ingredients.push(value)})
      }
      const setCoverPhoto = (value) => {
        setFormValue({...formValue, coverPhoto: value})
      }
      
      return (
      <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}>
        <View style={{ width: '100%', display: 'flex', gap: 4 }}>
          <Text style={{ fontSize: 16 }}>Name</Text>
          <TextInput
            style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb', borderRadius: 12 }}
            onChangeText={newValue => setName(newValue)}
            value={formValue.name}
            placeholder='name'
          />
        </View>
        <View style={{ width: '100%', display: 'flex', gap: 4 }}>
          <Text style={{ fontSize: 16 }}>Price</Text>
          <TextInput
            style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb', borderRadius: 12 }}
            onChangeText={newValue => setPrice(newValue)}
            value={formValue.price}
            placeholder='6.99'
          />
        </View>
        <View style={{ width: '100%', display: 'flex', gap: 4 }}>
          <Text style={{ fontSize: 16 }}>Points</Text>
          <TextInput
            style={{ width: '100%', fontSize: 16, padding: 12, backgroundColor: '#cbcbcb', borderRadius: 12 }}
            onChangeText={newValue => setPoints(newValue)}
            value={formValue.points}
            placeholder='25'
            keyboardType='numeric'
          />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HeaderNav backTo={'ChiefProfile'} navigation={navigation} right={false}/>
      <ScrollView
        vertical={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingHorizontal: 20 }}>
          <Form />
      </ScrollView>
    </View>
  )
}

export default CreateMenu

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingTop: 56,
    gap: 24,
  },
})