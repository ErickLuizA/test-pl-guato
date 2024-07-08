import { useTheme } from '@/providers'
import {
  ForwardedRef,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import { Control, Controller, FieldPath } from 'react-hook-form'
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
} from 'react-native'
import { Spacer } from '../spacer'
import { Text } from '../text'

interface TextInputProps<T> extends RNTextInputProps {
  label: string
  name: FieldPath<T>
  control: Control<T>
  nextInput?: () => void
  leftElement?: () => React.ReactElement
}

export interface TextInputRef {
  focus: () => void
}

export default forwardRef(TextInput) as <T>(
  props: TextInputProps<T> & { ref?: Ref<TextInputRef> },
) => ReturnType<typeof TextInput>

function TextInput<T>(
  {
    name,
    label,
    style,
    control,
    nextInput,
    leftElement,
    onSubmitEditing,
    ...rest
  }: TextInputProps<T>,
  ref: ForwardedRef<TextInputRef>,
) {
  const { colors } = useTheme()

  const inputRef = useRef<RNTextInput>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }))

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        formState: { errors },
      }) => {
        const hasError = !!errors[name as string]

        return (
          <View>
            <Text bold>{label}</Text>

            <Spacer size={8} />

            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: colors.card,
                  borderColor: hasError ? colors.error : colors.card,
                },
              ]}
            >
              {leftElement && leftElement()}

              <RNTextInput
                ref={inputRef}
                value={value as string}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor={colors.placeholder}
                cursorColor={colors.primary}
                style={[style, styles.input, { color: colors.text }]}
                returnKeyType={nextInput ? 'next' : 'default'}
                onSubmitEditing={(e) => {
                  onSubmitEditing?.(e)
                  nextInput?.()
                }}
                {...rest}
              />
            </View>

            <Spacer size={4} />

            <Text color={colors.error} size={14}>
              {hasError ? errors[name as string].message : ''}
            </Text>

            <Spacer size={hasError ? 12 : 0} />
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
  },
})
