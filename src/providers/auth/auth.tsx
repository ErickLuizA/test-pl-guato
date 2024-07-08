import { SocialProvider } from '@/constants/enums'
import { AUTH_STORAGE_KEY, USERS_STORAGE_KEY } from '@/constants/storage'
import { MOCK_USERS } from '@/data/users'
import { Either, left, right } from '@/lib/either'
import { Storage } from '@/lib/storage'
import { User } from '@/types/user'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Failure = {
  message: string
}

type Success = {
  message: string
}

interface AuthContextProps {
  user: User | null
  guestUser: boolean
  isLoading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
  guestSignIn: () => Promise<void>
  signUp: (data: User) => Promise<Either<Failure, Success>>
  signIn: (
    phoneCountryCode: number,
    phoneNumber: number,
  ) => Promise<Either<Failure, Success>>
  socialSignIn: (provider: SocialProvider) => Promise<Either<Failure, Success>>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [guestUser, setGuestUser] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = useMemo(
    () => !!user || !!guestUser,
    [user, guestUser],
  )

  const signOut = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(null)
    setGuestUser(false)
    Storage.removeItem(AUTH_STORAGE_KEY)
  }

  const signUp = async (data: User): Promise<Either<Failure, Success>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const users: User[] = (await Storage.getItem(USERS_STORAGE_KEY)) || []

      const userAlreadyExists = users.find(
        (user) =>
          (user.phoneNumber === data.phoneNumber &&
            user.phoneCountryCode === data.phoneCountryCode) ||
          user.email === data.email,
      )

      if (userAlreadyExists) {
        return left({ message: 'User already exists!' })
      }

      await Promise.all([
        Storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data)),
        Storage.push(USERS_STORAGE_KEY, JSON.stringify(data)),
      ])

      setUser(data)

      return right({ message: 'ok' })
    } catch (error) {
      console.log(`Error signing up: ${error}`)

      const message =
        typeof error?.message === 'string' ? error?.message : 'Unknown error'

      return left({ message })
    }
  }

  const signIn = async (
    phoneCountryCode: number,
    phoneNumber: number,
  ): Promise<Either<Failure, Success>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const users: User[] = (await Storage.getItem(USERS_STORAGE_KEY)) || []

      const storedUser = users.find(
        (user) =>
          user.phoneNumber === phoneNumber &&
          user.phoneCountryCode === phoneCountryCode,
      )

      if (!storedUser) {
        return left({ message: 'Incorrect phone number!' })
      }

      await Storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(storedUser))

      setUser({
        phoneNumber,
        sex: storedUser.sex,
        email: storedUser.email,
        lastName: storedUser.lastName,
        firstName: storedUser.firstName,
        phoneCountryCode: storedUser.phoneCountryCode,
      })

      return right({ message: 'ok' })
    } catch (error) {
      console.log(`Error signing in: ${error}`)

      const message =
        typeof error?.message === 'string' ? error?.message : 'Unknown error'

      return left({ message })
    }
  }

  const socialSignIn = async (
    provider: SocialProvider,
  ): Promise<Either<Failure, Success>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const socialUser = MOCK_USERS[provider]

      await Storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(socialUser))

      setUser({
        sex: socialUser.sex,
        email: socialUser.email,
        lastName: socialUser.lastName,
        firstName: socialUser.firstName,
        phoneNumber: socialUser.phoneNumber,
        phoneCountryCode: socialUser.phoneCountryCode,
      })

      return right({ message: 'ok' })
    } catch (error) {
      console.log(`Error signing in: ${error}`)

      const message =
        typeof error?.message === 'string' ? error?.message : 'Unknown error'

      return left({ message })
    }
  }

  const guestSignIn = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    setGuestUser(true)
  }

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const storedUser = await Storage.getItem(AUTH_STORAGE_KEY)

        if (storedUser) {
          setUser(storedUser)
        }
      } catch (error) {
        console.error(`Error loading user: ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadAsync()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        guestUser,
        isLoading,
        guestSignIn,
        socialSignIn,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
