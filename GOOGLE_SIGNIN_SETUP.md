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
   - **Web client ID** (type: Web application) — for `GOOGLE_WEB_CLIENT_ID` and for your backend to verify the token
   - **iOS client ID** (type: iOS) — required for iOS only; do **not** use the Web client for iOS (Google returns "Custom scheme URIs are not allowed for 'WEB' client type")

### Create the iOS OAuth client (required for iOS)

1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials) → **Credentials** → **Create Credentials** → **OAuth client ID**
2. Application type: **iOS**
3. Name: e.g. "Molt iOS" or "Molt Staging iOS"
4. Bundle ID: must match your app (e.g. `com.molt.coach` for staging)
5. Create. Copy the **Client ID** (e.g. `31980184670-abcdefg.apps.googleusercontent.com`).

## 2. Environment Variables

Add to `.env`, `.env.staging`, and/or `.env.production`:

```
GOOGLE_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID.apps.googleusercontent.com
```

For **iOS**, also add (use the **iOS** OAuth client ID from the step above, not the Web one):

```
GOOGLE_IOS_CLIENT_ID=YOUR_IOS_CLIENT_ID.apps.googleusercontent.com
```

## 3. iOS Configuration

1. **URL scheme** — In `ios/MoltApp/Info.plist`, replace `com.googleusercontent.apps.REVERSED_IOS_CLIENT_ID` in `CFBundleURLSchemes` with your **reversed iOS client ID**:

   - From your **iOS** OAuth client ID (e.g. `31980184670-abcdefg.apps.googleusercontent.com`)
   - The URL scheme is: `com.googleusercontent.apps.31980184670-abcdefg` (the part before `.apps.googleusercontent.com`, with `com.googleusercontent.apps.` in front)

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
