import dispensa from "@/dados/dispensa";
import { SectionList, Text, View } from "react-native";

const Dispensa = () => {
  return (
    <SectionList
      sections={dispensa}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.nome}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{section.nome}</Text>
          <Text style={{ fontSize: 16, color: 'gray' }}>{section.data.length} itens</Text>
        </View>
      )}
    />
  );
}

export default Dispensa;
