import React from 'react'
import { ArViewerView } from 'react-native-ar-viewer'
import { Appbar, Surface, Text, TouchableRipple } from 'react-native-paper'
import RNFS from 'react-native-fs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppBottomNavigationParamList } from './AppNavigation'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = NativeStackScreenProps<AppBottomNavigationParamList, 'ARVIEW'>;

const ARViewScreen = ({navigation}:Props) => {


  const [localModelPath, setLocalModelPath] = React.useState('')
  const [showArView, setShowArView] = React.useState(true);
  const ref = React.useRef() as React.MutableRefObject<ArViewerView>;
  const reset = () => {
    ref.current?.reset();
  };

  const rotate = () => {
    ref.current?.rotate(0, 25, 0);
  };


  const mountUnMount = () => setShowArView(!showArView);

  const loadPath = async () => {
    const modelSrc ='https://github.com/navneetnair7/BookStore/blob/main/coffee_cup.glb?raw=true'
    const modelPath = `${RNFS.DocumentDirectoryPath}/model2.glb`;
    const exists = await RNFS.exists(modelPath);
    if (!exists) {
      await RNFS.downloadFile({
        fromUrl: modelSrc,
        toFile: modelPath,
      }).promise;
    }

    setLocalModelPath(modelPath);
    console.log('modelPath', modelPath);
    
  };

  React.useEffect(() => {
    // console.log(require("../assets/banner3.jpg"));
    
    loadPath();
  });
  return (
    <Surface style={{
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center'
    
    }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <Appbar.Content title="AR View" />
      </Appbar.Header>
       <ArViewerView
          model={localModelPath}
          style={{flex: 6, zIndex: 1000, width: '100%', height: '100%'}}
          // disableInstantPlacement
          manageDepth
          allowRotate
          allowScale
          allowTranslate
          onStarted={() => console.log('started')}
          onEnded={() => console.log('ended')}
          onModelPlaced={() => console.log('model displayed')}
          onModelRemoved={() => console.log('model not visible anymore')}
          ref={ref}
        />
       {/* <Text>ARViewScreen</Text> */}
       <Surface style={styles.footer}>
        {/* <TouchableRipple onPress={takeSnapshot} style={styles.button}>
          <Text>Take Snapshot</Text>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={mountUnMount} style={styles.button}>
          <Text>{showArView ? 'Unmount' : 'Mount'}</Text>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={reset} style={styles.button}>
          <Text>Reset</Text>
        </TouchableRipple> */}
        <TouchableRipple onPress={rotate} style={styles.button}>
          <View style={{flexDirection:'row',gap:4}}>
          <Text variant='bodyLarge'>Rotate</Text>
          <Icon name="rotate-360"  color="black" size={25} />
          </View>
        </TouchableRipple>
      </Surface>
     </Surface>
  )
}

export default ARViewScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  arView: {
    flex: 5,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 15,
  },
});