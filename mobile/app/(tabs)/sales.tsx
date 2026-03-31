'use client';

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { UserPlus, Package, Trash2, Send, Search, Building2 } from 'lucide-react-native';
import { api } from '../../libs/api';
import { useRouter } from 'expo-router';

export default function MobileSalesScreen() {
  const router = useRouter();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/clients?limit=50').then(r => setClients(r.data.data)).catch(console.error);
  }, []);

  const searchProducts = async (q: string) => {
    setSearch(q);
    if (q.length < 2) return setProducts([]);
    try {
      const res = await api.get(`/products?search=${q}&limit=5`);
      const all = res.data.data.flatMap((p: any) => p.variants.map((v: any) => ({ ...v, productName: p.name })));
      setProducts(all);
    } catch (e) { console.error(e); }
  };

  const addToCart = (item: any) => {
    if (cart.find(i => i.id === item.id)) return;
    setCart([...cart, { ...item, qty: 1 }]);
    setProducts([]);
    setSearch('');
  };

  const updateQty = (id: string, q: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + q) } : i));
  };

  const submitConsignment = async () => {
    if (!selectedClient || cart.length === 0) return Alert.alert('Error', 'Please select a client and add products.');
    setSubmitting(true);
    try {
      await api.post('/consignments', {
        clientId: selectedClient,
        warehouseId: 'MAIN_WAREHOUSE_ID',
        items: cart.map(i => ({
          variantId: i.id,
          quantitySent: i.qty,
          unitPrice: Number(i.price)
        }))
      });
      Alert.alert('Success', 'Consignment order created.');
      setCart([]);
      setSelectedClient(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to create consignment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.label}>SELECT CLIENT</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.clientList}>
          {clients.map(c => (
            <TouchableOpacity 
              key={c.id} 
              onPress={() => setSelectedClient(c.id)}
              style={[styles.clientChip, selectedClient === c.id && styles.clientChipSelected]}
            >
              <Building2 color={selectedClient === c.id ? 'white' : 'rgba(255,255,255,0.4)'} size={14} />
              <Text style={[styles.clientChipText, selectedClient === c.id && styles.clientChipTextSelected]}>{c.contactName}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>ADD PRODUCTS</Text>
        <View style={styles.searchBox}>
          <Search color="rgba(255,255,255,0.2)" size={18} style={styles.searchIcon} />
          <TextInput 
            value={search}
            onChangeText={searchProducts}
            placeholder="Search by SKU or Name..."
            placeholderTextColor="rgba(255,255,255,0.2)"
            style={styles.searchInput}
          />
        </View>

        {products.map(p => (
          <TouchableOpacity key={p.id} onPress={() => addToCart(p)} style={styles.pRes}>
            <Text style={styles.pResText}>{p.productName} — {p.name}</Text>
            <Text style={styles.pResPrice}>${p.price}</Text>
          </TouchableOpacity>
        ))}

        <Text style={[styles.label, { marginTop: 32 }]}>ORDER ITEMS</Text>
        {cart.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cartName}>{item.productName}</Text>
              <Text style={styles.cartVar}>{item.name}</Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
              <Text style={styles.qtyVal}>{item.qty}</Text>
              <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setCart(cart.filter(c => c.id !== item.id))} style={styles.delBtn}>
              <Trash2 color="#FB7185" size={16} />
            </TouchableOpacity>
          </View>
        ))}
        {cart.length === 0 && <Text style={styles.empty}>Empty selection</Text>}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          onPress={submitConsignment} 
          disabled={submitting}
          style={[styles.mainBtn, (submitting || !selectedClient || cart.length === 0) && { opacity: 0.5 }]}
        >
          {submitting ? <ActivityIndicator color="white" /> : (
            <>
              <Send color="white" size={18} />
              <Text style={styles.mainBtnText}>Post Consignment</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07070A' },
  scroll: { flex: 1, padding: 20 },
  label: { color: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 12 },
  clientList: { marginBottom: 32, flexDirection: 'row' },
  clientChip: { 
    flexDirection: 'row', alignItems: 'center', gap: 8, 
    backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, 
    paddingVertical: 10, borderRadius: 14, marginRight: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)'
  },
  clientChipSelected: { backgroundColor: '#8B5CF6', borderColor: '#A78BFA' },
  clientChipText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600' },
  clientChipTextSelected: { color: 'white' },
  searchBox: { 
    flexDirection: 'row', alignItems: 'center', height: 50, 
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 14, 
    paddingHorizontal: 16, marginBottom: 8 
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, color: 'white', fontSize: 14 },
  pRes: { padding: 16, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, marginBottom: 4, flexDirection: 'row', justifyContent: 'space-between' },
  pResText: { color: 'white', fontSize: 13 },
  pResPrice: { color: '#10B981', fontWeight: 'bold' },
  cartItem: { 
    flexDirection: 'row', alignItems: 'center', gap: 12, 
    backgroundColor: 'rgba(255,255,255,0.02)', padding: 16, 
    borderRadius: 20, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: '#8B5CF6'
  },
  cartName: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  cartVar: { color: 'rgba(255,255,255,0.3)', fontSize: 12 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4 },
  qtyBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  qtyVal: { color: 'white', fontWeight: 'bold', minWidth: 20, textAlign: 'center' },
  delBtn: { marginLeft: 4 },
  empty: { color: 'rgba(255,255,255,0.1)', fontSize: 12, textAlign: 'center', marginTop: 24, fontStyle: 'italic' },
  bottomBar: { padding: 20, backgroundColor: '#07070A', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.06)' },
  mainBtn: { 
    height: 60, backgroundColor: '#8B5CF6', borderRadius: 20, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    shadowColor: '#8B5CF6', shadowOpacity: 0.3, shadowRadius: 15, elevation: 8
  },
  mainBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
