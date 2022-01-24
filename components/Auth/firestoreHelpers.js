import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';

export function getDocsWithUserID(uid) {
  const db = getFirestore();
  const users = collection(db, 'Users');
  const q = query(users, where('uid', '==', uid));
  return getDocs(q);
}

export function getAllUserDocs() {
  const db = getFirestore();
  const users = collection(db, 'Users');
  const q = query(users);
  return getDocs(q);
}
