import admin from "firebase-admin";
import serviceAccount from "./service_account.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("Firebase admin init error", error.stack);
  }
}

export default admin.firestore();
