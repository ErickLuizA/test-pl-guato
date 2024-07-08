import { AppStackParamList } from '@/navigators/app-navigator'
import { AuthStackParamList } from '@/navigators/auth-navigator'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}
