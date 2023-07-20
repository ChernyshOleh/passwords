// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKvk6ruIo5s1722ak-J8wrVs8s3ZYPjXE",
  authDomain: "passwords-45624.firebaseapp.com",
  projectId: "passwords-45624",
  storageBucket: "passwords-45624.appspot.com",
  messagingSenderId: "720433965633",
  appId: "1:720433965633:web:8b26e96508685eba7f74c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

// Функция для добавления данных в firebase
export async function addDocuments(documents, key, uid) {
  try {
    for (const doc of documents) {
      const querySnapshot = await getDocs(
        query(collection(db, key), where("id", "==", doc.id))
      );
      if (querySnapshot.empty) {
        await addDoc(collection(db, key), { ...doc, uid });
        console.log(`Документ '${doc.id}' успешно добавлен.`);
      } else {
        console.log(`Документ '${doc.id}' уже существует и не будет добавлен.`);
      }
    }
    console.log("Документы успешно добавлены.");
  } catch (error) {
    console.error("Ошибка при добавлении документов:", error);
  }
}

// Функция для удаления документов, которых нет локально
export async function removeMissingDocuments(localDocuments, key, uid) {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, key), where("uid", "==", uid))
    );
    const remoteDocuments = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { ...data, docId: doc.id };
    });

    for (const remoteDoc of remoteDocuments) {
      const existsLocally = localDocuments.some(
        (localDoc) => localDoc.id === remoteDoc.id
      );
      if (!existsLocally) {
        await deleteDoc(doc(collection(db, key), remoteDoc.docId));
        console.log(`Документ '${remoteDoc.id}' успешно удален из Firebase.`);
      }
    }
  } catch (error) {
    console.error("Ошибка при удалении документов:", error);
  }
}

// Получить данные по ключу (одну коллекцию) с фильтром по пользователю
export async function getDocuments(key, uid) {
  const col = collection(db, key);
  const snapshot = await getDocs(col);
  const list = snapshot.docs
    .map((doc) => {
      const item = doc.data();
      if (item.uid === uid) {
        return { ...item, docId: doc.id };
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);
  return list;
}
