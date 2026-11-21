import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

export const MethodologyScreen: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Our Approach</Text>
      <Text style={styles.title}>The Co-Building Methodology</Text>
      <Text style={styles.lead}>
        "Eclectus" means drawn from diverse sources. We take the eclectic, complex mix of your existing P2P and O2C systems and synthesize them into a unified, compliant data flow.
      </Text>

      {/* Pillar 1: Eliminate */}
      <View style={[styles.card, { borderTopColor: COLORS.emerald }]}>
        <Text style={styles.cardNum}>01</Text>
        <Text style={styles.cardTitle}>Eliminate</Text>
        <Text style={styles.cardSubtitle}>Freeing Your People</Text>
        <Text style={styles.cardBody}>
          Strip out manual interventions and redundant legacy checkpoints in P2P and O2C cycles. Pristine data capture at source drastically reduces compliance risk.
        </Text>
        <Text style={styles.cardOutcome}>✓ Eliminate legacy manual checkpoints</Text>
        <Text style={styles.cardOutcome}>✓ Pristine data capture at source</Text>
        <Text style={styles.cardOutcome}>✓ Reduce downstream compliance risk</Text>
      </View>

      {/* Pillar 2: Automate */}
      <View style={[styles.card, { borderTopColor: COLORS.gold }]}>
        <Text style={styles.cardNum}>02</Text>
        <Text style={styles.cardTitle}>Automate</Text>
        <Text style={styles.cardSubtitle}>Engineering Resilience</Text>
        <Text style={styles.cardBody}>
          Co-implement AI/ML-driven workflows — such as modular invoice matching engines — to create zero-touch data flows meeting Peppol standards by default.
        </Text>
        <Text style={styles.cardOutcome}>✓ AI/ML invoice matching engines</Text>
        <Text style={styles.cardOutcome}>✓ Zero-touch Peppol-compliant flows</Text>
        <Text style={styles.cardOutcome}>✓ Real-time tax validation at injection</Text>
      </View>

      {/* Pillar 3: Optimize */}
      <View style={[styles.card, { borderTopColor: '#3b82f6' }]}>
        <Text style={styles.cardNum}>03</Text>
        <Text style={styles.cardTitle}>Optimize</Text>
        <Text style={styles.cardSubtitle}>Accelerating VAT Recovery & Cash Flow</Text>
        <Text style={styles.cardBody}>
          Restructure the overall ecosystem to elevate your team's impact on the P&L. Maximize ability to swiftly reclaim VAT refunds and optimize working capital.
        </Text>
        <Text style={styles.cardOutcome}>✓ Accelerated VAT reclaim capability</Text>
        <Text style={styles.cardOutcome}>✓ Improved working capital position</Text>
        <Text style={styles.cardOutcome}>✓ P&L impact, not just compliance</Text>
      </View>

      <TouchableOpacity 
        style={styles.ctaBtn} 
        onPress={() => onNavigate('contact')}
      >
        <Text style={styles.ctaBtnText}>Schedule a Readiness Diagnostic</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 10 },
  lead: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, marginBottom: 20 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderTopWidth: 4,
    padding: 18,
    marginBottom: 16,
  },
  cardNum: { fontSize: 26, fontWeight: '800', color: COLORS.border, position: 'absolute', top: 12, right: 16 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  cardSubtitle: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: COLORS.textMuted, marginBottom: 10 },
  cardBody: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, marginBottom: 12 },
  cardOutcome: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 4 },
  ctaBtn: {
    backgroundColor: COLORS.primaryBtn,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  ctaBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 13 },
});
