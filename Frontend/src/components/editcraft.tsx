"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("Product ID is undefined");
        return;
      }
      if (typeof id !== "string") {
        console.error("Invalid Product ID");
        return;
      }
      const snap = await getDoc(doc(db, "products", id));
      if (snap.exists()) {
        const data = snap.data();
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    if (!id || typeof id !== "string") {
      console.error("Invalid Product ID");
      return;
    }
    const docRef = doc(db, "products", id);
    let finalUrl = imageUrl;

    if (image) {
      const imageRef = ref(storage, `productImages/${Date.now()}-${image.name}`);
      await uploadBytes(imageRef, image);
      finalUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(docRef, {
      title,
      description,
      price: parseFloat(price),
      imageUrl: finalUrl,
    });
    alert("Product updated");
    router.push("/explore");
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <input type="text" placeholder="Title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" className="input my-2" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Price" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Image src={imageUrl} alt="Current" width={200} height={200} className="w-48 h-48 object-cover my-2" />
      <input type="file" className="input my-2" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={handleUpdate} disabled={loading}>
        {loading ? "Saving..." : "Update Product"}
      </button>
    </div>
  );
};

export default EditProduct;