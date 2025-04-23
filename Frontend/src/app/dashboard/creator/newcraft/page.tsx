"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";
import {  storage, auth } from "@/firebase";
import {  addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleAddProduct = async () => {
    if (!title || !desc || !price || !image) {
      alert("All fields are required!");
      return;
    }

    setUploading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in");
        return;
      }

      const imageRef = ref(storage, `productImages/${user.uid}-${Date.now()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "products"), {
        title,
        description: desc,
        price: parseFloat(price),
        imageUrl,
        creatorId: user.uid,
        createdAt: Timestamp.now()
      });

      alert("Product added!");
      setTitle("");
      setDesc("");
      setPrice("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload product.");
    }
    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Product</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-3 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 mb-3 border rounded"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="w-full p-2 mb-3 border rounded"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="file"
        className="mb-3"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAddProduct}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </div>
  );
}
