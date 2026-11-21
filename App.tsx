import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './src/theme/colors';
import { BRANDING } from './src/config/branding';

import { HomeScreen } from './src/screens/HomeScreen';
import { MethodologyScreen } from './src/screens/MethodologyScreen';
import { SimbaScreen } from './src/screens/SimbaScreen';
import { PractitionerScreen } from './src/screens/PractitionerScreen';
import { AuditScreen } from './src/screens/AuditScreen';
import { ContactScreen } from './src/screens/ContactScreen';

type TabKey = 'home' | 'methodology' | 'simba' | 'practitioner' | 'audit' | 'contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'home', label: 'Overview' },
    { key: 'methodology', label: 'Methodology' },
    { key: 'simba', label: 'Simba Demo' },
    { key: 'practitioner', label: 'Founder' },
    { key: 'audit', label: 'Audit' },
    { key: 'contact', label: 'Contact' },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
      case 'methodology':
        return <MethodologyScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
      case 'simba':
        return <SimbaScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
      case 'practitioner':
        return <PractitionerScreen />;
      case 'audit':
        return <AuditScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
      case 'contact':
        return <ContactScreen />;
      default:
        return <HomeScreen onNavigate={(tab) => setActiveTab(tab as TabKey)} />;
    }
  };

  // On native mobile (iOS/Android), store app name is displayed; on web, website title is displayed
  const displayName = Platform.OS === 'web' ? BRANDING.websiteName : BRANDING.storeAppName;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={styles.logoRow}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>E</Text>
          </View>
          <Text style={styles.logoText}>
            {displayName.replace('FinOps', '')}
            <Text style={styles.logoBold}>FinOps</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.headerCta} 
          onPress={() => setActiveTab('contact')}
        >
          <Text style={styles.headerCtaText}>Get In Touch</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Navigation Bar */}
      <View style={styles.navBarContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.navScroll}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.navTab, isActive && styles.navTabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text style={[styles.navTabText, isActive && styles.navTabTextActive]}>
                  {tab.label}
                </Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Active Screen View */}
      <View style={styles.bodyContainer}>
        {renderScreen()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    height: 60,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.primaryBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoMarkText: {
    color: '#d99b26',
    fontWeight: '800',
    fontSize: 16,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  logoBold: {
    fontWeight: '800',
  },
  headerCta: {
    backgroundColor: COLORS.primaryBtn,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  headerCtaText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
  navBarContainer: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  navScroll: {
    paddingHorizontal: 12,
    gap: 4,
  },
  navTab: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    position: 'relative',
  },
  navTabActive: {},
  navTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  navTabTextActive: {
    color: COLORS.primaryBtn,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 14,
    right: 14,
    height: 3,
    backgroundColor: '#d99b26',
    borderRadius: 2,
  },
  bodyContainer: {
    flex: 1,
  },
});
