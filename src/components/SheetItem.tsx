import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from "react-native"

import {
  decrementCountItem,
  incrementCountItem,
  removeAsBasket,
} from "../store/actions"
import { useStateValue } from "../store/StateProvider"
import colors from "../styles/colors"
import { TItem } from "../types"
import asyncStorage from "../utils/asyncStorage"
import stringShortener from "../utils/stringShortener"

interface Props {
  drink: TItem
}

const width = (Dimensions.get("screen").width / 5) * 1.6

const SheetItem = ({ drink }: Props): JSX.Element => {
  const [, dispatch] = useStateValue()

  const incrementDrink = async () => {
    await asyncStorage.storeItem(drink.item.id.toString(), {
      count: drink.count + 1,
      item: {
        abv: drink.item.abv,
        description: drink.item.description,
        id: drink.item.id,
        image_url: drink.item.image_url,
        name: drink.item.name,
        srm: drink.item.srm,
        tagline: drink.item.tagline,
      },
    })
    dispatch && dispatch(incrementCountItem(drink.item.id))
  }

  const decrementDrink = async () => {
    if (drink.count - 1 === 0) {
      await asyncStorage.removeItem(drink.item.id.toString())
    } else {
      await asyncStorage.storeItem(drink.item.id.toString(), {
        count: drink.count - 1,
        item: {
          abv: drink.item.abv,
          description: drink.item.description,
          id: drink.item.id,
          image_url: drink.item.image_url,
          name: drink.item.name,
          srm: drink.item.srm,
          tagline: drink.item.tagline,
        },
      })
    }
    dispatch && dispatch(decrementCountItem(drink.item.id))
  }

  const deleteItem = async () => {
    await asyncStorage.removeItem(drink.item.id.toString())
    dispatch && dispatch(removeAsBasket(drink.item.id))
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{drink.item.abv}$</Text>
        </View>
        <Image source={{ uri: drink.item.image_url }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{stringShortener(drink.item.name, 20)}</Text>
        <Text style={{ color: colors.white600, marginTop: 10 }}>
          {stringShortener(drink.item.tagline, 20)}
        </Text>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionIncrement}
            onPress={decrementDrink}
          >
            <Text style={styles.textBold}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textBold}>{drink.count}</Text>
          <TouchableOpacity
            style={styles.actionDecrement}
            onPress={incrementDrink}
          >
            <Text style={styles.textBold}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={deleteItem}>
          <MaterialCommunityIcons
            name="delete"
            color={colors.red300}
            size={21}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface Styles {
  actionContainer: ViewStyle
  actionDecrement: ViewStyle
  actionIncrement: ViewStyle
  actions: ViewStyle
  container: ViewStyle
  image: ImageStyle
  imageContainer: ViewStyle
  price: TextStyle
  priceContainer: ViewStyle
  text: TextStyle
  textBold: TextStyle
  textContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  actionContainer: {
    flexDirection: "row",
    height: 20,
    marginTop: 12,
  },
  actionDecrement: {
    alignItems: "center",
    backgroundColor: colors.purple300,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
  actionIncrement: {
    alignItems: "center",
    backgroundColor: colors.red300,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    display: "flex",
    justifyContent: "center",
    padding: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    width: width,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    height: 60,
    width: 18,
  },
  imageContainer: {
    backgroundColor: colors.white800,
    marginHorizontal: 10,
    padding: 10,
    position: "relative",
  },
  price: {
    color: colors.black,
    textAlign: "center",
  },
  priceContainer: {
    alignItems: "center",
    backgroundColor: colors.dodgerblue,
    borderRadius: 8,
    position: "absolute",
    right: -20,
    top: -10,
    width: 45,
  },
  text: {
    color: colors.white,
  },
  textBold: {
    color: colors.white,
    fontWeight: "bold",
  },
  textContainer: {
    flexGrow: 1,
    paddingTop: 12,
  },
})

export default SheetItem
