import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

export const AuditScreen: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.badge}>Fixed-Scope Engagement</Text>
      <Text style={styles.title}>The E-Invoicing & Tax Readiness Audit</Text>
      <Text style={styles.lead}>
        A fixed-scope collaborative diagnostic of your invoice mix, P2P/O2C resilience, and tax reporting readiness ahead of the 2029 Peppol mandate.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What the Audit Delivers:</Text>
        {[
          'Invoice mix diagnostic & volume breakdown',
          'P2P/O2C infrastructure resilience assessment',
          'Multi-jurisdictional tax logic mapping',
          'Peppol-readiness gap analysis',
          'VAT recovery acceleration roadmap',
          'Collaborative action plan with internal finance',
        ].map((item, idx) => (
          <View key={idx} style={styles.featureRow}>
            <Text style={styles.check}>✓</Text>
            <Text style={styles.featureText}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.primaryBtn} 
        onPress={() => onNavigate('contact')}
      >
        <Text style={styles.primaryBtnText}>Schedule Readiness Audit →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gold,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 10 },
  lead: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, marginBottom: 20 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 20,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 12 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  check: { color: COLORS.emerald, fontWeight: '800', marginRight: 8, fontSize: 14 },
  featureText: { fontSize: 13, color: COLORS.textSecondary, flex: 1, lineHeight: 19 },
  primaryBtn: {
    backgroundColor: COLORS.primaryBtn,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 14 },
});
