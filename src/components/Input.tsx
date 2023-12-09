"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ts from "@/assets/ts.png";
import { XIcon } from "@heroicons/react/outline";
import { PhotographIcon } from "@heroicons/react/outline";
import { ChartBarIcon } from "@heroicons/react/outline";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import Picker from "@emoji-mart/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      uid: string,
      tag: string,
    };
  }
}

const Input = () => {
  const [input, setInput] = useState<string>("");
  const [selected, setSelected] = useState<string | null>();
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const { data: session } = useSession();

  const sendPost = async () => {
    try {
      if (loading || !session || !session.user || !session.user.uid) {
        console.error("Invalid session or missing user UID.");
        setLoading(false);
        return;
      }
  
      setLoading(true);
  
      const { uid, name, image, tag } = session.user;
  
      // Check for undefined or null values and provide defaults if needed
      const username = name || "DefaultUsername";
      const userImg = image || "DefaultImageURL";
      const tagValue = tag || "DefaultTag";
  
      // Create a new post document
      const docRef = await addDoc(collection(db, "posts"), {
        id: uid,
        username: username,
        userImg: userImg,
        tag: tagValue,
        text: input || "", // Provide a default value for input if it's undefined
        timestamp: serverTimestamp(),
      });
  
      // If an image is selected, upload it to storage and update the post document
      if (selected) {
        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        await uploadString(imageRef, selected, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
  
      setLoading(false);
      setInput("");
      setSelected(null);
      setShowEmojis(false);
    } catch (error) {
      console.error("Error sending post:", error);
      setLoading(false);
    }
  };
  
  

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target) {
        setSelected(readerEvent.target.result as string);
      }0
    };
  };

  const addEmoji = (e: { unified: string }) => {
    const sym: string[] = e.unified.split("-");
    const codesArray: number[] = sym.map((el) => parseInt("0x" + el, 16));
    const emoji: string = String.fromCodePoint(...codesArray);
    setInput((prevInput: string) => prevInput + emoji);
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll no-scrollbar ${
        loading && "opacity-60"
      }`}
    >
      <Image
        src={session?.user?.image as string}
        alt="user"
        className="h-11 w-11 rounded-full cursor-pointer"
        height={44}
        width={44}
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selected && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            placeholder="What's happening?"
            rows={2}
          />

          {selected && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelected(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <Image
                src={selected}
                alt="ts"
                width={400}
                height={400}
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current?.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  onChange={addImageToPost}
                  ref={filePickerRef}
                  hidden
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              {showEmojis && (
                <div
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                >
                  <Picker onEmojiSelect={addEmoji} theme="dark" />
                </div>
              )}
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              onClick={sendPost}
              disabled={!input.trim() && !selected}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
