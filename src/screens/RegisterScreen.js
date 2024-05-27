import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { ScrollView } from 'react-native-gesture-handler'


export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [country, setCountry] = useState({ value: '', error: '' })
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' })
  const [gender, setGender] = useState({ value: '', error: '' })
  const [religion, setReligion] = useState({ value: '', error: '' })
  const [caste, setCaste] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const firstNameError = nameValidator(firstName.value)
    const lastNameError = nameValidator(lastName.value)
    if (emailError || passwordError || firstNameError || lastNameError) {
      setFirstName({ ...firstName, error: firstNameError })
      setLastName({ ...lastName, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
  
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      country: country.value,
      phoneNumber: phoneNumber.value,
      gender: gender.value,
      religion: religion.value,
      caste: caste.value,
      address: address.value,
    }
  
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData))
      console.log("here:::::")
      navigation.navigate('UploadImageScreen')
    } catch (error) {
      console.error('Failed to save data to local storage:', error)
    }
  }

  return (
    // <Background>
      <ScrollView contentContainerStyle={styles.scrollView}>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome.</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Country"
        returnKeyType="next"
        value={country.value}
        onChangeText={(text) => setCountry({ value: text, error: '' })}
        error={!!country.error}
        errorText={country.error}
      />
      <TextInput
        label="Phone Number"
        returnKeyType="next"
        value={phoneNumber.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: '' })}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
      />
      <TextInput
        label="Gender"
        returnKeyType="next"
        value={gender.value}
        onChangeText={(text) => setGender({ value: text, error: '' })}
        error={!!gender.error}
        errorText={gender.error}
      />
      <TextInput
        label="Religion"
        returnKeyType="next"
        value={religion.value}
        onChangeText={(text) => setReligion({ value: text, error: '' })}
        error={!!religion.error}
        errorText={religion.error}
      />
      <TextInput
        label="Caste"
        returnKeyType="next"
        value={caste.value}
        onChangeText={(text) => setCaste({ value: text, error: '' })}
        error={!!caste.error}
        errorText={caste.error}
      />
      <TextInput
        label="Address"
        returnKeyType="next"
        value={address.value}
        onChangeText={(text) => setAddress({ value: text, error: '' })}
        error={!!address.error}
        errorText={address.error}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
      <View style={styles.row}>
        <Text>I already have an account!</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    // </Background>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue', // or theme.colors.primary if you have a theme
  },
})
