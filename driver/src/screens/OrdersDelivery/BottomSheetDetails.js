import { useMemo, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import styles from "./styles";
import { useOrderContext } from "../../context/OrderContext";

const BottomSheetDetails = (props) => {
  const { totalKm, totalMinutes } = props;
  const isDriverClose = totalKm <= 1;

  const { order, user, dishes, acceptOrder, completeOrder, pickUpOrder } =
    useOrderContext();

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["12%", "95%"], []);

  const onButtonPressed = async () => {
    if (order.status === "READY_FOR_PICKUP") {
      bottomSheetRef.current?.collapse();
      mapRef.current?.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      acceptOrder();
    }
    if (order.status === "ACCEPTED") {
      bottomSheetRef.current?.collapse();
      pickUpOrder();
    }
    if (order.status === "PICKED_UP") {
      await completeOrder();
      bottomSheetRef.current?.collapse();
      navigation.goBack();
    }
  };

  const STATUS_TO_TITLE = {
    READY_FOR_PICKUP: "Accept Order",
    ACCEPTED: "Pick-Up Order",
    PICKED_UP: "Complete Delivery",
  };

  const renderButtonTitle = () => {
    if (order.status === "READY_FOR_PICKUP") {
      return "Accept Order";
    }
    if (order.status === "ACCEPTED") {
      return "Pick-Up Order";
    }
    if (order.status === "PICKED_UP") {
      return "Completed";
    }
  };

  const isButtonDisabled = () => {
    if (order.status === "READY_FOR_PICKUP") {
      return false;
    }
    if (order.status === "ACCEPTED" && isDriverClose) {
      return false;
    }
    if (order.status === "PICKED_UP" && isDriverClose) {
      return false;
    }
    return true;
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <View style={styles.handleIndicatorContainer}>
        <Text style={styles.routeDetailsText}>
          {totalMinutes.toFixed(1)} min
        </Text>
        <FontAwesome5
          name="shopping-bag"
          size={30}
          color="#3fc060"
          style={{ marginHorizontal: 10 }}
        />
        <Text style={{ fontSize: 25, letterSpacing: 1 }}>
          {totalKm.toFixed(2)} km
        </Text>
      </View>
      <View style={styles.deliveryDetailsContainer}>
        <Text style={styles.restaurantName}>{order.Restaurant.name}</Text>
        <View style={styles.addressContainer}>
          <Fontisto name="shopping-store" size={22} color="grey" />
          <Text style={styles.adressText}>{order.Restaurant.address}</Text>
        </View>
        <View style={styles.addressContainer}>
          <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
          <Text style={styles.adressText}>{user?.address}</Text>
        </View>

        <View style={styles.orderDetailsContainer}>
          {dishes?.map((dishItem) => (
            <Text style={styles.orderItemText} key={dishItem.id}>
              {dishItem.Dish.name} x{dishItem.quantity}
            </Text>
          ))}
        </View>
      </View>
      <Pressable
        style={{
          ...styles.buttonContainer,
          backgroundColor: isButtonDisabled() ? "grey" : "#3fc060",
        }}
        onPress={onButtonPressed}
        disabled={isButtonDisabled()}
      >
        <Text style={styles.buttonText}>{renderButtonTitle()}</Text>
      </Pressable>
    </BottomSheet>
  );
};

export default BottomSheetDetails;
