"use client";
import BeachRecommendations from "../../components/recommendations/beach/page";
import TempleRecommendations from "../../components/recommendations/temple/page";
import NatureRecommendations from "../../components/recommendations/nature/page";
import VoiceAssistant from "../../components/VoiceAssistant";

export default function Home() {
  return (
    <main
      className="flex flex-col min-h-screen items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-white bg-opacity-70 p-6 rounded-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600">🌍 Welcome to Heritage Explorer</h1>
        <p className="text-lg text-gray-800 mt-2">Discover Tamil Nadu’s rich culture and history.</p>

        {/* Display Recommendations */}
        <div className="space-y-4">
         <BeachRecommendations />
         <TempleRecommendations />
         <NatureRecommendations />
        </div>

      </div>

      {/* Voice Assistant Component */}
      <VoiceAssistant />
    </main>
  );
}
