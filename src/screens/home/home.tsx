import { Button } from '@/components/button'
import { Spacer } from '@/components/spacer'
import { Text } from '@/components/text'
import { Theme } from '@/constants/enums'
import { Storage } from '@/lib/storage'
import { useAuth, useTheme } from '@/providers'
import { getFormOfAddress } from '@/utils/mappers/get-form-of-address'
import { StyleSheet, View } from 'react-native'

export function Home() {
  const { switchTheme } = useTheme()
  const { user, signOut, guestUser } = useAuth()

  const onSignOut = () => {
    return signOut()
  }

  const onClearData = async () => {
    await Storage.clear()
    await onSignOut()
  }

  const onSwitchTheme = (newTheme: Theme) => {
    switchTheme(newTheme)
  }

  return (
    <View style={styles.container}>
      {guestUser ? (
        <Text>Hi, Guest!</Text>
      ) : (
        <>
          <Text>
            Welcome home, {getFormOfAddress(user.sex)} {user.firstName}{' '}
            {user.lastName}
          </Text>

          <Text>
            Phone number: +{user.phoneCountryCode} {user.phoneNumber}
          </Text>

          <Text>Email: {user.email}</Text>
        </>
      )}

      <Spacer size={40} />

      <Button
        text="Dark Theme"
        colorType="onPrimary"
        onPress={() => onSwitchTheme(Theme.DARK)}
        backgroundColorType="primary"
      />

      <Spacer />

      <Button
        text="Light Theme"
        colorType="onPrimary"
        onPress={() => onSwitchTheme(Theme.LIGHT)}
        backgroundColorType="primary"
      />

      <Spacer />

      <Button
        text="System Theme"
        colorType="onPrimary"
        onPress={() => onSwitchTheme(Theme.SYSTEM)}
        backgroundColorType="primary"
      />

      <Spacer />

      <Button
        text="Sign Out"
        onPress={onSignOut}
        colorType="onPrimary"
        backgroundColorType="primary"
      />

      <Spacer />

      <Button
        text="Clear data"
        colorType="onPrimary"
        onPress={onClearData}
        backgroundColorType="error"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})
