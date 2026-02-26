# Push Notifications Setup Checklist

This app uses **Firebase Cloud Messaging (FCM)** with `@react-native-firebase/app`, `@react-native-firebase/messaging`, and `@notifee/react-native` for foreground display. Complete the steps below in the Firebase Console and (for iOS) the Apple Developer Portal.

---

## 1. Firebase Console

### 1.1 Create or use an existing project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a project or select **MoltApp** (or your project name)

### 1.2 Android

- **Add app** (or use existing): register package name `com.molt.app`
- Download **google-services.json** and place it in:
  - `android/app/src/staging/google-services.json`
  - `android/app/src/production/google-services.json`  
    (or the single flavor path you use)
- No extra FCM configuration required for Android; the SDK uses the config in `google-services.json`

### 1.3 iOS

- **Add app** (or use existing): register your iOS app with the **Bundle ID** that matches Xcode (e.g. `com.molt.app`)
- Download **GoogleService-Info.plist** and add it to the `ios/MoltApp` folder in Xcode (drag into the project, ensure “Copy items if needed” and the MoltApp target are selected)
- **Cloud Messaging (APNs)**:
  - In Firebase: Project Settings → Cloud Messaging → **Apple app configuration**
  - You will upload the **APNs Authentication Key (.p8)** from the Apple Developer Portal (see below)

### 1.4 (Optional) Test from Firebase

- In Firebase Console: **Engage** → **Messaging** → **Create your first campaign** (or **New campaign** → **Firebase Notification messages**)
- Send a test message; use the FCM token you get from the push service (e.g. from `getFCMToken()` after permission is granted)

---

## 2. Apple Developer Portal (iOS only)

### 2.1 Identifiers

- Go to [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list) → **Identifiers**
- Select your **App ID** (e.g. `com.molt.app`)
- Ensure **Push Notifications** is enabled (edit the identifier and check the capability)
- Save

### 2.2 APNs Authentication Key (.p8)

- Go to **Keys** → **+** to create a new key
- Name it (e.g. “MoltApp APNs”)
- Enable **Apple Push Notifications service (APNs)**
- Continue → Register → **Download** the `.p8` file (you can only download it once)
- Note the **Key ID**
- In **Certificates, Identifiers & Profiles** → **Keys** → select the key and note the **Key ID**

### 2.3 App-specific password (optional, for older flows)

- If you use an APNs certificate instead of a key, you need an APNs certificate and (for some setups) an app-specific password. For FCM with **APNs Auth Key**, the `.p8` key is enough.

### 2.4 Upload APNs key to Firebase

- Firebase Console → Project Settings → **Cloud Messaging**
- Under **Apple app configuration** → **APNs Authentication Key**
- Upload the `.p8` file
- Enter **Key ID** and **Team ID** (from Apple Developer account)
- Enter **Bundle ID** (e.g. `com.molt.app`)
- Save

---

## 3. Xcode (iOS)

### 3.1 Capabilities

- Open `ios/MoltApp.xcworkspace` in Xcode
- Select the **MoltApp** target → **Signing & Capabilities**
- Click **+ Capability** and add:
  - **Push Notifications**
  - **Background Modes** → enable **Remote notifications**

### 3.2 GoogleService-Info.plist

- Ensure **GoogleService-Info.plist** is in the project and added to the **MoltApp** target (see Firebase step 1.3)

### 3.3 Pods

- From project root:  
  `cd ios && pod install`
- Then build and run

---

## 4. App states and behavior

| State      | Who shows the notification                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| Foreground | App (via Notifee in `pushNotificationService`)                                                                      |
| Background | System (from FCM notification payload)                                                                              |
| Quit       | System (from FCM notification payload); app can be woken by background handler in `index.js` for data-only messages |

- **Foreground**: FCM message is received in JS; we display a local notification with Notifee.
- **Background / Quit**: If the FCM payload includes a `notification` block (title/body), the OS shows the notification. Data-only messages can be handled in the background handler in `index.js` (keep work minimal).

---

## 5. Getting the FCM token and backend

- **Permission and token** are not requested at app launch. At root we only set up listeners so that tapping a notification can route.
- **`registerPushNotifications(onToken?)`** in `src/services/pushNotificationService.ts` does everything: ensures Android channels, requests notification permission (Notifee on Android 13+, Firebase on iOS), gets the FCM token only if granted, and returns `Promise<string | null>`. Optionally pass an `onToken` callback. **This function is not called from anywhere yet**—call it when you need the token (e.g. after login) and send the returned token to your backend as needed.
- Use the [Firebase Admin SDK](https://firebase.google.com/docs/cloud-messaging/server) (or HTTP v1 API) on your server to send messages to that token or to topics.

---

## 6. Notification categories (multi-category)

The app supports **multiple notification categories** so users can control channels in system settings (Android) and you can route by type (tasks, meals, profile, promotions, general).

### Backend FCM payload (data)

When sending from your server, include in the **data** payload (or in the **notification** payload for title/body):

| Key                  | Values                                                       | Purpose                                              |
| -------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| `type` or `category` | `tasks` \| `meals` \| `profile` \| `promotions` \| `general` | Picks Android channel and in-app tab/screen routing  |
| `screen`             | e.g. `TaskDetails`, `MealsHome`, `ProfileHome`               | Target screen when user taps the notification        |
| `id`                 | e.g. task id, meal id                                        | Passed as `taskId` (or similar) to the target screen |

**Example (send as FCM data):**

```json
{
  "type": "tasks",
  "screen": "TaskDetails",
  "id": "task-123"
}
```

- **Android**: Each category has its own channel (`fcm_tasks`, `fcm_meals`, etc.); users can mute or change importance per category in system settings.
- **Routing**: When the user taps a notification, the app opens the correct tab and, if `screen`/`id` are set, the target screen (e.g. Home → TaskDetails with `taskId`).

To add or rename categories, update `NotificationCategory` and `CATEGORY_CHANNELS` in `src/types/pushNotification.types.ts` and `src/services/pushNotificationService.ts`, and the routing map in `src/navigation/notificationNavigation.ts`.

---

## 7. Quick reference

| Item                          | Where                                                                                                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FCM token                     | `registerPushNotifications()` in `src/services/pushNotificationService.ts` — returns token or null, manages channels + permission; not called anywhere yet; call when you need it (e.g. after login) |
| Categories                    | `src/types/pushNotification.types.ts` (`NotificationCategory`, `NOTIFICATION_CATEGORIES`)                                                                                                            |
| Channels (Android)            | `src/services/pushNotificationService.ts` (`CATEGORY_CHANNELS`, `ensureAllChannels`)                                                                                                                 |
| Foreground display            | `src/services/pushNotificationService.ts` (Notifee, per-category channel)                                                                                                                            |
| Background handler            | `index.js` → `setBackgroundMessageHandler`                                                                                                                                                           |
| Notification opened / routing | `App.tsx` → `onNotificationOpened`; `src/navigation/notificationNavigation.ts` (`handleNotificationOpen`)                                                                                            |
| iOS native                    | `ios/MoltApp/AppDelegate.swift` (delegates, APNs token)                                                                                                                                              |
| Android native                | `AndroidManifest.xml` (POST_NOTIFICATIONS), `app/build.gradle` (firebase-messaging)                                                                                                                  |
