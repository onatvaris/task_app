/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {FloatingAction} from 'react-native-floating-action';

const {height, width} = Dimensions.get('window');

const App = ({navigation}) => {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [Query, setQuery] = useState('cards');
  const [ChangeSearchText, setChangeSearchText] = useState('');

  const options = {
    method: 'GET',
    url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/${Query}`,
    headers: {
      'x-rapidapi-key': '2cae479794msh00cc3784d922739p1c501cjsn767fe02f7c56',
      'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.request(options);
      let mechanicsNameList = [];
      Object.entries(result.data).map((v, i, a) => {
        const {0: cardSet, 1: data} = v;
        data.map((value, i, a) => {
          if (value.mechanics) {
            value.mechanics.map((machanicsNameValue, i, a) => {
              if (!mechanicsNameList.includes(machanicsNameValue.name)) {
                mechanicsNameList.push(machanicsNameValue.name);
              }
            });
          }
        });
      });
      setData(mechanicsNameList);
      setloading(true);
    };
    fetchData();
  }, [Query]);

  const renderItem = ({item}) => {
    console.log(`item`, item);
    return (
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() =>
          navigation.navigate('Details', {
            mechanicName: item,
          })
        }>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading === false ? (
        <ActivityIndicator color="#0000ff" size="large" />
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item}
            numColumns={2}
          />
          <FloatingAction
            floatingIcon={
              <Image
                style={{height: 26, width: 26, tintColor: 'white'}}
                source={require('../assets/search-interface-symbol.png')}
              />
            }
            overrideWithAction={false}
            buttonSize={50}
            actions={[
              {
                text: 'Search',
                icon: require('../assets/search-interface-symbol.png'),
                name: 'search',
                position: 4,
              },
            ]}
            onPressItem={name => {
              console.log(`selected button: ${name}`);
              navigation.navigate('Search');
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardButton: {
    padding: 10,
    borderWidth: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: (width * 45) / 100,
    borderRadius: 15,
  },
});

export default App;
