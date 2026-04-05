import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

/**
 * On web, constrains content to a centered column with a max-width that
 * looks good on desktop. On native it renders children directly with no
 * wrapping overhead.
 */
export function WebContainer({ children }: Props) {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }
  return (
    <View style={styles.outer}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',   // centers the inner column
    backgroundColor: '#F8F9FA', // matches Colors.background
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: 768,
  },
});
