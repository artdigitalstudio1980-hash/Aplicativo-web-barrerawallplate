'use client';

import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, KeyboardAvoidingView, Platform, 
  Dimensions, ActivityIndicator 
} from 'react-native';
import { motion } from 'framer-motion'; // Check if framer-motion-native or similar is needed, else use Reanimated
import { ShieldCheck, Mail, Lock, ArrowRight, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../libs/auth';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await auth.login(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Connection failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient 
        colors={['#07070A', '#10101A', '#07070A']} 
        style={styles.gradient}
      >
        {/* Background Orbs effect simulation with nested gradients */}
        <View style={styles.topOrb} />
        <View style={styles.bottomOrb} />

        <View style={styles.content}>
          <View style={styles.header}>
            <LinearGradient 
              colors={['#8B5CF6', '#6366F1']} 
              style={styles.logoContainer}
            >
              <ShieldCheck color="white" size={40} />
            </LinearGradient>
            <Text style={styles.title}>Barrera{'\n'}ERP Mobile</Text>
            <Text style={styles.subtitle}>Enterprise Resource Systems</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Secure Login</Text>
              <Text style={styles.cardSubtitle}>Enter your enterprise credentials</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                <View style={styles.inputWrapper}>
                  <Mail color="rgba(255,255,255,0.1)" size={18} style={styles.inputIcon} />
                  <TextInput 
                    value={email}
                    onChangeText={setEmail}
                    placeholder="name@barrerawallplate.com"
                    placeholderTextColor="rgba(255,255,255,0.1)"
                    style={styles.input}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ACCESS CODE</Text>
                <View style={styles.inputWrapper}>
                  <Lock color="rgba(255,255,255,0.1)" size={18} style={styles.inputIcon} />
                  <TextInput 
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,255,255,0.1)"
                    style={styles.input}
                    secureTextEntry
                  />
                </View>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity 
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
                style={styles.button}
              >
                <LinearGradient 
                  colors={['#8B5CF6', '#4F46E5']} 
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.buttonGradient}
                >
                  {loading ? <ActivityIndicator color="white" /> : (
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Establish Connection</Text>
                      <ArrowRight color="white" size={18} />
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerTag}>
              <Globe color="rgba(255,255,255,0.2)" size={12} />
              <Text style={styles.footerTagText}>GLOBAL SYSTEM V2.0</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, width },
  topOrb: { 
    position: 'absolute', top: -100, left: -100, 
    width: 300, height: 300, borderRadius: 150, 
    backgroundColor: 'rgba(139, 92, 246, 0.1)', filter: 'blur(60px)' as any 
  },
  bottomOrb: { 
    position: 'absolute', bottom: -100, right: -100, 
    width: 300, height: 300, borderRadius: 150, 
    backgroundColor: 'rgba(79, 70, 229, 0.1)', filter: 'blur(60px)' as any
  },
  content: { flex: 1, padding: 32, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 40 },
  logoContainer: { 
    width: 80, height: 80, borderRadius: 24, 
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 20, elevation: 10, marginBottom: 24
  },
  title: { 
    color: 'white', fontSize: 32, fontWeight: '900', 
    letterSpacing: -1, textAlign: 'center', lineHeight: 36 
  },
  subtitle: { 
    color: 'rgba(255,255,255,0.3)', fontSize: 13, 
    fontWeight: '600', marginTop: 8 
  },
  card: { 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 40, borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.08)', padding: 32 
  },
  cardHeader: { marginBottom: 24 },
  cardTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  cardSubtitle: { color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  inputLabel: { color: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: '900', letterSpacing: 1, marginLeft: 16 },
  inputWrapper: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', height: 56
  },
  inputIcon: { marginLeft: 16 },
  input: { flex: 1, color: 'white', fontSize: 14, paddingHorizontal: 12 },
  button: { height: 56, borderRadius: 20, overflow: 'hidden', marginTop: 12 },
  buttonGradient: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  buttonText: { color: 'white', fontSize: 15, fontWeight: 'bold' },
  errorText: { color: '#fb7185', fontSize: 12, fontWeight: '600', textAlign: 'center' },
  footer: { marginTop: 40, alignItems: 'center' },
  footerTag: { flexDirection: 'row', alignItems: 'center', gap: 8, opacity: 0.5 },
  footerTagText: { color: 'white', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
});
