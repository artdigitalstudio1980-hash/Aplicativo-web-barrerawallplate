'use client';

import { Tabs } from 'expo-router';
import { LayoutDashboard, Warehouse, ClipboardList, LogOut } from 'lucide-react-native';
import { View, TouchableOpacity } from 'react-native';
import { auth } from '../../libs/auth';
import { useRouter } from 'expo-router';

export default function TabsLayout() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await auth.logout();
    router.replace('/');
  };

  return (
    <Tabs screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: '#07070A', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
      headerTitleStyle: { color: 'white', fontWeight: 'bold' },
      tabBarStyle: { 
        backgroundColor: '#07070A', 
        borderTopWidth: 1, 
        borderTopColor: 'rgba(255,255,255,0.06)',
        height: 60,
        paddingBottom: 8
      },
      tabBarActiveTintColor: '#8B5CF6',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.2)',
      tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />
        }} 
      />
      <Tabs.Screen 
        name="inventory" 
        options={{
          title: 'Inventory Scan',
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color }) => <Warehouse color={color} size={24} />
        }} 
      />
      <Tabs.Screen 
        name="sales" 
        options={{
          title: 'Sales & Routes',
          tabBarLabel: 'Sales',
          tabBarIcon: ({ color }) => <ClipboardList color={color} size={24} />
        }} 
      />
      <Tabs.Screen 
        name="logout"
        options={{
          title: 'Logout',
          tabBarLabel: 'Exit',
          tabBarIcon: ({ color }) => <LogOut color={color} size={24} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          }
        }}
      />
    </Tabs>
  );
}
