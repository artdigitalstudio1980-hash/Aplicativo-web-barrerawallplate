import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from '../libs/auth';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await auth.getUser();
      const inAuthGroup = segments[0] === '(tabs)';

      if (!user && inAuthGroup) {
        router.replace('/');
      } else if (user && !inAuthGroup) {
        router.replace('/(tabs)');
      }
      setIsLoaded(true);
    };

    checkAuth();
  }, [segments]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#07070A' }}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </View>
    );
  }

  return <Slot />;
}
