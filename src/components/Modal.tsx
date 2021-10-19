import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native"
import { Button, Overlay, Text } from "react-native-elements"
import ViewMoreText from "react-native-view-more-text"

import { addToBasket, incrementCountItem } from "../store/actions"
import { useStateValue } from "../store/StateProvider"
import colors from "../styles/colors"
import { IDrink, TItem } from "../types"
import asyncStorage from "../utils/asyncStorage"

const HEIGHT = (Dimensions.get("window").height / 5) * 2

interface Props {
  visible: boolean
  toggleOverlay: () => void
  drink: IDrink
}

const Modal = ({ visible, toggleOverlay, drink }: Props): JSX.Element => {
  const [, dispatch] = useStateValue()

  const addToCart = async (): Promise<void> => {
    const item = await asyncStorage.getItem<TItem>(drink.id.toString())
    const itemForStore = {
      abv: drink.abv,
      description: drink.description,
      id: drink.id,
      image_url: drink.image_url,
      name: drink.name,
      srm: drink.srm,
      tagline: drink.tagline,
    }
    if (item) {
      await asyncStorage.storeItem(drink.id.toString(), {
        count: item.count + 1,
        item: itemForStore,
      })
      dispatch && dispatch(incrementCountItem(drink.id))
    } else {
      await asyncStorage.storeItem(drink.id.toString(), {
        count: 1,
        item: itemForStore,
      })
      dispatch &&
        dispatch(
          addToBasket({
            count: 1,
            item: itemForStore,
          })
        )
    }
    toggleOverlay()
  }

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
    >
      <ScrollView>
        <TouchableOpacity onPress={toggleOverlay}>
          <MaterialCommunityIcons name="close" color={colors.red} size={25} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text h4 style={[styles.text, styles.textHead]}>
            {drink.name}
          </Text>
          <Text style={styles.text}>{drink.tagline}</Text>
          <Text style={styles.text}>{drink.abv}</Text>
          <ViewMoreText
            numberOfLines={2}
            renderViewMore={(
              onPress: (event: GestureResponderEvent) => void
            ): JSX.Element => (
              <Text style={[styles.text, styles.textMute]} onPress={onPress}>
                View more
              </Text>
            )}
            renderViewLess={(
              onPress: (event: GestureResponderEvent) => void
            ): JSX.Element => (
              <Text style={[styles.text, styles.textMute]} onPress={onPress}>
                View less
              </Text>
            )}
          >
            <Text style={styles.text}>{drink.description}</Text>
          </ViewMoreText>
          <Text style={styles.text}>{drink.srm}$</Text>
        </View>
        <Button title="ADD TO CART" onPress={addToCart} />
      </ScrollView>
    </Overlay>
  )
}

interface Styles {
  container: ViewStyle
  overlay: ViewStyle
  text: TextStyle
  textHead: TextStyle
  textMute: TextStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    padding: 15,
  },
  overlay: {
    backgroundColor: colors.black,
    borderRadius: 10,
    height: HEIGHT,
    width: "90%",
  },
  text: {
    color: colors.white,
  },
  textHead: {
    marginBottom: 5,
  },
  textMute: {
    opacity: 0.5,
  },
})

export default Modal
