import { useState, useMemo } from "react";
import {
  SectionList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Checkbox } from "react-native-paper";
import dispensaOriginal from "@/dados/dispensa";
import lista from "@/dados/lista";

const Compra = () => {
  const [selecionados, setSelecionados] = useState<number[]>([]);

  // Cria estrutura filtrada com base nos itens da lista
  const dispensaFiltrada = useMemo(() => {
    const idsNaLista = lista.map((item) => item.id);

    return dispensaOriginal
      .map((secao) => {
        const itensFiltrados = secao.data
          .filter((item) => idsNaLista.includes(item.id))
          .map((item) => {
            const itemLista = lista.find((l) => l.id === item.id);
            return {
              ...item,
              qtd: itemLista?.qtd || 1,
            };
          });

        if (itensFiltrados.length === 0) return null;

        return {
          nome: secao.nome,
          data: itensFiltrados,
        };
      })
      .filter(Boolean) as { nome: string; data: { id: number; nome: string; qtd: number }[] }[];
  }, []);

  const toggleSelecionado = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Compra</Text>

      <SectionList
        sections={dispensaFiltrada}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <View style={styles.headerSecao}>
            <Text style={styles.textoSecao}>{section.nome}</Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.itemContainer,
              index % 2 === 0 ? styles.itemFundo1 : styles.itemFundo2,
            ]}
          >
            <Checkbox
              status={selecionados.includes(item.id) ? "checked" : "unchecked"}
              onPress={() => toggleSelecionado(item.id)}
              color="#007AFF"
              uncheckedColor="#aaa"
            />
            <Text style={styles.itemTexto}>
              {item.nome} ({item.qtd})
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
};

export default Compra;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
  },
  headerSecao: {
    backgroundColor: "#bde0ee",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  textoSecao: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemFundo1: {
    backgroundColor: "#eaf6fc",
  },
  itemFundo2: {
    backgroundColor: "#d6fafe",
  },
  itemTexto: {
    marginLeft: 8,
    fontSize: 16,
  },
});
