import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';
import { BRANDING } from '../config/branding';

export const ContactScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!firstName || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>Get In Touch</Text>
      <Text style={styles.title}>Start Your Collaborative Diagnostic</Text>
      <Text style={styles.lead}>
        Tell us about your current P2P/O2C setup. We'll schedule a no-obligation discovery call.
      </Text>

      {submitted ? (
        <View style={styles.successCard}>
          <Text style={styles.successIcon}>✓</Text>
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successBody}>
            We have received your details and will respond within one business day.
          </Text>
        </View>
      ) : (
        <View style={styles.formCard}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Jane"
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Smith"
          />

          <Text style={styles.label}>Work Email *</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="jane.smith@company.com"
          />

          <Text style={styles.label}>Company *</Text>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={setCompany}
            placeholder="Acme Ltd"
          />

          <Text style={styles.label}>Current Challenge or Systems</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            placeholder="Tell us about your P2P/O2C systems or questions regarding 2029 Peppol..."
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Discovery Request</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Direct Contact Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Direct Contact</Text>
        <Text style={styles.infoItem}>✉️ {BRANDING.contactEmail}</Text>
        <Text style={styles.infoItem}>🌐 {BRANDING.websiteUrl}</Text>
        <Text style={styles.infoItem}>📍 {BRANDING.location}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  eyebrow: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: COLORS.gold, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 10 },
  lead: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, marginBottom: 20 },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 20,
  },
  label: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted, textTransform: 'uppercase', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 14,
    backgroundColor: COLORS.surfaceAlt,
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: COLORS.primaryBtn,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  submitText: { color: COLORS.textLight, fontWeight: '700', fontSize: 14 },
  successCard: {
    backgroundColor: COLORS.emeraldLight,
    borderWidth: 1,
    borderColor: COLORS.emeraldBorder,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: { fontSize: 32, color: COLORS.emerald, marginBottom: 8 },
  successTitle: { fontSize: 20, fontWeight: '800', color: COLORS.emerald, marginBottom: 6 },
  successBody: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20 },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  infoTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 10 },
  infoItem: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 6 },
});
