"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export default function Home() {
  const { t, i18n } = useTranslation(); // Load translations
  const router = useRouter();

  // Function to switch languages
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.refresh();
  };

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-white bg-opacity-70 p-6 rounded-lg">
        <h1 className="text-4xl font-bold text-blue-700">{t("welcome")}</h1>
        <p className="text-lg text-gray-700 mt-2">{t("description")}</p>

        {/* Personalized Recommendations */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">{t("recommendations")}</h2>
          <ul className="mt-4 text-lg text-gray-700">
            <li>🌟 {t("brihadeeswarar")}</li>
            <li>🌟 {t("meenakshi")}</li>
            <li>🌟 {t("sri_ranganathaswamy")}</li>
            <li>🌟 {t("ramanathaswamy")}</li>
          </ul>
        </section>

        {/* Language Switcher */}
        <div className="mt-8">
          <button onClick={() => changeLanguage("en")} className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2">
            English
          </button>
          <button onClick={() => changeLanguage("ta")} className="px-4 py-2 bg-green-500 text-white rounded-md mx-2">
            தமிழ்
          </button>
        </div>
      </div>
    </main>
  );
}
