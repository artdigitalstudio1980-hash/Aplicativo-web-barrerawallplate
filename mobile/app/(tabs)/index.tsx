'use client';

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LayoutDashboard, TrendingUp, Package, Users, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { api } from '../../libs/api';

export default function MobileDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await api.get('/reports/dashboard');
      setStats(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchStats(); }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchStats().finally(() => setRefreshing(false));
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
        <Icon color={color} size={20} />
      </View>
      <View>
        <Text style={styles.cardVal}>{value}</Text>
        <Text style={styles.cardLabel}>{title}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" />}
    >
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome back,</Text>
        <Text style={styles.title}>System Overview</Text>
      </View>

      <View style={styles.grid}>
        <StatCard title="Today's Sales" value={`$${Number(stats?.sales?.today?.total || 0).toFixed(2)}`} icon={TrendingUp} color="#10B981" />
        <StatCard title="Low Stock" value={stats?.overview?.lowStockAlerts || 0} icon={AlertTriangle} color="#FB7185" />
        <StatCard title="Inventory" value={stats?.overview?.totalProducts || 0} icon={Package} color="#8B5CF6" />
        <StatCard title="Clients" value={stats?.overview?.totalClients || 0} icon={Users} color="#06B6D4" />
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {stats?.recentSales?.map((sale: any) => (
        <View key={sale.id} style={styles.saleItem}>
          <View>
            <Text style={styles.saleNum}>{sale.saleNumber}</Text>
            <Text style={styles.saleClient}>{sale.client?.contactName || 'Walk-in'}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.saleTotal}>${Number(sale.total).toFixed(2)}</Text>
            <View style={[styles.statusBadge, { 
              backgroundColor: sale.status === 'COMPLETED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)'
            }]}>
              <Text style={[styles.statusText, { 
                color: sale.status === 'COMPLETED' ? '#10B981' : 'rgba(255, 255, 255, 0.3)'
              }]}>{sale.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#07070A', padding: 20 },
  header: { marginBottom: 24, marginTop: 12 },
  welcome: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600' },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  card: { 
    width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 24, padding: 16, borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.05)', gap: 12 
  },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardVal: { color: 'white', fontSize: 18, fontWeight: '900' },
  cardLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  sectionTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  saleItem: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', 
    borderRadius: 20, padding: 16, marginBottom: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.04)'
  },
  saleNum: { color: 'white', fontSize: 14, fontWeight: 'bold', fontMono: true } as any,
  saleClient: { color: 'rgba(255,255,255,0.3)', fontSize: 12 },
  saleTotal: { color: '#10B981', fontSize: 14, fontWeight: 'bold' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 4 },
  statusText: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase' },
});
