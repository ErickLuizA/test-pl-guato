import { Theme } from '@/constants/enums'
import { THEME_STORAGE_KEY } from '@/constants/storage'
import { Storage } from '@/lib/storage'
import {
  DarkTheme,
  DefaultTheme,
  Theme as RNTheme,
} from '@react-navigation/native'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useColorScheme } from 'react-native'

export type ThemeColors = RNTheme['colors'] & {
  onPrimary: string
  secondary: string
  onSecondary: string
  secondaryVariant: string
  onSecondaryVariant: string
  accent: string
  onAccent: string
  error: string
  placeholder: string
  textVariant: string
  select: string
}

interface ThemeContextProps {
  theme: Theme
  isDark: boolean
  isLoading: boolean
  colors: ThemeColors
  switchTheme(newTheme: Theme): void
}

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps)

const DARK_THEME_COLORS: ThemeColors = {
  ...DarkTheme.colors,
  text: '#FFFFFF',
  background: '#0F1621',
  primary: '#6759FF',
  onPrimary: '#FFFFFF',
  secondary: '#2F3643',
  secondaryVariant: '#29303C',
  card: '#18202E',
  onSecondary: '#D1D3D4',
  onSecondaryVariant: '#D1D3D4',
  accent: '#B5EBCD',
  onAccent: '#2C2B46',
  error: '#F94449',
  placeholder: '#535763',
  textVariant: '#9A9FA5',
  select: '#6F767E',
}

const LIGHT_THEME_COLORS = {
  ...DefaultTheme.colors,
  text: '#1A1B2D',
  background: '#FFFFFF',
  primary: '#6759FF',
  onPrimary: '#FFFFFF',
  secondary: '#EFEFEF',
  secondaryVariant: '#FCFCFC',
  card: '#F5F5F5',
  onSecondary: '#2F3643',
  onSecondaryVariant: '#2F3643',
  accent: '#B5EBCD',
  onAccent: '#2C2B46',
  error: '#F94449',
  placeholder: '#D1D3D4',
  textVariant: '#9A9FA5',
  select: '#D1D3D4',
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const scheme = useColorScheme()

  const [isLoading, setIsLoading] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(Theme.SYSTEM)

  const isDark = useMemo(() => {
    if (selectedTheme === Theme.SYSTEM) {
      return scheme === Theme.DARK
    }

    return selectedTheme === Theme.DARK
  }, [scheme, selectedTheme])

  const colors = useMemo(() => {
    return isDark ? DARK_THEME_COLORS : LIGHT_THEME_COLORS
  }, [isDark])

  const switchTheme = (newTheme: Theme) => {
    setSelectedTheme(newTheme)
    Storage.setItem(THEME_STORAGE_KEY, newTheme)
  }

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const storedTheme = await Storage.getItem(THEME_STORAGE_KEY)

        if (storedTheme) {
          setSelectedTheme(storedTheme as Theme)
        }
      } catch (error) {
        console.error('Failed to load theme:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAsync()
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors,
        isLoading,
        switchTheme,
        theme: selectedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
