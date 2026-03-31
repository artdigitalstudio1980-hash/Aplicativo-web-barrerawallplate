'use client';

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Modal } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { QrCode, X, Plus, Minus, Check } from 'lucide-react-native';
import { api } from '../../libs/api';

export default function InventoryScanScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned || loading) return;
    setScanned(true);
    setLoading(true);
    try {
      const res = await api.get(`/barcodes/scan/${data}`);
      setProduct(res.data.data.variant);
    } catch (err) {
      Alert.alert('Not Found', 'Barcode does not match any product in ERP.');
      setScanned(false);
    } finally {
      setLoading(false);
    }
  };

  const submitAdjustment = async () => {
    try {
      await api.post('/inventory/movements', {
        variantId: product.id,
        warehouseId: 'MAIN_WAREHOUSE_ID', // Replace with real ID or selector
        type: 'AJUSTE',
        quantity: qty,
        reason: 'Mobile Scan Adjustment',
      });
      Alert.alert('Success', 'Stock updated successfully.');
      setProduct(null);
      setScanned(false);
      setQty(1);
    } catch (err) {
      Alert.alert('Error', 'Failed to update stock.');
    }
  };

  if (hasPermission === null) return <View style={styles.centered}><ActivityIndicator color="#8B5CF6" /></View>;
  if (hasPermission === false) return <View style={styles.centered}><Text style={{color: 'white'}}>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      {!product ? (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'code128', 'qr'] }}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.overlay}>
            <View style={styles.scannerBox}>
              <View style={[styles.corner, styles.tl]} />
              <View style={[styles.corner, styles.tr]} />
              <View style={[styles.corner, styles.bl]} />
              <View style={[styles.corner, styles.br]} />
            </View>
            <Text style={styles.instruction}>Scan Product Barcode / QR</Text>
          </View>
        </CameraView>
      ) : (
        <View style={styles.modalView}>
          <View style={styles.productCard}>
            <Text style={styles.pLabel}>PRODUCT DETECTED</Text>
            <Text style={styles.pName}>{product.product.name}</Text>
            <Text style={styles.pSku}>{product.name} ({product.sku})</Text>
            
            <View style={styles.stockInfo}>
              <View>
                <Text style={styles.sLabel}>CURRENT STOCK</Text>
                <Text style={styles.sVal}>{product.stockQuantity}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.sLabel}>PRICE</Text>
                <Text style={styles.sVal}>${Number(product.price).toFixed(2)}</Text>
              </View>
            </View>

            <View style={styles.qtyControl}>
              <TouchableOpacity onPress={() => setQty(q => Math.max(0, q-1))} style={styles.qBtn}><Minus color="white" size={20} /></TouchableOpacity>
              <View style={styles.qDisplay}><Text style={styles.qText}>{qty}</Text></View>
              <TouchableOpacity onPress={() => setQty(q => q+1)} style={styles.qBtn}><Plus color="white" size={20} /></TouchableOpacity>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => {setProduct(null); setScanned(false);}} style={[styles.aBtn, styles.aBtnCancel]}>
                <X color="rgba(255,255,255,0.4)" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={submitAdjustment} style={[styles.aBtn, styles.aBtnSubmit]}>
                <Check color="white" size={20} />
                <Text style={styles.aBtnText}>Update Inventory</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#07070A' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  scannerBox: { width: 250, height: 250, position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: '#8B5CF6', borderWidth: 4 },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  instruction: { color: 'white', marginTop: 40, fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  modalView: { flex: 1, backgroundColor: 'rgba(7, 7, 10, 0.95)', justifyContent: 'center', padding: 24 },
  productCard: { backgroundColor: '#10101A', borderRadius: 32, padding: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  pLabel: { color: '#8B5CF6', fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  pName: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  pSku: { color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 },
  stockInfo: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 32, marginBottom: 32 },
  sLabel: { color: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 'bold' },
  sVal: { color: 'white', fontSize: 20, fontWeight: '900', marginTop: 4 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
  qBtn: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  qDisplay: { flex: 1, height: 56, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  qText: { color: 'white', fontSize: 24, fontWeight: '900' },
  actions: { flexDirection: 'row', gap: 12 },
  aBtn: { height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  aBtnCancel: { width: 56, backgroundColor: 'rgba(255,255,255,0.05)' },
  aBtnSubmit: { flex: 1, backgroundColor: '#8B5CF6', flexDirection: 'row', gap: 8 },
  aBtnText: { color: 'white', fontWeight: 'bold' },
});
