"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define global types for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const placesData: Record<string, string> = {
  "brihadeeswarar temple": "Thanjavur",
  "marina beach": "Chennai",
  "ooty hill station": "Ooty",
  "meenakshi temple": "Madurai",
  "kodaikanal lake": "Kodaikanal",
  "sri ranganathaswamy temple": "Srirangam",
  "ramanathaswamy temple": "Rameshwaram",
  "kanyakumari beach": "Kanyakumari",
  "elliot's beach": "Chennai",
};

export default function VoiceAssistant() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const handleVoiceCommand = (command: string) => {
    console.log("Voice Command:", command);

    if (command.includes("go to home")) {
      router.push("/home");
    } else if (command.includes("go to login")) {
      router.push("/login");
    } else if (command.includes("go to register")) {
      router.push("/register");
    } else if (command.includes("show beaches")) {
      router.push("/components/recommendations/beach");
    } else if (command.includes("show temples")) {
      router.push("/components/recommendations/temple");
    } else if (command.includes("show nature")) {
      router.push("/components/recommendations/nature");
    } else {
      for (const place in placesData) {
        if (command.includes(`go to ${place}`)) {
          const route = `/components/recommendations/${place
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
          router.push(route);
          return;
        } else if (command.includes(`where is ${place} located`)) {
          alert(`${place} is located in ${placesData[place]}.`);
          return;
        }
      }
      alert("Sorry, I didn't understand that command.");
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      <button
        onClick={() => setIsListening((prev) => !prev)}
        className={`p-4 rounded-full shadow-lg ${
          isListening ? "bg-red-500" : "bg-blue-500"
        } text-white text-xl`}
      >
        🎙️
      </button>
    </div>
  );
}
