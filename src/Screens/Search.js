/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const Search = () => {
  const [Query, setQuery] = useState('');
  const [ChangeSearchText, setChangeSearchText] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Ref, setRef] = useState();

  const options = {
    method: 'GET',
    url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/search/${Query}`,
    headers: {
      'x-rapidapi-key': '2cae479794msh00cc3784d922739p1c501cjsn767fe02f7c56',
      'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setData([]);
      //   let dataArray = [];
      try {
        if (Query !== '') {
          setLoading(false);
          const result = await axios.request(options);
          result.data.map((v, i, a) => {
            console.log(v);
            setData(oldData => [...oldData, v]);
            // dataArray.push(v);
          });
        }
        // setData(dataArray);
        setLoading(true);
      } catch (err) {
        const response = Object.entries(err.response.data);
        Toast.show({
          text1: 'Error',
          text2: response[1][1],
          position: 'bottom',
          type: 'error',
          visibilityTime: 1000,
        });
      }
    };

    fetchData();
  }, [Query]);

  const renderItem = ({item}) => {
    console.log(`item`, item.cardId);
    return <Text onPress={() => console.log(item)}>{item.cardId}</Text>;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          flex: 0.07,
        }}>
        <Image
          style={{height: 24, width: 24}}
          source={require('../assets/search-interface-symbol.png')}
        />
        <TextInput
          style={{
            width: (width * 90) / 100,
            height: 40,
            paddingLeft: 15,
            borderBottomWidth: 1,
            marginLeft: 10,
          }}
          placeholder="Card Search"
          onChangeText={text => setQuery(text)}
        />
      </View>
      <View style={{flex: 0.93, backgroundColor: 'red'}}>
        {Loading === false ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{alignSelf: 'center', flex: 1}}
          />
        ) : (
          <View>
            <Text onPress={() => console.log(Data)}>asdfasdf</Text>
            <FlatList
              data={Data}
              renderItem={renderItem}
              keyExtractor={item => item.dbfId}
            />
          </View>
        )}
      </View>

      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
