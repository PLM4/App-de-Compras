import { IItemDispensa, useCompra } from "@/contextos/ContextoCompra";
import Feather from "@expo/vector-icons/Feather";
import { memo, useCallback, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface PropsItem {
  item: IItemDispensa;
}

export default function Dispensa() {
  const [modalSecaoVisible, setModalSecaoVisible] = useState(false);
  const [modalItemVisible, setModalItemVisible] = useState(false);
  const [nomeSecao, setNomeSecao] = useState<string>("");
  const [nomeItem, setNomeItem] = useState<string>("");
  const [idSecao, setIdSecao] = useState<number | undefined>(undefined);
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const {
    dispensa,
    adicionaSecao,
    removeSecao,
    adicionaItem,
    removeItem,
    incrementaQuantidadeDispensa,
    decrementaQuantidadeDispensa,
  } = useCompra();

  const RenderItem = memo((props: PropsItem) => {
    const { item } = props;

    return (
      <View
        style={[
          styles.item,
          { backgroundColor: item.qtdDispensa == 0 ? "#F0F8FF" : "#DCE6F5" },
        ]}
      >
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Feather name="trash-2" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.itemText}>{item.nome}</Text>
        <Button
          title="-"
          onPress={() => decrementaQuantidadeDispensa(item.id)}
        />
        <Text style={{ fontSize: 18, marginHorizontal: 5 }}>
          {item.qtdDispensa}
        </Text>
        <Button
          title="+"
          onPress={() => incrementaQuantidadeDispensa(item.id)}
        />
      </View>
    );
  });

  const renderItem = useCallback(
    ({ item }: { item: IItemDispensa }) => <RenderItem item={item} />,
    [dispensa]
  );

  function RenderSection(props: {
    id: number;
    nome: string;
    isExpanded: boolean;
    onToggle: () => void;
  }) {
    const { id, nome, isExpanded, onToggle } = props;

    return (
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => removeSecao(id)}>
          <Feather name="trash-2" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.sectionText}>{nome}</Text>
        <Button title="+" onPress={() => abreModalItem(id)} />
        <TouchableOpacity style={{ padding: 10 }} onPress={onToggle}>
          {" "}
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  function salvarSecao() {
    if (nomeSecao.trim().length > 0) {
      adicionaSecao(nomeSecao.trim());
      setNomeSecao("");
      setModalSecaoVisible(false);
    } else {
      Alert.alert("É necessário definir o nome da seção que será inserida.");
    }
  }

  function salvarItem() {
    if (nomeItem.trim().length > 0) {
      adicionaItem(Number(idSecao), nomeItem.trim());
      setNomeItem("");
      setIdSecao(undefined);
      setModalItemVisible(false);
    } else {
      Alert.alert("É necessário definir o nome do item que será inserido.");
    }
  }

  function abreModalItem(id: number) {
    setIdSecao(id);
    setModalItemVisible(true);
  }

  // Define a Section type for SectionList
  type Section = {
    id: number;
    nome: string;
    data: IItemDispensa[];
  };

  return (
    <SafeAreaView>
      <SectionList<IItemDispensa, Section>
        sections={dispensa.map((section) => ({
          id: section.id,
          nome: section.nome,
          data: expandedSections[section.nome] ? section.data : [],
        }))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <RenderSection
            id={section.id}
            nome={section.nome}
            isExpanded={!!expandedSections[section.nome]}
            onToggle={() => toggleSection(section.nome)}
          />
        )}
        ListHeaderComponent={() => (
          <TouchableOpacity
            onPress={() => setModalSecaoVisible(true)}
            style={styles.addSectionButton}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Adicionar seção
            </Text>
          </TouchableOpacity>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSecaoVisible}
        onRequestClose={() => {
          setModalSecaoVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Digite o nome da seção"
              defaultValue={nomeSecao}
              onChangeText={(novoValor) => setNomeSecao(novoValor)}
              style={styles.textInput}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
                title="Cancelar"
                onPress={() => setModalSecaoVisible(false)}
              />
              <View style={{ width: 50 }} />
              <Button title="Salvar" onPress={salvarSecao} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalItemVisible}
        onRequestClose={() => {
          setModalItemVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Digite o nome do item"
              defaultValue={nomeItem}
              onChangeText={(novoValor) => setNomeItem(novoValor)}
              style={styles.textInput}
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
                title="Cancelar"
                onPress={() => setModalItemVisible(false)}
              />
              <View style={{ width: 50 }} />
              <Button title="Salvar" onPress={salvarItem} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "95%",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textInput: {
    borderWidth: 1,
    width: "100%",
  },

  sectionHeader: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#E0E0E0",
  },

  sectionText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  itemText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  addSectionButton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ADD8E6",
    borderRadius: 5,
  },
});
