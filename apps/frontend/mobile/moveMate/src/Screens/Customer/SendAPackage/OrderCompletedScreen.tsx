import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../theme/colors";
import { images } from "../../../assets/images/images";
import { useAppDispatch } from "../../../redux/hook";
import { leaveAReviewApi } from "../../../redux/slices/deliverAPackageSlice";

const OrderCompletedScreen = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const dispatch = useAppDispatch();
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async() => {
    console.log("Rating:", rating);
    console.log("Review:", review);
    // Handle submission logic here
    await dispatch(leaveAReviewApi({rating:rating,comment:review,orderId:1})).unwrap()  

  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.lightGrey}}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>

       <images.SuccessGreen width={50} height={50} />
        </View>
      <Text style={styles.title}>Order Completed</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>📍 88 Zurab Gorgiladze St</Text>
        <Text style={styles.cardText}>📍 5 Noe Zhordania St</Text>
        <Text style={styles.cardText}>🕒 Nov 22, 2024 at 3:45 PM</Text>
        <Text style={styles.cardText}>💰 $32</Text>
        <Text style={styles.cardText}>📄 Documents</Text>
      </View>
      <Text style={styles.subtitle}>Your Rating Matters</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Text style={[styles.star, { color: star <= rating ? "gold" : "gray" }]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subtitle}>Leave a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Leave a review or suggestion"
        value={review}
        onChangeText={setReview}
        multiline
      />
      <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      </View>
     
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, },
  imageContainer:{alignItems:'center',marginBottom:10},
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: { padding: 15, borderRadius: 10, backgroundColor: "#F7F7F7", marginBottom: 20,borderWidth:1,borderColor:colors.border.greyD3 },
  cardText:{marginVertical:10},
  subtitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  ratingContainer: { flexDirection: "row", marginBottom: 20 },
  star: { fontSize: 30, marginHorizontal: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor:colors.white,
    flex:1,
    padding: 10,
    height: 80,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  button: { backgroundColor: colors.purple, padding: 12, borderRadius: 12, alignItems: "center", },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footer:{flex:1,justifyContent:'flex-end'}
});

export default OrderCompletedScreen;