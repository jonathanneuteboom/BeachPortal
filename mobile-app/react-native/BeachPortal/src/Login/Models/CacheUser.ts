import AsyncStorage from '@react-native-async-storage/async-storage'

import { Cachable } from './Cachable'
import { User } from './User'

class CacheUser implements Cachable<User> {
  user: User | null = null

  getEntity = () => {
    const cacheKey = this.getCacheKey()
    return AsyncStorage.getItem(cacheKey).then(cacheUser => {
      this.user = this.parse(cacheUser)
      return this.user
    })
  }

  getCacheKey = () => 'CACHE_USER'

  setEntity = (user: User): Promise<void> => {
    const cacheKey = this.getCacheKey()
    const cacheUser = this.stringify(user)
    return AsyncStorage.setItem(cacheKey, cacheUser)
  }

  deleteEntity = () => {
    const cacheKey = this.getCacheKey()
    return AsyncStorage.removeItem(cacheKey)
  }

  stringify = (user: User): string => JSON.stringify(user)

  parse = (input: string | null): User | null => {
    if (!input) {
      return null
    }

    const cacheUser = JSON.parse(input)
    if (!cacheUser.id || !cacheUser.token || !cacheUser.username) {
      return null
    }

    return new User(cacheUser.id, cacheUser.username, cacheUser.token)
  }
}

export default CacheUser
