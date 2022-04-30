import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6b3tDIkG-42aVYMbK1PvsT710G6-NCXg",
  authDomain: "this-or-that-db.firebaseapp.com",
  projectId: "this-or-that-db",
  storageBucket: "this-or-that-db.appspot.com",
  messagingSenderId: "682399617962",
  appId: "1:682399617962:web:89ac8e04df30eb1bda91d3"
};

const firebaseApp = initializeApp(firebaseConfig);
// provider는 로그인 방법(google, github, facebook등)을 제공하는 객체 정도로 생각하면 될 것 같다.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// auth는 앱의 모든 authentication에 대한 데이터를 가지고있는 캐시? 정도로 생각하자.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// firestore에 JSON넣는 함수
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export async function createUserDocumentFromAuth(userAuth, additionalInformation = {}) {
  if (!userAuth) return;
  // google 팝업으로 부터 auth를 받아옴
  // auth에 있는 user에 있는 uid(user identifier, unique id)를 document 이름으로 이용하자.
  // doc은 document 포인터라고 생각하자.
  const userDocRef = doc(db, "users", userAuth.uid);
  // userDocRef를 이용하면 해당 document에 읽기, 쓰기등을 할 수 있다.
  const userSnapshot = await getDoc(userDocRef);

  // 데이터가 존재하지 않는 경우 생성
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      // setDoc을 이용해 데이터 쓰기를 하자!
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
}

// email과 password를 이용해 user를 생성하고 로그인할 수 있다.
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// 로그아웃
export const signOutUser = async () => {
  return await signOut(auth);
};

// auth 상태가 바뀔 때 호출할 callback을 등록할 수 있다.
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
