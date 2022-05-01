import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

const FIRESTORE_COLLECTION_KEY = {
  CAT: "cat",
};

const FIRESTORE_DOCUMENT_NAME = {
  RANKING: "ranking",
};

const firebaseConfig = {
  apiKey: "AIzaSyA6b3tDIkG-42aVYMbK1PvsT710G6-NCXg",
  authDomain: "this-or-that-db.firebaseapp.com",
  projectId: "this-or-that-db",
  storageBucket: "this-or-that-db.appspot.com",
  messagingSenderId: "682399617962",
  appId: "1:682399617962:web:89ac8e04df30eb1bda91d3",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

export async function addCatToRanking(cat) {
  const rankingDocRef = doc(db, FIRESTORE_COLLECTION_KEY.CAT, FIRESTORE_DOCUMENT_NAME.RANKING);
  const rankingSnapshot = await getDoc(rankingDocRef);
  // if ranking not exists, create new empty array
  const catRanking = rankingSnapshot.exists() ? rankingSnapshot.data().items : [];

  // add new item
  const targetItem = catRanking.find((item) => item.name === cat.name);
  if (targetItem) {
    targetItem.count++;
  } else {
    catRanking.push({ ...cat, count: 1 });
  }

  // sort items
  const sortedCatRanking = catRanking
    .sort((a, b) => b.count - a.count)
    .map((item, i) => {
      return { ...item, place: i + 1 };
    });

  try {
    await setDoc(rankingDocRef, { items: sortedCatRanking });
  } catch (error) {
    console.error("error add cat to ranking", error.message);
  }

  return sortedCatRanking;
}

export async function getCatRanking() {
  const rankingDocRef = doc(db, FIRESTORE_COLLECTION_KEY.CAT, FIRESTORE_DOCUMENT_NAME.RANKING);
  const rankingSnapshot = await getDoc(rankingDocRef);

  return rankingSnapshot.exists() ? rankingSnapshot.data().items : [];
}
