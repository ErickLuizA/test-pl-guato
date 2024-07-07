import { tryParse } from '@/utils/parse/try-parse'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class Storage {
  static setItem(key: string, value: string) {
    return AsyncStorage.setItem(key, value)
  }

  static async getItem(key: string) {
    const response = await AsyncStorage.getItem(key)

    return tryParse(response)
  }

  static removeItem(key: string) {
    return AsyncStorage.removeItem(key)
  }

  static clear() {
    return AsyncStorage.clear()
  }

  static async push(key: string, value: string) {
    const newList = []

    const stored = await this.getItem(key)

    if (stored) {
      newList.push(...stored)
    }

    newList.push(value)

    await this.setItem(key, JSON.stringify(newList))
  }
}
