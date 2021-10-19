import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native"
import { Image, Text } from "react-native-elements"

import useAppContext from "../hook/useAppContext"
import colors from "../styles/colors"
import { IDrink } from "../types"
import stringShortener from "../utils/stringShortener"

import Modal from "./Modal"

interface Props {
  drink: IDrink
}

const WIDTH: number = Dimensions.get("screen").width / 3 - 10

const Drink = ({ drink }: Props): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false)
  const appContext = useAppContext()

  const { abv, name, image_url } = drink

  const toggleOverlay = (): void => {
    appContext?.setIndexPoint(0)
    setVisible(!visible)
  }

  return (
    <>
      <TouchableOpacity onPress={toggleOverlay}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <Image source={{ uri: image_url }} style={styles.image} />
          </View>
          <Text style={styles.text}>{stringShortener(name, 11)}</Text>
          <Text style={styles.text}>{abv}$</Text>
        </View>
      </TouchableOpacity>
      <Modal drink={drink} visible={visible} toggleOverlay={toggleOverlay} />
    </>
  )
}

interface Styles {
  container: ViewStyle
  mainContainer: ViewStyle
  text: TextStyle
  image: ImageStyle
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: "center",
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 1,
    height: 150,
    justifyContent: "center",
    padding: 5,
  },
  image: {
    height: 130,
    width: 35,
  },
  mainContainer: {
    marginTop: 13,
    width: WIDTH,
  },
  text: {
    textAlign: "center",
  },
})

export default Drink
