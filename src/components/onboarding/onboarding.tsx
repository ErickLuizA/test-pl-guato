import { useRef, useState } from 'react'
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Indicator } from './indicator'
import { Button, NextButton } from '@/components/button'

interface OnboardingProps {
  data: {
    title: string
    subtitle: string
    imageSource: ImageSourcePropType
  }[]
  onSkip: () => void
  onFinish: () => void
  finishButtonText: string
}

const { width: WINDOW_WIDTH } = Dimensions.get('window')

const OFFSET_FIX = 10

export function Onboarding({
  data,
  onSkip,
  onFinish,
  finishButtonText,
}: OnboardingProps) {
  const scrollViewRef = useRef<ScrollView>(null)

  const [currentStep, setCurrentStep] = useState(0)

  const handleSkip = () => {
    onSkip()
  }

  const handleFinish = () => {
    onFinish()
  }

  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { x } = event.nativeEvent.contentOffset

    const floorWindowWidth = Math.floor(WINDOW_WIDTH - OFFSET_FIX)
    const floorOffset = Math.floor(x)

    const indexOfNextScreen = Math.floor(floorOffset / floorWindowWidth)

    setCurrentStep(indexOfNextScreen)
  }

  const handlePressNext = () => {
    scrollViewRef.current?.scrollTo({
      x: (WINDOW_WIDTH + OFFSET_FIX) * (currentStep + 1),
      animated: true,
    })
  }

  return (
    <ScrollView
      horizontal
      snapToStart
      pagingEnabled
      ref={scrollViewRef}
      scrollEventThrottle={32}
      onScroll={handleOnScroll}
      showsHorizontalScrollIndicator={false}
    >
      {data.map((value, index) => {
        const isLast = data.length - 1 === index

        return (
          <View
            key={value.title}
            style={[styles.container, { width: WINDOW_WIDTH }]}
          >
            <View style={{ height: 32 }} />

            {isLast ? null : (
              <Button
                text="Skip"
                colorType="onAccent"
                onPress={handleSkip}
                style={styles.skipButton}
                backgroundColorType="accent"
              />
            )}

            <View style={styles.circle} />

            <Image source={value.imageSource} style={styles.image} />

            <Indicator numberOfSteps={data.length} currentStep={index} />

            <Text style={styles.title}>{value.title}</Text>

            <Text style={styles.subtitle}>{value.subtitle}</Text>

            <View style={styles.buttonContainer}>
              {isLast ? (
                <Button
                  colorType="onPrimary"
                  onPress={handleFinish}
                  text={finishButtonText}
                  backgroundColorType="primary"
                  style={styles.finishButton}
                />
              ) : (
                <NextButton onPress={handlePressNext} />
              )}
            </View>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  circle: {
    width: 50,
    height: 50,
    position: 'absolute',
    borderBottomRightRadius: 50,
    backgroundColor: '#FFCACA',
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
  },

  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },

  image: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * 1.2,
    marginBottom: -32,
  },

  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    position: 'absolute',
    right: 16,
    top: 16,
  },

  buttonContainer: {
    marginTop: 16,
  },

  finishButton: {
    marginHorizontal: 20,
    width: WINDOW_WIDTH / 2,
    alignSelf: 'center',
  },
})
