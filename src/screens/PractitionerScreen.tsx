import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';
import { BRANDING } from '../config/branding';

export const PractitionerScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>The Founder</Text>
      <Text style={styles.title}>Enterprise Engineering, Boutique Partnership</Text>

      {/* Identity Card */}
      <View style={styles.idCard}>
        <Text style={styles.founderName}>{BRANDING.founder.name}</Text>
        <Text style={styles.founderTitle}>{BRANDING.founder.title}</Text>
        <Text style={styles.founderLocation}>📍 {BRANDING.location}</Text>

        <View style={styles.certRow}>
          {BRANDING.founder.certifications.map((cert) => (
            <View key={cert} style={styles.certBadge}>
              <Text style={styles.certText}>{cert}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Narrative Highlights */}
      <View style={styles.pillarCard}>
        <Text style={styles.pillarTitle}>The Eclectus Origin</Text>
        <Text style={styles.pillarBody}>
          Named after the federated AI/ML tax compliance engine Priyank architected — a system that eliminated over $50 million in historic VAT losses by validating tax data at point of injection.
        </Text>
      </View>

      <View style={styles.pillarCard}>
        <Text style={styles.pillarTitle}>Battle-Tested at Global Scale</Text>
        <Text style={styles.pillarBody}>
          Led P&L optimization and large-scale ERP transformation programmes (SAP, JDE) across 80+ countries and 40+ languages, managing Shared Services P2P/O2C supporting over $500B in global spend.
        </Text>
      </View>

      <View style={styles.pillarCard}>
        <Text style={styles.pillarTitle}>The Partnership Promise</Text>
        <Text style={styles.pillarBody}>
          The executive auditing your P2P/O2C architecture is the same practitioner who will help your team build the solution. Direct access to 22 years of enterprise financial engineering without junior handoffs.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 18 },
  idCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    marginBottom: 20,
  },
  founderName: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  founderTitle: { fontSize: 13, color: COLORS.gold, fontWeight: '600', marginTop: 2, marginBottom: 6 },
  founderLocation: { fontSize: 13, color: COLORS.textMuted, marginBottom: 14 },
  certRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  certBadge: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  certText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary },
  pillarCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  pillarTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  pillarBody: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
});
