import {ScrollView, View,} from 'react-native';
import React from 'react';
import { Button, FAB, Surface, Text } from 'react-native-paper';

const products = [
  {
      "category": "Hot Coffee",
      "description": "The' 30ml \"Wake Me Up\" Coffee Shot",
      "id": 1,
      "large_price": 0.0,
      "med_price": 140.0,
      "name": "Espresso"
  },
  {
      "category": "Hot Coffee",
      "description": "Bass Naam Hi kaapi Hai",
      "id": 2,
      "large_price": 185.0,
      "med_price": 140.0,
      "name": "South Indian Filter Kaapi"
  },
  {
      "category": "Hot Coffee",
      "description": "44ml Extraction From 16gms Of Coffee",
      "id": 3,
      "large_price": 0.0,
      "med_price": 160.0,
      "name": "Double Restritto"
  },
  {
      "category": "Hot Coffee",
      "description": "Authentic Double Ristreto Served With Warm Water(AKA. Up All Night Recovery)",
      "id": 4,
      "large_price": 210.0,
      "med_price": 185.0,
      "name": "Americano"
  },
  {
      "category": "Hot Coffee",
      "description": "Traditional Filter Coffee Decoction Served in A Classic cappuccino Fashion",
      "id": 5,
      "large_price": 240.0,
      "med_price": 215.0,
      "name": "Kaapicino"
  },
  {
      "category": "Hot Coffee",
      "description": "Looks Cute Coffee With A Biased Milk To Milk Foam Ratio And Solid Coffee Composition",
      "id": 6,
      "large_price": 250.0,
      "med_price": 225.0,
      "name": "Cafe Latte"
  },
  {
      "category": "Hot Coffee",
      "description": "\"Safest'Bet Coffee With A Balanced Proportion Of Coffee, Milk And Silky Milk Foam\"",
      "id": 7,
      "large_price": 250.0,
      "med_price": 225.0,
      "name": "Cappuccino"
  },
  {
      "category": "Hot Coffee",
      "description": "Authentic Double Ristreto Served With Warm Water And Some Sweet Irish Syrup (AKA. Up All Night Recovery But Sweet)",
      "id": 8,
      "large_price": 250.0,
      "med_price": 225.0,
      "name": "Irish Americano"
  },
  {
      "category": "Hot Coffee",
      "description": "Cafe Latte Blended With Jaggery Sourced From Villages In Southern India(AKA. Jaggery Bomb)",
      "id": 9,
      "large_price": 250.0,
      "med_price": 225.0,
      "name": "Bella'tte"
  },
  {
      "category": "Hot Coffee",
      "description": "\"Just The Way Our Australian Friends Like It \"More Milk, Less Drama\"",
      "id": 10,
      "large_price": 0.0,
      "med_price": 230.0,
      "name": "Flat white"
  },
  {
      "category": "Hot Coffee",
      "description": "Milk Coftee With Special Dark Cocoa From Madagascar",
      "id": 11,
      "large_price": 260.0,
      "med_price": 235.0,
      "name": "Cafe Mocha"
  },
  {
      "category": "Hot Coffee",
      "description": "Milk Coftee With Special Cocoa From Madgascar Savoured With Konkan Coastal Sea Salt",
      "id": 12,
      "large_price": 300.0,
      "med_price": 275.0,
      "name": "Sea Salt Dark Mocha"
  },
  {
      "category": "Cold Coffee",
      "description": "With manual pour over, the coffee drains directly onto the cold water and ice",
      "id": 13,
      "large_price": 210.0,
      "med_price": 185.0,
      "name": "Iced Americano"
  },
  {
      "category": "Cold Coffee",
      "description": "A No Brainer To I'm Thirsty And It's Hot",
      "id": 14,
      "large_price": 250.0,
      "med_price": 225.0,
      "name": "Iced Latte"
  },
  {
      "category": "Cold Coffee",
      "description": "Classic House Sp cial Frappe Served With Twist of Jaggery",
      "id": 15,
      "large_price": 320.0,
      "med_price": 275.0,
      "name": "Classic Frappe"
  },
  {
      "category": "Cold Coffee",
      "description": "Coffee Frappe With Everyone's Favorite Hazelnut Flavour Notes",
      "id": 16,
      "large_price": 350.0,
      "med_price": 305.0,
      "name": "Hazulnut Frappe"
  },
  {
      "category": "Cold Coffee",
      "description": "Almond Milk Based \"Lactose Free Beat The Heat Solution\"",
      "id": 17,
      "large_price": 350.0,
      "med_price": 305.0,
      "name": "Almond Frappe"
  },
  {
      "category": "Cold Coffee",
      "description": "Tender Coconut And Coffee Frappe Blended With Precision",
      "id": 18,
      "large_price": 350.0,
      "med_price": 305.0,
      "name": "Nariyal Irish Cream Frappe"
  },
  {
      "category": "Cold Coffee",
      "description": "Traditional Filter Kaapi Frappe",
      "id": 19,
      "large_price": 350.0,
      "med_price": 305.0,
      "name": "Original South India Frappe"
  },
  {
      "category": "Cold Coffee",
      "description": "Coffee For The Little Sweet Tooth', Served With Condensed Milk",
      "id": 20,
      "large_price": 350.0,
      "med_price": 305.0,
      "name": "Bon Bon"
  },
  {
      "category": "Cold Coffee",
      "description": "Traditional Filter Kaapi On A Bed of Condensed Milk",
      "id": 21,
      "large_price": 350.0,
      "med_price": 305.0,
      "name": "Viatnamese"
  },
  {
      "category": "Cold Coffee",
      "description": "Premium Madgascar Chocolate Frappe With Chocolate Chips To Balance Textures",
      "id": 22,
      "large_price": 375.0,
      "med_price": 335.0,
      "name": "Madagascar Choco Chip Frappe"
  },
  {
      "category": "Cold Coffee",
      "description": "Frappe Using Matcha Tea Decoction",
      "id": 23,
      "large_price": 450.0,
      "med_price": 405.0,
      "name": "Matcha Frappe"
  },
  {
      "category": "Coffee Coolers",
      "description": "Tonic Water/ Ginger Ale, Espresso sitting On A Bed of Tonic Wator, Tastes Uike A Sparking And Full Body Cousin To The Beverage On Your Mind.",
      "id": 24,
      "large_price": 0.0,
      "med_price": 300.0,
      "name": "Espresso Tonic"
  },
  {
      "category": "Coffee Coolers",
      "description": "Tonic Water/ginger Ale Cold Brewed South Indian Coflee With Tonic, Tastes Mld And Sparking With A Finish Of Subtle Ginger Notes.",
      "id": 25,
      "large_price": 0.0,
      "med_price": 300.0,
      "name": "Malnad Tonic"
  },
  {
      "category": "Not Coffee",
      "description": "Not In The Mood For Coffee But I Want My Daily Caffeine Intake Beverage",
      "id": 26,
      "large_price": 320.0,
      "med_price": 270.0,
      "name": "Hot Chocolate"
  },
  {
      "category": "Not Coffee",
      "description": "Sinfully Dark Chocolate Beverage Matcha Latte",
      "id": 27,
      "large_price": 350.0,
      "med_price": 300.0,
      "name": "Madagascar Hot Chocolate"
  },
  {
      "category": "Not Coffee",
      "description": "Drink Your Tea Matcha",
      "id": 28,
      "large_price": 400.0,
      "med_price": 350.0,
      "name": "Matcha Latte"
  },
  {
      "category": "Manual Brew",
      "description": "",
      "id": 29,
      "large_price": 270.0,
      "med_price": 250.0,
      "name": "Pour Over"
  },
  {
      "category": "Manual Brew",
      "description": "",
      "id": 30,
      "large_price": 270.0,
      "med_price": 250.0,
      "name": "Aeropress"
  },
  {
      "category": "Manual Brew",
      "description": "",
      "id": 31,
      "large_price": 270.0,
      "med_price": 250.0,
      "name": "French Press"
  },
  {
      "category": "Manual Brew",
      "description": "",
      "id": 32,
      "large_price": 330.0,
      "med_price": 300.0,
      "name": "Cold Brew"
  }
]

