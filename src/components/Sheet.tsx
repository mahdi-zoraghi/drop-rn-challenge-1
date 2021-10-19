import { MaterialCommunityIcons } from "@expo/vector-icons"
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Button } from "react-native-elements"

import { getAllItems } from "../store/actions"
import { getBasketTotal } from "../store/reducer"
import { useStateValue } from "../store/StateProvider"
import colors from "../styles/colors"
import { TItem } from "../types"
import { getBasketItems } from "../utils/storage"

import SheetItem from "./SheetItem"

interface Props {
  indexPoint: number
  setIndexPoint: Dispatch<SetStateAction<number>>
}

const Sheet = ({ indexPoint, setIndexPoint }: Props): JSX.Element => {
  const [state, dispatch] = useStateValue()

  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ["15%", "75%"], [])

  const handleSheetChanges = useCallback(
    (index: number) => {
      setIndexPoint(index)
    },
    [setIndexPoint]
  )

  useEffect(() => {
    getBasketItems().then(items => {
      dispatch && dispatch(getAllItems(items))
    })
  }, [dispatch])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={indexPoint}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.background}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="basket-outline"
            color={colors.white}
            size={20}
            style={styles.headerIcon}
          />
          <Text style={styles.text}>Shopping Cart</Text>
        </View>
        <View style={styles.container}>
          <BottomSheetFlatList
            renderItem={({ item }: { item: TItem }) => (
              <SheetItem drink={item} />
            )}
            keyExtractor={(item: TItem): string => item?.item.id.toString()}
            data={state?.basket}
            ListFooterComponent={() => (
              <View style={styles.footer}>
                {state?.basket.length ? (
                  <>
                    <Text style={styles.footerTotal}>
                      {Number(getBasketTotal(state.basket))}$
                    </Text>
                    <Button
                      title="Payment"
                      containerStyle={styles.paymentBtn}
                    />
                  </>
                ) : null}
              </View>
            )}
          />
        </View>
      </View>
    </BottomSheet>
  )
}

interface Styles {
  background: ViewStyle
  container: ViewStyle
  contentContainer: ViewStyle
  footer: ViewStyle
  footerTotal: TextStyle
  header: ViewStyle
  headerIcon: ViewStyle
  indicator: ViewStyle
  paymentBtn: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Styles>({
  background: {
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  footerTotal: {
    color: colors.white,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
  },
  headerIcon: {
    marginRight: 5,
  },
  indicator: {
    backgroundColor: colors.white,
  },
  paymentBtn: {
    borderRadius: 10,
    height: 40,
    marginTop: 10,
    width: "50%",
  },
  text: {
    color: colors.white,
  },
})

export default Sheet
