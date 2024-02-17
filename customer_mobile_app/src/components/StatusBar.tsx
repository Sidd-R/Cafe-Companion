import { View, Text, StatusBar as SB, SafeAreaView } from 'react-native'
import React from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight(true)

const StatusBar = ({color}:{color:string}) => {
  return (
    <View style={{
      height: statusBarHeight,
      width: '100%',
      backgroundColor: color
    }}>
      <SB  barStyle={'light-content'} backgroundColor={color}/>
    </View>
  )
}

export default StatusBar