"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ts from "@/assets/ts.png";
import { XIcon } from "@heroicons/react/outline";
import { PhotographIcon } from "@heroicons/react/outline";
import { ChartBarIcon } from "@heroicons/react/outline";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/outline";
import Picker from '@emoji-mart/react'

const Input = () => {
  const [input, setInput] = useState<number | string>("");
  const [selected, setSelected] = useState<string | null>();
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef<HTMLInputElement | null>(null);

  const addImageToPost = () => {};
  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
    >
      <Image
        src={ts}
        alt="user"
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="w-full divide-y divide-gray-700">
        <div>
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
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

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
              <div style={{
                position: "absolute",
                marginTop: "465px",
                marginLeft: -40,
                maxWidth: "320px",
                borderRadius: "20px",
              }}>
              <Picker theme="dark"/>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;