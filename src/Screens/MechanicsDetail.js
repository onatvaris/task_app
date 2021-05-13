/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import FlipCard from 'react-native-flip-card';

const MechanicsDetail = ({route, navigation}) => {
  const [Data, setData] = useState();
  const [Query, setQuery] = useState('cards');
  const [loading, setloading] = useState(false);

  const options = {
    method: 'GET',
    url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/${Query}`,
    headers: {
      'x-rapidapi-key': '2cae479794msh00cc3784d922739p1c501cjsn767fe02f7c56',
      'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    },
  };

  useEffect(() => {
    console.log(route.params);
    const details = [];
    const fetchData = async () => {
      const result = await axios.request(options);
      Object.entries(result.data).map((v, i, a) => {
        const {0: cardSet, 1: data} = v;
        data.map((dataValue, i, a) => {
          if (dataValue.mechanics) {
            dataValue.mechanics.map(mechanicValue => {
              if (mechanicValue.name === route.params.mechanicName) {
                details.push(dataValue);
              }
            });
          }
        });
      });

      setData(details);
      setloading(true);
    };
    fetchData();
  }, [Query]);

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <FlipCard
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        onFlipEnd={isFlipEnd => {
          console.log('isFlipEnd', isFlipEnd);
        }}>
        {/* Face Side */}
        <View>
          <Image
            source={{uri: item.img}}
            style={{height: 200, width: 200, resizeMode: 'contain'}}
          />
        </View>
        {/* Back Side */}
        <View>
          <Text>{item.artist}</Text>
          <Text>{item.faction}</Text>
          <Text>{item.cardSet}</Text>
          <Text>{item.faction}</Text>
          <Text>{item.flavor}</Text>
        </View>
      </FlipCard>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {loading === false ? (
        <ActivityIndicator color="#0000ff" size="small" />
      ) : (
        <View>
          <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={item => item.cardId}
            numColumns={2}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default MechanicsDetail;
