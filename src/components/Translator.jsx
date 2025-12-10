import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function Translator() {
  const [text, setText] = useState("");               
  const [languages, setLanguages] = useState([]);     
  const [selectedLang, setSelectedLang] = useState("hi");
  const [translatedText, setTranslatedText] = useState("");

  // 🔵 FETCH LANGUAGE LIST
  const fetchLanguages = useCallback(async () => {
    try {
      const res = await axios.get(
        "https://google-translate113.p.rapidapi.com/api/v1/translator/support-languages",
        {
          headers: {
            "x-rapidapi-key": "7e6bd1f8c2msh34f17b8b36400f0p15da9cjsn30f18c8078ea",
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
          },
        }
      );
      setLanguages(res.data);
    } catch (err) {
      console.log("Error fetching languages:", err);
    }
  }, []);

  // USEEFFECT CALLING fetchLanguages
  useEffect(() => {
    fetchLanguages();
  }, []);

  // TRANSLATE FUNCTION
  const translateNow = useCallback(async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
        {
          from: "en",
          to: selectedLang,
          text: text,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-key": "7e6bd1f8c2msh34f17b8b36400f0p15da9cjsn30f18c8078ea",
            "x-rapidapi-host": "google-translate113.p.rapidapi.com",
          },
        }
      );

      setTranslatedText(res.data.trans);
    } catch (err) {
      console.log("Translation Error:", err);
    }
  }, [text, selectedLang]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg p-6 rounded-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-4">
          🌐 Text Transilator
        </h1>

        {/* INPUT */}
        <textarea
          className="w-full p-3 border rounded-lg"
          rows="4"
          placeholder="Type text in English…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* DROPDOWN */}
        <select
          className="w-full p-3 border rounded-lg mt-3"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.language}
            </option>
          ))}
        </select>

        {/* TRANSLATE BUTTON */}
        <button
          onClick={translateNow}
          className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg"
        >
          Translate
        </button>

        {/* OUTPUT */}
        <div className="mt-4 p-3 bg-gray-200 rounded-lg min-h-[80px]">
          {translatedText ? (
            <p>{translatedText}</p>
          ) : (
            <p className="text-gray-500">Translated text will appear here…</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Translator;
