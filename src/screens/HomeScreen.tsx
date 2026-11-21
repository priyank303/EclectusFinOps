import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { BRANDING } from '../config/branding';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Badge */}
      <View style={styles.badge}>
        <View style={styles.badgeDot} />
        <Text style={styles.badgeText}>UK 2029 E-Invoicing Mandate</Text>
      </View>

      {/* Hero Headline */}
      <Text style={styles.headline}>
        Turn the 2029{'\n'}
        <Text style={styles.headlineAccent}>E-Invoicing Mandate</Text>{'\n'}
        into a Working Capital Advantage.
      </Text>

      <Text style={styles.subheadline}>
        We partner with mid-market finance teams to engineer resilient Procure-to-Pay (P2P) and Order-to-Cash (O2C) infrastructure. No top-down mandates, no theoretical slide decks — just collaborative FinOps engineering.
      </Text>

      {/* CTA Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.primaryBtn} 
          onPress={() => onNavigate('contact')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryBtnText}>Schedule Diagnostic</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.ghostBtn} 
          onPress={() => onNavigate('simba')}
          activeOpacity={0.8}
        >
          <Text style={styles.ghostBtnText}>Explore Simba Demo</Text>
        </TouchableOpacity>
      </View>

      {/* Key Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>$500B+</Text>
          <Text style={styles.statLabel}>Global Spend Managed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>$50M+</Text>
          <Text style={styles.statLabel}>VAT Losses Eliminated</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>80+</Text>
          <Text style={styles.statLabel}>Countries Covered</Text>
        </View>
      </View>

      {/* Trust Bar */}
      <View style={styles.trustBar}>
        <Text style={styles.trustItem}>✓ Peppol-Ready Architecture</Text>
        <Text style={styles.trustItem}>✓ 22+ Years Enterprise Experience</Text>
        <Text style={styles.trustItem}>✓ AI/ML Configurable Engines</Text>
      </View>

      {/* 2029 Mandate Cliff Section */}
      <View style={styles.card}>
        <Text style={styles.cardEyebrow}>Regulatory Milestone</Text>
        <Text style={styles.cardTitle}>The 2029 E-Invoicing Cliff</Text>
        <Text style={styles.cardBody}>
          The UK Government's April 2029 mandate for Peppol-network e-invoicing is rapidly approaching. 
          Technical standards finalize by Spring 2027. We adapt your existing P2P/O2C data feeds seamlessly into your accounting systems without operational disruption.
        </Text>
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ Don't wait for 2027 technical standards to begin your architecture review.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.goldLight,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.gold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    lineHeight: 36,
    marginBottom: 14,
  },
  headlineAccent: {
    color: COLORS.gold,
    fontStyle: 'italic',
  },
  subheadline: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  primaryBtn: {
    backgroundColor: COLORS.primaryBtn,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
  },
  primaryBtnText: {
    color: COLORS.textLight,
    fontWeight: '700',
    fontSize: 14,
  },
  ghostBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
  },
  ghostBtnText: {
    color: COLORS.textPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 24,
  },
  statBox: {
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  statDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 8,
  },
  trustBar: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
    gap: 8,
  },
  trustItem: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
  },
  cardEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: COLORS.gold,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
    marginBottom: 14,
  },
  warningBox: {
    backgroundColor: COLORS.goldLight,
    borderWidth: 1,
    borderColor: COLORS.goldBorder,
    borderRadius: 6,
    padding: 12,
  },
  warningText: {
    fontSize: 12,
    color: COLORS.gold,
    fontWeight: '600',
    lineHeight: 18,
  },
});
