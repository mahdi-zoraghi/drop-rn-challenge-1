import AsyncStorage from "@react-native-async-storage/async-storage"

const PREFIX = "@challenge1-"

const storeItem = async (key: string, value: object): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(`${PREFIX}${key}`, jsonValue)
  } catch (error) {
    console.log("error::", error)
  }
}

const getItem = async <T>(
  key: string,
  prefix: boolean = true
): Promise<T | null> => {
  try {
    const jsonValue: string | null = await AsyncStorage.getItem(
      prefix ? `${PREFIX}${key}` : key
    )
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.log("error::", error)
    return null
  }
}

const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(`${PREFIX}${key}`)
  } catch (error) {
    console.log("error::", error)
  }
}

const getAllKeys = async (): Promise<string[] | void> => {
  let keys: string[] = []
  try {
    keys = await AsyncStorage.getAllKeys()
    return keys
  } catch (error) {
    console.log("error::", error)
  }
}

const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log("error::", error)
  }
}
export default { clearAll, getAllKeys, getItem, removeItem, storeItem }
