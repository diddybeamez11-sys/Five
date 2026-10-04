# Five Nights at Diddy's — APK build

This project keeps the original TanStack Start web app and adds a separate static Vite entry for the game.
Capacitor wraps that static bundle as Android.

## Local build

Requirements: Node 22+, Java 21, Android Studio/Android SDK.

npm ci
npm run build:mobile
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug

APK:
android/app/build/outputs/apk/debug/app-debug.apk

If android/ already exists, skip `npx cap add android` and use:
npm run cap:sync
cd android
./gradlew assembleDebug

## Release APK

After configuring your own Android signing key:

npx cap build android --androidreleasetype APK

Do not commit passwords or keystores to the repository.

## Android-only workflow

Use the included `.github/workflows/android-apk.yml`.
It builds on pushes to `main` and `arena/**`, or can be run manually from GitHub Actions.
Download the `Five-Nights-At-Diddys-debug` artifact from the completed workflow run.

The debug APK is installable on Android and is not a Play Store release build.
