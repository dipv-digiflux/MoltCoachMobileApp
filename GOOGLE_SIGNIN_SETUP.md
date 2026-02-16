# Google Sign-In Setup

This app uses `@react-native-google-signin/google-signin` for Google SSO. Follow these steps to complete the setup.

## 1. Google Cloud / Firebase Configuration

### Enable Google Sign-In

1. Go to [Firebase Console](https://console.firebase.google.com) → your project → **Authentication** → **Sign-in method**
2. Enable **Google** as a sign-in provider
3. This creates OAuth 2.0 credentials in Google Cloud

### Get OAuth Client IDs

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your Firebase project
3. You need:
   - **Web client ID** (type: Web application) — for `GOOGLE_WEB_CLIENT_ID`
   - **iOS client ID** (type: iOS) — for the Info.plist URL scheme

## 2. Environment Variables

Add to `.env.staging` and `.env.production`:

```
GOOGLE_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID.apps.googleusercontent.com
```

Use the **Web client ID** from Firebase/Google Cloud (not the iOS client ID).

## 3. iOS Configuration

1. **URL scheme** — In `ios/MoltApp/Info.plist`, replace `com.googleusercontent.apps.REVERSED_CLIENT_ID` in `CFBundleURLSchemes` with your **reversed iOS client ID**:

   - From your iOS OAuth client ID (e.g. `123456789-xxx.apps.googleusercontent.com`)
   - The URL scheme is: `com.googleusercontent.apps.123456789-xxx`

2. Run `pod install` in the `ios/` directory.

## 4. Android Configuration

Android uses the `webClientId` from `GoogleSignin.configure()`, which reads `GOOGLE_WEB_CLIENT_ID` from your env. No extra native config needed if you have `google-services.json` in place.

## 5. Backend API

Implement a `POST /auth/google` endpoint that:

**Request body:**

```json
{ "idToken": "<Google ID token>" }
```

**Response (success):**

```json
{
  "user": { "id": "...", "name": "...", "email": "..." },
  "tokens": { "accessToken": "...", "refreshToken": "..." }
}
```

The backend must:

1. Verify the `idToken` with Google (e.g. using a Google Auth library)
2. Extract email/name from the verified token
3. Find or create the user in your database
4. Return your app’s user and tokens

Existing users get a login; new users get a signup — same response shape.
