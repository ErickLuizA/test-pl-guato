import { Control, Controller } from 'react-hook-form'
import { View } from 'react-native'
import InternationalPhoneInput, {
  ICountry,
} from 'react-native-international-phone-number'
import { Text } from '@/components/text'
import { useTheme } from '@/providers'
import { Spacer } from '@/components/spacer'
import { Icon } from '@/components/icon'

interface PhoneInputProps {
  selectedCountry: ICountry
  control: Control<{ phoneNumber?: string }>
  setSelectedCountry: (value: ICountry) => void
}

export function PhoneInput({
  control,
  selectedCountry,
  setSelectedCountry,
}: PhoneInputProps) {
  const { colors, isDark } = useTheme()

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
            <InternationalPhoneInput
              value={value}
              onBlur={onBlur}
              onChangePhoneNumber={onChange}
              theme={isDark ? 'dark' : 'light'}
              selectedCountry={selectedCountry}
              onChangeSelectedCountry={setSelectedCountry}
              customCaret={<Icon name="chevron-down" color={colors.text} />}
              placeholder="Phone Number"
              placeholderTextColor={colors.placeholder}
              modalHeight="80%"
              phoneInputStyles={{
                container: {
                  borderWidth: hasError ? 1 : 0,
                  borderColor: hasError ? colors.error : colors.card,
                  backgroundColor: colors.card,
                },
                flagContainer: {
                  backgroundColor: colors.card,
                },
                caretContainer: {
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-end',
                  marginRight: -24,
                },
                callingCode: {
                  color: colors.text,
                  marginRight: -24,
                },
                input: {
                  color: colors.text,
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
