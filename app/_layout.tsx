import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Dispensa" options={{ title: 'Dispensa' }} />
      <Tabs.Screen name="Compra" options={{ title: 'Compras' }} />
      <Tabs.Screen name="Lista" options={{ title: 'Lista' }} />
    </Tabs>
  );
}
