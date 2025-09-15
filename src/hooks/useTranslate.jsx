import { useEffect, useState } from "react";
import { OpenAI } from "openai";
import { useSearchParams } from "next/navigation";

const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    dangerouslyAllowBrowser: true,
})

const useTranslate = (sourceText, selectedLanguage) => {
    const [targetText, setTargetText] = useState("")

    useEffect(() => {
        const handleTranslate = async(sourceText) => {
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages: [{role: "user", content:
                        `
                        You will be provided with a sentence. This sentence: ${sourceText}.
                        Your task are to:
                        - detect what language the sentence is in
                        - translate the sentence into ${selectedLanguage}
                        do not return anything other than the translated sentence
                        `
                    }]
                })
                const data = response.choices[0].message.content
                setTargetText(data)
            } catch (error) {
                console.error("Error translating text:", error);
            }
        }

        if(sourceText.trim()){
            const timeoutId = setTimeout(() => {
                handleTranslate(sourceText)
            }, 500)

            return () => clearTimeout(timeoutId)
        }
    }, [sourceText, selectedLanguage])
    return targetText
}

export default useTranslate;