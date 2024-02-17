import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {Surface, Appbar} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import WebView from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const width = Dimensions.get('window').width;
  return (
    <ScrollView style={{flex:1}}>
      <Surface style={styles.container}>
        <View style={{position: 'absolute', top: 0}}>
          <Carousel
            loop
            width={width}
            height={220}
            autoPlay={true}
            data={[...new Array(6).keys()]}
            scrollAnimationDuration={1000}
            renderItem={({index}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 30, color: '#262626'}}>
                  {index}
                </Text>
              </View>
            )}
          />
        </View>
        {/*Reels Section*/}
        <View
          style={{
            paddingVertical: 30,
            paddingHorizontal: 20,
            backgroundColor: '#ac9c8b',
          }}>
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <YoutubePlayer height={180} play={true} videoId={'Nu8kIIL-CDA'} />
          </View>
        </View>
        {/*Reels Section End*/}
        {/*Recommendations Section*/}
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={{fontSize: 20, color: '#262626', fontWeight:'900'}}>Recommendations</Text>
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
