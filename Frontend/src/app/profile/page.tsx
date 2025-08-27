"use client";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import  Navbar  from '@/components/Navbar';

const Profile = () => {
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [contact, setContact] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("/default-avatar.png");
  const [contactInput, setContactInput] = useState<string>("");
  const [instagram, setInstagram] = useState("");
  const [website, setWebsite] = useState("");
  const [user, setUser] = useState<import("firebase/auth").User | null>(null); // Track current user state
  const [loading, setLoading] = useState(true);
  const [gender, setGender] = useState<string>(""); // Gender state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        
        if (snap.exists()) {
          const data = snap.data();
          console.log("response",data);
          setName(data.name || "");
          setBio(data.bio || "");
          setImage(data.image|| "");
          setContact(data.Contact || []);
          setInstagram(data.Instagram || "");
          setWebsite(data.Website || "");
          setGender(data.gender || "");
          setImageUrl(data.imageUrl || "/default-avatar.png");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
  if (!user) return;

  try {
    const docRef = doc(db, "users", user.uid);

    await updateDoc(docRef, {
      name,
      bio,
      Contact: contact,
      Instagram: instagram,
      Website: website,
      gender,
    });
    alert("✅ Profile updated!");
    console.log("Selected image:", image);
    // Upload image only if selected
    if (image) {
      if (!image.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (image.size > 5 * 1024 * 1024) { // 5 MB limit
        alert("File size exceeds 5 MB.");
        return;
      }
      const imageRef = ref(storage, `images/${user.uid}`); // Ensure the path is correct
      await uploadBytes(imageRef, image); // Upload the file
      const url = await getDownloadURL(imageRef); // Get the download URL
      await updateDoc(docRef, { imageUrl: url }); // Save the URL in Firestore
      setImageUrl(url); // Update the state with the new URL
    } else {
      // Set default profile pic if not present in Firestore
      const snap = await getDoc(docRef);
      const data = snap.data();
      if (!data?.profilePic) {
        const defaultUrl =gender === "male"
        ? "/default-male-avatar.png"
        : gender === "female"
        ? "/default-female-avatar.png"
        : "/default-avatar.png"; 
        await updateDoc(docRef, { imageUrl: defaultUrl });
        setImageUrl(defaultUrl);
      }
    }


    
  } catch (error) {
    alert("❌ Error saving profile. Please try again.");
    console.error("❌ Error saving profile:", error);
  }
};


  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">You must be logged in to view this page.</p>;



  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 text-white flex flex-col lg:flex-row gap-12">
        {/* Left Side - Profile Image */}
        <div className="flex flex-col items-center lg:w-1/3">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img src={ imageUrl} alt="Profile" className="w-full h-full object-cover"/>
          </div>
          {/* <input
            type="file"
            accept="image/*"
            className="mt-4 p-2 w-full rounded bg-gray-800 text-white"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setImageUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}>
            </input> */}
        </div>

        {/* Right Side - Profile Details */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4 text-black">Welcome, {name || "Your Name"}</h1>
          <input
            className="mb-4 p-2 w-full rounded bg-gray-800 text-White"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <h1 className="text-3xl font-bold mb-4 text-black">Bio</h1>
          <textarea
            className="mb-4 w-full p-2 rounded bg-gray-800 text-white"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Edit your bio"
          />

          {/* Contact Numbers */}

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black">📞 Contact Numbers</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {contact.map((c, index) => (
                <span key={index} className="bg-indigo-600 text-sm px-3 py-1 rounded-full">
                  {c}
                </span>
              ))}
            </div>
            <input
              type="text"
              className="mt-2 p-2 w-full rounded bg-gray-800 text-white"
              value={contactInput}
              onChange={(e) => setContactInput(e.target.value)}
              onBlur={() => {
                if (contactInput) {
                  setContact(contactInput.split(",").map((s) => s.trim()));
                  setContactInput("");
                }
              }}
            />
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black">Gender</h2>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2 text-2xl font-bold mb-4 text-black">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-2xl font-bold mb-4 text-black">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black">🔗 Social Links</h2>
            <input
              type="text"
              className="mt-2 w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Instagram Profile URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <input
              type="text"
              className="mt-2 w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />

            <div className="flex gap-4 mt-4">
              {instagram && (
                <a href={instagram} target="_blank" className="text-blue-500 hover:underline">
                  Instagram
                </a>
              )}
              {website && (
                <a href={website} target="_blank" className="text-blue-500 hover:underline">
                  Website
                </a>
              )}
            </div>
          </div>

          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
