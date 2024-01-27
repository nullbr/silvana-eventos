import admin from "firebase-admin";
import { env } from "~/env";

interface FirebaseAdminConfig {
  projectId: string;
  privateKey: string;
  clientEmail: string;
  storageBucket: string;
}

function formatPrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(config: FirebaseAdminConfig) {
  const privateKey = formatPrivateKey(config.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: config.projectId,
    privateKey,
    clientEmail: config.clientEmail,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: env.FIREBASE_PRIVATE_KEY,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  };

  return createFirebaseAdminApp(params);
}
