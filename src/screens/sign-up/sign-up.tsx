import { Button } from '@/components/button'
import {
  OptionSelect,
  PhoneInput,
  PhoneInputRef,
  TextInput,
  TextInputRef,
} from '@/components/form'
import { Logo } from '@/components/logo'
import { Spacer } from '@/components/spacer'
import { Text, Title } from '@/components/text'
import { useAuth, useTheme } from '@/providers'
import { getFormOfAddress } from '@/utils/mappers/get-form-of-address'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ScrollView, StyleSheet } from 'react-native'
import { ICountry } from 'react-native-international-phone-number'
import * as Yup from 'yup'

const schemaValidation = Yup.object({
  sex: Yup.string<'male' | 'female'>().notRequired(),
  firstName: Yup.string().required('The first name is required.'),
  lastName: Yup.string().required('The last name is required.'),
  phoneNumber: Yup.string().required('The phone number is required.'),
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
}).required()

// eslint-disable-next-line import/namespace
interface SignUpForm extends Yup.InferType<typeof schemaValidation> {}

export function SignUp() {
  const { signUp } = useAuth()
  const { colors } = useTheme()
  const { navigate } = useNavigation()

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    mode: 'onBlur',
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      email: '',
      lastName: '',
      firstName: '',
      phoneNumber: '',
      sex: 'male',
    },
  })

  const [selectedCountry, setSelectedCountry] = useState<undefined | ICountry>(
    undefined,
  )

  const lastNameRef = useRef<TextInputRef>(null)
  const phoneRef = useRef<PhoneInputRef>(null)
  const emailRef = useRef<TextInputRef>(null)

  const handleOnSubmit = async (data: SignUpForm) => {
    const response = await signUp({
      sex: data.sex,
      email: data.email,
      lastName: data.lastName,
      firstName: data.firstName,
      phoneNumber: Number(data.phoneNumber.replace(/\s/g, '')),
      phoneCountryCode: Number(selectedCountry?.callingCode.replace('+', '')),
    })

    if (response.isLeft()) {
      setError('root', { message: response.value.message })
    }
  }

  const handlePressSignIn = () => {
    navigate('SignIn')
  }

  return (
    <ScrollView style={styles.container}>
      <Logo />

      <Title>Sign Up</Title>

      <Spacer size={30} />

      <TextInput
        name="firstName"
        control={control}
        label="First Name"
        placeholder="First Name"
        leftElement={() => {
          return (
            <OptionSelect
              name="sex"
              control={control}
              options={[
                { id: 'male', title: 'Mr.' },
                { id: 'female', title: 'Mrs.' },
              ]}
              getValueLabel={getFormOfAddress}
            />
          )
        }}
        nextInput={() => lastNameRef.current?.focus()}
      />

      <TextInput
        ref={lastNameRef}
        name="lastName"
        label="Last Name"
        control={control}
        placeholder="Last Name"
        nextInput={() => phoneRef.current?.focus()}
      />

      <PhoneInput
        ref={phoneRef}
        control={control}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        nextInput={() => emailRef.current?.focus()}
      />

      <TextInput
        name="email"
        label="Email"
        ref={emailRef}
        control={control}
        placeholder="Email"
        returnKeyType="done"
        keyboardType="email-address"
      />

      <Spacer />

      {errors.root ? (
        <>
          <Text size={14} color={colors.error}>
            {errors.root.message}
          </Text>
          <Spacer />
        </>
      ) : null}

      <Button
        text="Sign Up"
        loading={isSubmitting}
        colorType="onSecondary"
        disabled={isSubmitting}
        backgroundColorType="secondary"
        onPress={handleSubmit(handleOnSubmit)}
      />

      <Spacer />

      <Text
        size={14}
        disabled={isSubmitting}
        color={colors.textVariant}
        style={styles.alignedText}
        onPress={handlePressSignIn}
      >
        Already have an Account?{' '}
        <Text size={14} bold color={colors.primary}>
          Sign In
        </Text>
      </Text>

      <Spacer size={24} />
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
