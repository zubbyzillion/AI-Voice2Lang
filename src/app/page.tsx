"use client"
// import "regenerator-runtime/runtime"
import Image from "next/image";
import { cn } from "../../lib/utils";
import TextArea from "@/components/Inputs/TextArea"
import React, { useState, ChangeEvent } from "react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import { IconFileUpload, IconVolume } from "@tabler/icons-react";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
    const audio = new Audio(text);
    audio.play();
  }

  return (
    <div>
          <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">Voice<span className="text-[#00e0ff]">2</span>Lang</h1>
            <p className="mt-3 text-neutral-400">Voice2Lang: Your voice in any language, Connecting People</p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                  id="source-language"
                  value={sourceText}
                  onChange={(e:ChangeEvent<HTMLTextAreaElement>) => {
                    setSourceText(e.target.value)
                  }}
                  placeholder="Source Language"
                   />
                   <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent setSourceText={setSourceText} />
                      <IconVolume size={22} onClick={() => handleAudioPlayback(sourceText)} />
                        <IconFileUpload />
                    </span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
