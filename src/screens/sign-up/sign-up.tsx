import { Logo } from '@/components/logo'
import { Spacer } from '@/components/spacer'
import { Title } from '@/components/text'
import { ScrollView, StyleSheet } from 'react-native'

export function SignUp() {
  return (
    <ScrollView style={styles.container}>
      <Logo />

      <Spacer />

      <Title>Sign Up</Title>

      <Spacer size={28} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 0,
    marginTop: -36,
  },

  alignedText: {
    textAlign: 'center',
  },
})
