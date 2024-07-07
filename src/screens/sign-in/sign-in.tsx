import { Button } from '@/components/button'
import { PhoneInput } from '@/components/form'
import { SocialIcon } from '@/components/icon'
import { Logo } from '@/components/logo'
import { Spacer } from '@/components/spacer'
import { Text, Title } from '@/components/text'
import { SocialProvider } from '@/constants/enums'
import { useAuth, useTheme } from '@/providers'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import { ICountry } from 'react-native-international-phone-number'
import * as Yup from 'yup'

const { width: WINDOW_WIDTH } = Dimensions.get('window')

const schemaValidation = Yup.object({
  phoneNumber: Yup.string().required('The phone number is required.'),
}).required()

// eslint-disable-next-line import/namespace
interface SignInForm extends Yup.InferType<typeof schemaValidation> {}

export function SignIn() {
  const { colors } = useTheme()
  const { navigate } = useNavigation()
  const { guestSignIn, signIn, socialSignIn } = useAuth()

  const { control, setError, handleSubmit } = useForm<SignInForm>({
    mode: 'onBlur',
    resolver: yupResolver(schemaValidation),
    defaultValues: { phoneNumber: '' },
  })

  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(
    undefined,
  )
  const [buttonsLoading, setButtonsLoading] = useState({
    signIn: false,
    guestSignIn: false,
    appleSocialSignIn: false,
    googleSocialSignIn: false,
    facebookSocialSignIn: false,
  })

  const isAnyButtonLoading = useMemo(() => {
    return Object.values(buttonsLoading).some((val) => val)
  }, [buttonsLoading])

  const handleSetButtonLoading = (
    button: keyof typeof buttonsLoading,
    value: boolean,
  ) => {
    setButtonsLoading((state) => ({
      ...state,
      [button]: value,
    }))
  }

  const handleOnSubmit = async (data: SignInForm) => {
    handleSetButtonLoading('signIn', true)

    const response = await signIn(
      Number(selectedCountry.callingCode.replace('+', '')),
      Number(data.phoneNumber.replace(/\s/g, '')),
    )

    if (response.isLeft()) {
      setError('phoneNumber', { message: response.value.message })
    }

    handleSetButtonLoading('signIn', false)
  }

  const handelSocialSignIn = async (provider: SocialProvider) => {
    handleSetButtonLoading(`${provider}SocialSignIn`, true)

    const response = await socialSignIn(provider)

    if (response.isLeft()) {
      Alert.alert('Error', response.value.message)
    }

    handleSetButtonLoading(`${provider}SocialSignIn`, false)
  }

  const handleContinueAsGuest = async () => {
    handleSetButtonLoading('guestSignIn', true)

    await guestSignIn()

    handleSetButtonLoading('guestSignIn', false)
  }

  const handlePressSignUp = () => {
    navigate('SignUp')
  }

  return (
    <ScrollView style={styles.container}>
      <Logo />

      <Spacer />

      <Title>Sign In</Title>

      <Spacer size={30} />

      <PhoneInput
        control={control}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <Button
        text="Sign In"
        colorType="onSecondary"
        disabled={isAnyButtonLoading}
        backgroundColorType="secondary"
        loading={buttonsLoading.signIn}
        onPress={handleSubmit(handleOnSubmit)}
      />

      <Spacer size={40} />

      <Text bold style={styles.alignedText}>
        Sign in with
      </Text>

      <Spacer />

      <View style={styles.socialProvidersContainer}>
        {Object.values(SocialProvider).map((value) => {
          return (
            <SocialIcon
              key={value}
              provider={value}
              disabled={isAnyButtonLoading}
              loading={buttonsLoading[`${value}SocialSignIn`]}
              onPress={() => handelSocialSignIn(value)}
            />
          )
        })}
      </View>

      <Spacer size={50} />

      <Button
        text="Continue as a Guest"
        disabled={isAnyButtonLoading}
        colorType="onSecondaryVariant"
        onPress={handleContinueAsGuest}
        loading={buttonsLoading.guestSignIn}
        backgroundColorType="secondaryVariant"
        style={[styles.guestButton, { borderColor: colors.placeholder }]}
      />

      <Spacer />

      <Text
        size={14}
        color={colors.textVariant}
        style={styles.alignedText}
        onPress={handlePressSignUp}
        disabled={isAnyButtonLoading}
      >
        Create a New Account?{' '}
        <Text size={14} bold color={colors.primary}>
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },

  alignedText: {
    textAlign: 'center',
  },

  socialProvidersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },

  guestButton: {
    borderWidth: 2,
    alignSelf: 'center',
    width: WINDOW_WIDTH / 1.7,
  },
})
