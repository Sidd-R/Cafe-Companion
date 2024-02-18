import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AppBottomNavigationParamList} from './AppNavigation';
import {Appbar, Button, Surface, Text, useTheme} from 'react-native-paper';
import {ImageBackground, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = NativeStackScreenProps<AppBottomNavigationParamList, 'PRODUCT'>;

const ProductScreen = ({route, navigation}: Props) => {
  const theme = useTheme();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={route.params.product.name} />
      </Appbar.Header>
      <Surface
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: theme.colors.primary,
        }}>
        <ImageBackground
          source={require('../assets/coffee.jpg')}
          style={{
            width: '100%',
            height: 400,
            borderRadius: 10,
            overflow: 'hidden',
            elevation: 5,
          }}
          resizeMode="stretch">
          {/* <Text>{JSON.stringify(route.params.product)}</Text> */}
        </ImageBackground>

        <Surface
          style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 10,
          }}>
          <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
            {route.params.product.name}
          </Text>
          <Text variant="bodyMedium" style={{marginTop: 5}}>
            {route.params.product.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
              Medium: ₹{route.params.product.med_price}
            </Text>
            {route.params.product.large_price != 0 && (
              <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
                Large: ₹{route.params.product.large_price}
              </Text>
            )}
          </View>
          <Button
            mode="contained"
            elevation={5}
            style={{
              marginTop: 19,
              // borderRadius: 20,
            }}
            onPress={() => {
              // Add to cart
              navigation.navigate('ARVIEW');
            }}>
            <Text variant="titleLarge">View in AR</Text>
          </Button>
          <Button
            mode="contained"
            style={{
              marginTop: 19,
            }}
            onPress={() => {
              // Add to cart
            }}>
            <Text
              variant="titleLarge"
              style={{
                marginRight: 10,
              }}>
              Buy Now
            </Text>
            <Icon name="cart" size={20} color={theme.colors.secondary} />
          </Button>
        </Surface>
      </Surface>
    </>
  );
};

export default ProductScreen;
