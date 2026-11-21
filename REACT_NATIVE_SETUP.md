# EclectusFinOps — Universal React Native (iOS, Android & Web)

This repository now contains a **Universal Cross-Platform React Native application** powered by Expo, designed to run natively on **iOS**, **Android**, and the **Web** from a single codebase.

---

## 📱 Store Naming & Web Decoupling

Per your requirements:
- **iOS App Store & Google Play Store Name**: Fixed as **`"EclectusFinOps"`**
  - **iOS Bundle ID**: `com.eclectusfinops.app`
  - **Android Package**: `com.eclectusfinops.app`
  - Configured in [app.json](file:///Users/priyankshah/Desktop/EclectusFinOps/app.json).
- **Website Name**: Configurable independently in [src/config/branding.ts](file:///Users/priyankshah/Desktop/EclectusFinOps/src/config/branding.ts) under `BRANDING.websiteName`. Updating the website name in the future will **not** affect your mobile app store identity.

---

## 🚀 Quick Start & Development

Ensure you have Node.js (v18+) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run on Web
```bash
npx expo start --web
```
Runs the application in your desktop browser.

### 3. Run on iOS (iPhone / iPad)
```bash
npx expo start --ios
```
*You can also scan the QR code using the **Expo Go** app on your physical iPhone.*

### 4. Run on Android
```bash
npx expo start --android
```
*Or scan the QR code using the **Expo Go** app on your physical Android device.*

---

## 🏗️ Project Architecture

```
EclectusFinOps/
├── App.tsx                    # Main App entry point & responsive navigation
├── app.json                   # Expo configuration (iOS & Android store metadata)
├── package.json               # React Native & Expo dependencies
├── babel.config.js            # Babel preset configuration
├── tsconfig.json              # TypeScript configuration
├── sync.sh                    # One-command daily GitHub sync across laptops
│
└── src/
    ├── config/
    │   └── branding.ts        # Centralized branding (store app name vs website name)
    ├── theme/
    │   └── colors.ts          # Unified design palette (Midnight, Navy, Gold, Sage)
    └── screens/
        ├── HomeScreen.tsx     # Hero, 2029 Mandate badge, Trust indicators, Stats
        ├── MethodologyScreen.tsx # Eliminate, Automate, Optimize framework
        ├── SimbaScreen.tsx    # Amazon Case Study & Interactive VAT Rate Simulator
        ├── PractitionerScreen.tsx # Founder Priyank Shah & Credentials
        ├── AuditScreen.tsx    # Fixed-Scope Diagnostic
        └── ContactScreen.tsx  # Dynamic discovery inquiry form
```

---

## 📦 Building for Apple App Store & Google Play Store

When you are ready to generate store production builds, you can use EAS (Expo Application Services):

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Configure Build Profiles**:
   ```bash
   eas build:configure
   ```

3. **Build iOS App Store `.ipa`**:
   ```bash
   eas build --platform ios
   ```

4. **Build Google Play Store `.aab`**:
   ```bash
   eas build --platform android
   ```

---

## 💻 Syncing Between Two Laptops

Run your daily sync script before switching machines:

- **End of Day (Push to GitHub)**:
  ```bash
  ./sync.sh push "Daily progress on React Native app"
  ```
- **Next Day on Laptop 2 (Pull from GitHub)**:
  ```bash
  ./sync.sh pull
  ```
