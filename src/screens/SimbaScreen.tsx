import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';

export const SimbaScreen: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const [stream, setStream] = useState<'p2p' | 'o2c'>('p2p');
  const [scenario, setScenario] = useState<'uk' | 'de' | 'fr' | 'custom'>('uk');
  const [customRate, setCustomRate] = useState<string>('22');

  const scenariosData = {
    uk: { name: 'UK: Standard VAT (+1%)', oldRate: 20, newRate: 21, cur: '£' },
    de: { name: 'Germany: Stimulus Cut (-3%)', oldRate: 19, newRate: 16, cur: '€' },
    fr: { name: 'France: Services Reclass (-10%)', oldRate: 20, newRate: 10, cur: '€' },
    custom: { name: 'Custom VAT Scenario', oldRate: 20, newRate: parseFloat(customRate) || 20, cur: '£' },
  };

  const currentConfig = scenariosData[scenario];
  const baseAmount = 10000;
  const oldVat = baseAmount * (currentConfig.oldRate / 100);
  const newVat = baseAmount * (currentConfig.newRate / 100);
  const total = baseAmount + newVat;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Eyebrow & Title */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Amazon Innovation · Case Study</Text>
      </View>

      <Text style={styles.title}>Project Simba: Configurable Engine</Text>
      <Text style={styles.subtitle}>
        Moving away from hardcoded monolithic codebases to a decoupled policy engine for Accounts Payable (P2P) and Accounts Receivable (O2C).
      </Text>

      {/* Architecture Comparison Cards */}
      <View style={styles.cardLegacy}>
        <Text style={styles.cardHeaderDanger}>❌ Legacy Monolithic Code</Text>
        <Text style={styles.cardDesc}>
          Tax logic hardcoded inside ERP and backend services. Every statutory update demands code patches, sprint freezes, and full regression cycles.
        </Text>
        <Text style={styles.bulletItem}>• 3–6 month release cycles</Text>
        <Text style={styles.bulletItem}>• Divergent rules across P2P & O2C</Text>
        <Text style={styles.bulletItem}>• High risk of retroactive VAT audit leakage</Text>
      </View>

      <View style={styles.cardSimba}>
        <Text style={styles.cardHeaderSuccess}>⚡ Simba Configurable Platform</Text>
        <Text style={styles.cardDesc}>
          Policy-driven rules matrix decoupled from core code. Business operations update rates instantly across 80+ jurisdictions.
        </Text>
        <Text style={styles.bulletItem}>• Instantaneous rule propagation (&lt; 60 seconds)</Text>
        <Text style={styles.bulletItem}>• Single source of truth for Payables & Receivables</Text>
        <Text style={styles.bulletItem}>• $50M+ historic VAT leakage eliminated at source</Text>
      </View>

      {/* Interactive Simulator Section */}
      <View style={styles.simBox}>
        <Text style={styles.simTitle}>Live VAT Rate Change Simulation</Text>
        <Text style={styles.simSubtitle}>
          Test how a regulatory rate change ripples through a legacy monolith vs. the Simba configurable engine.
        </Text>

        {/* Stream Toggle */}
        <Text style={styles.inputLabel}>Select Workflow Stream:</Text>
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, stream === 'p2p' && styles.toggleBtnActive]}
            onPress={() => setStream('p2p')}
          >
            <Text style={[styles.toggleBtnText, stream === 'p2p' && styles.toggleBtnTextActive]}>
              Payables (P2P)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, stream === 'o2c' && styles.toggleBtnActive]}
            onPress={() => setStream('o2c')}
          >
            <Text style={[styles.toggleBtnText, stream === 'o2c' && styles.toggleBtnTextActive]}>
              Receivables (O2C)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Scenario Buttons */}
        <Text style={styles.inputLabel}>Select Statutory Scenario:</Text>
        <View style={styles.scenarioGrid}>
          {(['uk', 'de', 'fr', 'custom'] as const).map((sc) => (
            <TouchableOpacity
              key={sc}
              style={[styles.scenarioBtn, scenario === sc && styles.scenarioBtnActive]}
              onPress={() => setScenario(sc)}
            >
              <Text style={[styles.scenarioBtnText, scenario === sc && styles.scenarioBtnTextActive]}>
                {scenariosData[sc].name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {scenario === 'custom' && (
          <View style={styles.customInputRow}>
            <Text style={styles.customLabel}>Target VAT Rate (%):</Text>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={customRate}
              onChangeText={setCustomRate}
              placeholder="e.g. 21"
            />
          </View>
        )}

        {/* Comparison Metrics */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCardDanger}>
            <Text style={styles.metricVal}>12–16 wks</Text>
            <Text style={styles.metricSub}>Monolith Lead Time</Text>
            <Text style={styles.metricFoot}>80+ hours dev sprints</Text>
          </View>
          <View style={styles.metricCardSuccess}>
            <Text style={styles.metricValSuccess}>&lt; 60 secs</Text>
            <Text style={styles.metricSub}>Simba Lead Time</Text>
            <Text style={styles.metricFootSuccess}>0 code changes</Text>
          </View>
        </View>

        {/* Live Calculation Box */}
        <View style={styles.calcBox}>
          <Text style={styles.calcHeader}>Live Transaction Calculation</Text>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Net Transaction Amount:</Text>
            <Text style={styles.calcVal}>{currentConfig.cur}{baseAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Original Tax ({currentConfig.oldRate}%):</Text>
            <Text style={styles.calcVal}>{currentConfig.cur}{oldVat.toLocaleString()}</Text>
          </View>
          <View style={[styles.calcRow, styles.calcRowHighlight]}>
            <Text style={styles.calcLabelSuccess}>Simba Adjusted Tax ({currentConfig.newRate}%):</Text>
            <Text style={styles.calcValSuccess}>{currentConfig.cur}{newVat.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.calcRow}>
            <Text style={styles.calcTotalLabel}>Total Compliant Settlement:</Text>
            <Text style={styles.calcTotalVal}>{currentConfig.cur}{total.toLocaleString()}</Text>
          </View>
        </View>

        {/* Stream Impact Note */}
        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>
            {stream === 'p2p' ? 'Procure-to-Pay (P2P) Status:' : 'Order-to-Cash (O2C) Status:'}
          </Text>
          <Text style={styles.noteBody}>
            {stream === 'p2p' 
              ? 'Supplier e-invoices ingested via Peppol/EDI match the dynamic policy matrix instantly with zero hold-ups or dispute backlogs.'
              : 'Customer billing batches pull updated tax matrix rules automatically, generating compliant Peppol XML e-invoices on schedule.'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.ctaBtn} 
          onPress={() => onNavigate('contact')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaBtnText}>Discuss Simba Architecture for Your Stack →</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 12,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.gold, textTransform: 'uppercase' },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 21, marginBottom: 20 },
  cardLegacy: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.danger,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 14,
  },
  cardHeaderDanger: { fontSize: 16, fontWeight: '700', color: COLORS.danger, marginBottom: 6 },
  cardSimba: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.emerald,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 20,
  },
  cardHeaderSuccess: { fontSize: 16, fontWeight: '700', color: COLORS.emerald, marginBottom: 6 },
  cardDesc: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginBottom: 8 },
  bulletItem: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  simBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
  },
  simTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  simSubtitle: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginBottom: 16 },
  inputLabel: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', marginBottom: 8 },
  toggleRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.surfaceAlt,
  },
  toggleBtnActive: { backgroundColor: COLORS.primaryBtn, borderColor: COLORS.primaryBtn },
  toggleBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  toggleBtnTextActive: { color: COLORS.textLight },
  scenarioGrid: { gap: 8, marginBottom: 16 },
  scenarioBtn: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surfaceAlt,
  },
  scenarioBtnActive: { backgroundColor: COLORS.goldLight, borderColor: COLORS.gold },
  scenarioBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  scenarioBtnTextActive: { color: COLORS.gold },
  customInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  customLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 80,
    fontSize: 14,
    backgroundColor: COLORS.surface,
  },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  metricCardDanger: {
    flex: 1,
    backgroundColor: COLORS.dangerLight,
    borderWidth: 1,
    borderColor: COLORS.dangerBorder,
    borderRadius: 8,
    padding: 12,
  },
  metricCardSuccess: {
    flex: 1,
    backgroundColor: COLORS.emeraldLight,
    borderWidth: 1,
    borderColor: COLORS.emeraldBorder,
    borderRadius: 8,
    padding: 12,
  },
  metricVal: { fontSize: 20, fontWeight: '800', color: COLORS.danger },
  metricValSuccess: { fontSize: 20, fontWeight: '800', color: COLORS.emerald },
  metricSub: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, marginTop: 2 },
  metricFoot: { fontSize: 11, color: COLORS.danger, marginTop: 4 },
  metricFootSuccess: { fontSize: 11, color: COLORS.emerald, marginTop: 4 },
  calcBox: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  calcHeader: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', color: COLORS.textMuted, marginBottom: 8 },
  calcRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  calcRowHighlight: { backgroundColor: COLORS.emeraldLight, borderRadius: 4, paddingHorizontal: 6 },
  calcLabel: { fontSize: 13, color: COLORS.textSecondary },
  calcLabelSuccess: { fontSize: 13, fontWeight: '700', color: COLORS.emerald },
  calcVal: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  calcValSuccess: { fontSize: 13, fontWeight: '700', color: COLORS.emerald },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 6 },
  calcTotalLabel: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  calcTotalVal: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  noteBox: {
    backgroundColor: COLORS.surfaceAlt,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.emerald,
    borderRadius: 6,
    padding: 12,
    marginBottom: 18,
  },
  noteTitle: { fontSize: 12, fontWeight: '700', color: COLORS.emerald, marginBottom: 4 },
  noteBody: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  ctaBtn: {
    backgroundColor: COLORS.primaryBtn,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaBtnText: { color: COLORS.textLight, fontWeight: '700', fontSize: 13 },
});
