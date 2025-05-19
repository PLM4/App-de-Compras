import React from 'react';
import { SectionList, StyleSheet, Text, View } from "react-native";
import dispensa from "../dados/dispensa";

interface ItemProps {
  nome: string
}

interface SectionHeaderProps{
  title: string,
  count: number,
}

interface SectionData {
  id: number,
  nome: string,
}

interface Section {
  nome: string,
  data: SectionData[];
}

const Item: React.FC<ItemProps> = ({ nome }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{nome}</Text>
  </View>
);

const SectionHeader: React.FC<SectionHeaderProps> = ({title, count}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionCount}>{count} itens</Text>
    </View>
  );
};

const Dispensa = () => {
  return (
    <SectionList<SectionData>
      sections={dispensa as Section[]}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Item nome={item.nome} />}
      renderSectionHeader={({ section }) => (
        <SectionHeader title={section.nome} count={section.data.length} />
      )}
      contentContainerStyle={styles.listContainer}
      stickySectionHeadersEnabled
    />
  );
};

export default Dispensa;


const styles = StyleSheet.create({
    listContainer: {
      paddingHorizontal: 16,
      paddingBottom: 20,
    },

    itemContainer: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: '#F8F9FA',
      borderRadius: 6,
      marginVertical: 4,  
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: "#ADD8E6",
      borderRadius: 8,
      marginVertical: 8,

    },

    sectionCount: {
      fontSize: 14,
      color: '#555'
    },
  
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: '#333'    
    },
 
    itemText: {
      fontSize: 16,
      color: '#333'
    }
}); 