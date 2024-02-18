import {View, Dimensions, StyleSheet, Image} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {Surface, Appbar, useTheme, Text} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const theme = useTheme();
  const width = Dimensions.get('window').width;
  const images = [
    require('../assets/banner1.jpg'),
    require('../assets/banner2.jpg'),
    require('../assets/banner3.jpg'),
  ]
  return (
    <ScrollView style={{flex:1}}>
      <Surface style={styles.container}>
        <View style={{position: 'absolute', top: 0}}>
          <Carousel
            loop
            width={width}
            height={220}
            autoPlay={true}
            autoPlayInterval={3000}
            data={[...new Array(3).keys()]}
            scrollAnimationDuration={1000}
            renderItem={({index}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Image
                  source={images[index]}
                  style={{
                    width: width,
                    height: 220,
                    resizeMode: 'stretch',
                  }}
                />
              </View>
            )}
          />
        </View>
        {/*Reels Section*/}
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 20,
            backgroundColor: theme.colors.surface,
          }}>
          <View
            style={{
              borderRadius: 15,
              overflow: 'hidden',
            }}>
            <YoutubePlayer height={200} play={true} videoId={'Nu8kIIL-CDA'} />
          </View>
        </View>
        {/*Reels Section End*/}
        {/*Recommendations Section*/}
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            flex: 1,
          }}>
          <Text style={{ color: '#262626', fontWeight:'900'}} variant='titleLarge'>Recommendations</Text>
        </View>
        {/*Recommendations Section End*/}
      </Surface>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    paddingTop: 220,
    paddingBottom: 20,
    position: 'relative',
    backgroundColor: '#fff9f3',
  },
});
