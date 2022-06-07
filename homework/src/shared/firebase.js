import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//auth 설정해주기
import { getFirestore } from "firebase/firestore";
//파이어스토어도 여기서 같이 설정
import { getStorage } from "firebase/storage";
//이미지 가져오기 위해 임포트

const firebaseConfig = {
  //인증정보!
  apiKey: "AIzaSyAopRj_pqzjOnk7a3Il2Jeumx6pgW5p6aw",
  authDomain: "authex-bbc58.firebaseapp.com",
  projectId: "authex-bbc58",
  storageBucket: "authex-bbc58.appspot.com",
  messagingSenderId: "751364926241",
  appId: "1:751364926241:web:3c3615869b8869500cac60",
  measurementId: "G-KP54Y3M1KP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
//export auth 해주기
export const db = getFirestore(app);
//파이어스토어도 사용할 수 있도록 export
export const storage = getStorage(app);
//스토리지 export
export default app;
