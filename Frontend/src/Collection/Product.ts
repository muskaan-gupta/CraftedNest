import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // or wherever your Firebase config is

const addProduct = async () => {
  await addDoc(collection(db, "products"), {
    title: "Sample Product",
    price: 99.99,
    description: "This is a test product.",
    imageUrl: "https://your-image-url.com",
    creatorId: "user_uid_here",
    createdAt: new Date()
  });
};