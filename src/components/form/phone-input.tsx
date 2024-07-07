import { Icon } from '@/components/icon'
import { Spacer } from '@/components/spacer'
import { Text } from '@/components/text'
import { useTheme } from '@/providers'
import {
  ForwardedRef,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { Control, Controller } from 'react-hook-form'
import { View } from 'react-native'
import InternationalPhoneInput, {
  ICountry,
  IPhoneInputRef,
} from 'react-native-international-phone-number'
import { TextInputRef } from './text-input'

interface PhoneInputProps {
  nextInput?: () => void
  selectedCountry: ICountry
  control: Control<{ phoneNumber?: string }>
  setSelectedCountry: (value: ICountry) => void
}

export interface PhoneInputRef {
  focus: () => void
}

export default forwardRef(PhoneInput) as (
  props: PhoneInputProps & { ref?: Ref<PhoneInputRef> },
) => ReturnType<typeof PhoneInput>

function PhoneInput(
  { control, nextInput, selectedCountry, setSelectedCountry }: PhoneInputProps,
  ref: ForwardedRef<TextInputRef>,
) {
  const { colors, isDark } = useTheme()

  const inputRef = useRef<IPhoneInputRef>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }))

  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({
        field: { onChange, value, onBlur },
        formState: { errors },
      }) => {
        const hasError = !!errors.phoneNumber

        return (
          <View>
            <Text bold>Phone Number</Text>
            <Spacer size={8} />
            {/* @ts-ignore */}
            <InternationalPhoneInput
              ref={inputRef}
              value={value}
              onBlur={onBlur}
              onChangePhoneNumber={onChange}
              theme={isDark ? 'dark' : 'light'}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={setSelectedCountry}
              customCaret={<Icon name="chevron-down" color={colors.select} />}
              placeholder="Phone Number"
              placeholderTextColor={colors.placeholder}
              returnKeyType={nextInput ? 'next' : 'default'}
              onSubmitEditing={() => {
                nextInput?.()
              }}
              cursorColor={colors.primary}
              modalHeight="80%"
              phoneInputStyles={{
                container: {
                  borderWidth: 1,
                  borderColor: hasError ? colors.error : colors.card,
                  backgroundColor: colors.card,
                },
                flagContainer: {
                  backgroundColor: colors.card,
                },
                caretContainer: {
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-end',
                  marginRight: -16,
                },
                callingCode: {
                  color: colors.text,
                  marginRight: -24,
                },
                input: {
                  color: colors.text,
                },
                flag: {
                  marginLeft: -8,
                },
              }}
              modalStyles={{
                modal: {
                  backgroundColor: colors.background,
                },
                searchInput: {
                  borderWidth: 0,
                  color: colors.text,
                  backgroundColor: colors.card,
                },
                countryButton: {
                  borderWidth: 0,
                  backgroundColor: colors.card,
                },
                noCountryText: {
                  color: colors.text,
                  textAlign: 'center',
                },
                callingCode: {
                  color: colors.text,
                },
                countryName: {
                  color: colors.text,
                },
              }}
            />

            <Spacer size={4} />

            <Text color={colors.error} size={14}>
              {hasError ? errors.phoneNumber.message : ''}
            </Text>

            <Spacer size={hasError ? 12 : 0} />
          </View>
        )
      }}
    />
  )
}
