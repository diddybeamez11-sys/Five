# Five Nights at Diddy's — APK build

This project keeps the original TanStack Start web app and adds a separate static Vite entry for the game.
Capacitor wraps that static bundle as Android.

## Local build

Requirements: Node 22+, Java 21, Android Studio/Android SDK.

npm install
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
Push the project to a GitHub repository, open Actions, select "Build Five Nights at Diddy's APK",
run the workflow, then download the `Five-Nights-At-Diddys-debug` artifact.

The debug APK is installable on Android and is not a Play Store release build.
