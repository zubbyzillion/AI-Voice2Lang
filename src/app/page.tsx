"use client"
// import "regenerator-runtime/runtime"
import Image from "next/image";
import { cn } from "../../lib/utils";
import TextArea from "@/components/Inputs/TextArea"
import FileUpload from "@/components/Inputs/FileUpload"
import LinkPaste from "@/components/Inputs/LinkPaste"
import React, { useState, ChangeEvent } from "react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import { rtfToText } from "@/utils/rtfToText"
import useTranslate from "@/hooks/useTranslate"
import { IconCopy, IconFileUpload, IconStar, IconThumbDown, IconThumbUp, IconVolume } from "@tabler/icons-react";
import LanguageSelector from "@/components/Inputs/LanguageSelector"
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/categoryLinks";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [languages] = useState<string[]>(["English", "French", "Spanish", "German", "Chinese", "Igbo", "Yoruba", "Hausa"]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hausa");
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
    const audio = new Audio(text);
    audio.play();
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  }

    const handleLinkPaste = async (e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    try {
      const response = await fetch(link);
      const data = await response.text();
      setSourceText(data);
    } catch (error) {
      console.error("Error fetching link content:", error);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleFavourite = () => {
    setFavourite(!favourite);
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
                <div className="relative z-10  flex flex-col space-x-3 p-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
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
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPaste handleLinkPaste={handleLinkPaste} />
                    </span>
                    <span className="text-sm pr-4">
                      {sourceText.length} / 2000
                    </span>
                   </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                <TextArea id={"target-language"} value={targetText} onChange={() => {}} placeholder={"Target Language"} />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row items-center">
                      <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      setSelectedLanguage={setSelectedLanguage}
                      languages={languages}
                       />
                       <IconVolume size={22} onClick={() => handleAudioPlayback(targetText)} />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy size={22} onClick={handleCopyToClipboard} />
                      {copied && <span className="text=xs text-green-500">Copied</span>}
                      <IconThumbUp size={22} />
                      <IconThumbDown size={22} />
                      <IconStar size={22} onClick={handleFavourite} className={favourite ? "text-yellow-500" : ""} />
                    </div>
                  </div>
                </div>
              </div>
              <SvgDecorations />
            </div>
            <CategoryLinks />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
