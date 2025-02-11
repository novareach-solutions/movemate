import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {colors} from '../../theme/colors';
import Header from '../../components/Header';
import {
  ProfileScreens,
  ProfileScreensParamList,
} from '../../navigation/ScreenNames';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import PieChart from '../../assets/icons/piechart.svg';

// Sample ratings data
const ratingsData = {
  score: 3.6,
  total: 5,
  history: [
    {id: '#135432', rating: 5, date: 'Dec 20, 2024, 2:15 PM'},
    {id: '#135433', rating: 5, date: 'Dec 20, 2024, 2:15 PM'},
  ],
};

const filterOptions = [
  {label: 'All', value: 'all', count: 0},
  {label: '5★', value: '5', count: 2},
  {label: '4★', value: '4', count: 0},
  {label: '3★', value: '3', count: 0},
  {label: '2★', value: '2', count: 0},
];

const RatingsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('5');
  const navigation = useNavigation<NavigationProp<ProfileScreensParamList>>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <Header isBack title="Ratings" />
      <View style={styles.container}>
        <View style={{paddingHorizontal: 16}}>
          {/* Ratings Graph */}
          <View style={styles.graphContainer}>
            <PieChart />
            <Text style={styles.ratingText}>
              {ratingsData.score.toFixed(1)}
            </Text>
          </View>
          <Text>History</Text>
          {/* Filter Tabs - Now scrollable */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContainer}>
            {filterOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.filterTab,
                  selectedFilter === option.value && styles.activeFilter,
                ]}
                onPress={() => setSelectedFilter(option.value)}>
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === option.value && styles.activeFilterText,
                  ]}>
                  {option.label} ({option.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Order Rating History */}
          <FlatList
            data={ratingsData.history}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.orderCard}>
                <View>
                  <Text style={styles.orderId}>Order ID {item.id}</Text>
                  <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ProfileScreens.OrderDetails, {
                        orderId: 1,
                      });
                    }}>
                    <Text style={styles.viewDetails}>View details &gt;</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightButtonBackground,
  },
  graphContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
  },
  ratingText: {
    position: 'absolute',
    top: 30,
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.purple,
    marginTop: 70,
  },
  filterScrollContainer: {
    flexDirection: 'row',
    paddingVertical: 4,
    gap: 5,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.lightGray,
    // marginHorizontal: 4,
  },
  activeFilter: {
    backgroundColor: colors.purple,
  },
  filterText: {
    fontSize: 14,
    color: colors.black,
  },
  activeFilterText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: colors.text.primaryGrey,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  viewDetails: {
    fontSize: 14,
    color: colors.purple,
    fontWeight: 'bold',
  },
});

export default RatingsScreen;
