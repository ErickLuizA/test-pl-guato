import { SocialProvider } from '@/constants/enums'
import { User } from '@/types/user'

type MockUser = Record<SocialProvider, User>

export const MOCK_USERS: MockUser = {
  [SocialProvider.Google]: {
    lastName: 'Page',
    firstName: 'Larry',
    phoneCountryCode: 1,
    phoneNumber: 4185438090,
    email: 'googleuser@google.com',
  },
  [SocialProvider.Facebook]: {
    lastName: 'Zuckerberg',
    firstName: 'Mark',
    phoneCountryCode: 1,
    phoneNumber: 5875302271,
    email: 'facebookuser@meta.com',
  },
  [SocialProvider.Apple]: {
    lastName: 'Jobs',
    firstName: 'Steve',
    phoneCountryCode: 1,
    phoneNumber: 4047241937,
    email: 'appleuser@apple.com',
  },
}
