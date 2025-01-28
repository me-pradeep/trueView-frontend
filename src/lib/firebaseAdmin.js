import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();
export { auth };
