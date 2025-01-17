import { View, Text, FlatList, StyleSheet } from 'react-native';
import products from '../assets/products.json';
import { ProductListItem } from '../components/ProductListItem';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
export default function HomeScreen() {
  return (
   <FlatList
   data={products}
   renderItem= {({item}) => <ProductListItem product={item}/>}
   />

  );
}


 