const ShopScreen = ({navigation}) => {
  // React.useEffect(() => {

  // }, []);

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 30,
    }}>
      
      <Text variant='headlineMedium' style={{
        fontWeight: 'bold',
      }}>Our Products</Text>
  {/* add view button to product */}
      {products.map((product, index) => {
        return (
          <Surface
            key={index}
            style={{
              marginVertical: 10,
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}>
            <Text variant='headlineSmall' style={{fontWeight: 'bold'}}>{product.name}</Text>
            <Text variant='bodyMedium' style={{marginTop: 5}}>{product.description}</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
              <Text variant='bodyLarge' style={{fontWeight: 'bold'}}>Medium: ₹{product.med_price}</Text>
              {product.large_price != 0 && <Text variant='bodyLarge' style={{fontWeight: 'bold'}}>Large: ₹{product.large_price}</Text>}
            </View>

          <Button
            mode='contained'
            style={{
              marginTop: 15,
              // borderRadius: 20,
            }}
            onPress={() => {
              // Add to cart
              navigation.navigate('PRODUCT', {
                product: product,
              });
            }}
          >
            <Text variant='bodyLarge' >
            View
            </Text>
          </Button>
          </Surface>
        );

      }
      )}
      
    </ScrollView>
  );
};

export default ShopScreen;