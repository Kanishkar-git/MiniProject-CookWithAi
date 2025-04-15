import { useState, useEffect } from "react";
import {
  ChefHat,
  Loader2,
  UtensilsCrossed,
  Sparkles,
  Clock,
  Book,
  Volume2,
  Volume,
} from 'lucide-react';

type LanguageCode = 'en-IN' | 'ta-IN' | 'hi-IN' | 'te-IN';

declare global {
  interface Window {
    responsiveVoice?: any;
  }
  const responsiveVoice: any;
}

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [mealType, setMealType] = useState('');
  const [region, setRegion] = useState('');
  const [language, setLanguage] = useState<LanguageCode>('en-IN');
  const [recipe, setRecipe] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeGenerated, setRecipeGenerated] = useState(false);
  const [responsiveVoiceLoaded, setResponsiveVoiceLoaded] = useState(false);
  const [animateHat, setAnimateHat] = useState(false);

  const API_KEY = 'AIzaSyBmsjU8w6b15f_06GqclelPQ20H79XuJWw'; // Replace with your actual API key

  useEffect(() => {
    if ((language === 'ta-IN' || language === 'hi-IN' || language === 'te-IN') && !responsiveVoiceLoaded) {
      const script = document.createElement('script');
      script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=nxEdqlFN';
      script.async = true;
      script.onload = () => {
        setResponsiveVoiceLoaded(true);
        console.log('ResponsiveVoice loaded');
      };
      script.onerror = () => {
        console.error('Failed to load ResponsiveVoice');
      };
      document.head.appendChild(script);
    } else if (language !== 'ta-IN' && language !== 'hi-IN' && language !== 'te-IN' && responsiveVoiceLoaded) {
      // Clean up if language changes from a ResponsiveVoice language
      const scriptTag = document.querySelector('script[src*="responsivevoice.js"]');
      if (scriptTag) {
        document.head.removeChild(scriptTag);
        setResponsiveVoiceLoaded(false);
        console.log('ResponsiveVoice unloaded');
      }
    }

    return () => {
      const scriptTag = document.querySelector('script[src*="responsivevoice.js"]');
      if (scriptTag) {
        document.head.removeChild(scriptTag);
      }
    };
  }, [language, responsiveVoiceLoaded]);

  useEffect(() => {
    setAnimateHat(true);
    const timer = setTimeout(() => {
      setAnimateHat(false);
    }, 1000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []); // Trigger animation on initial load

  const stripMarkdown = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '$1');
  };

  const languageMap = {
    'en-IN': 'English',
    'ta-IN': 'Tamil',
    'hi-IN': 'Hindi',
    'te-IN': 'Telugu',
  };

  const generateRecipe = async () => {
    try {
      setLoading(true);
      setRecipeImage('');
      setRecipeGenerated(true);
      const prompt = `Respond only in ${languageMap[language]}. Generate a ${region} style Indian ${mealType.toLowerCase()} recipe using these ingredients: ${ingredients}. Format the response with these sections: Recipe Name, Ingredients (as a numbered list), Steps, Time, Difficulty.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );

      const data = await response.json();
      const rawRecipeText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No recipe found.';
      const cleanedRecipe = stripMarkdown(rawRecipeText);
      setRecipe(cleanedRecipe);

      const nameMatch = cleanedRecipe.match(/^.*Recipe Name.*?\n(.*?)(?:\n|$)/m);
      const extractedName = nameMatch ? nameMatch[1].trim() : '';
      setRecipeName(extractedName);

      if (extractedName) generateImage(extractedName);
    } catch (error) {
      console.error('Recipe error:', error);
      setRecipe('Error generating recipe.');
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (dishName: string) => {
    setRecipeImage(
      `https://source.unsplash.com/1600x900/?indian,${encodeURIComponent(
        dishName
      )},food,cooking`
    );
  };

  const speakRecipe = () => {
    if (isSpeaking) {
      if ((language === 'ta-IN' || language === 'hi-IN' || language === 'te-IN') && responsiveVoiceLoaded) {
        responsiveVoice.cancel();
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    if (language === 'ta-IN' && responsiveVoiceLoaded && typeof responsiveVoice !== 'undefined') {
      responsiveVoice.speak(recipe, 'Tamil Male');
      responsiveVoice.onend = () => setIsSpeaking(false);
    } else if (language === 'hi-IN' && responsiveVoiceLoaded && typeof responsiveVoice !== 'undefined') {
      responsiveVoice.speak(recipe, 'Hindi Female');
      responsiveVoice.onend = () => setIsSpeaking(false);
    } else if (language === 'te-IN' && responsiveVoiceLoaded && typeof responsiveVoice !== 'undefined') {
      responsiveVoice.speak(recipe, 'Telugu Female');
      responsiveVoice.onend = () => setIsSpeaking(false);
    } else if (language === 'en-IN' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(recipe);
      const voice = window.speechSynthesis.getVoices().find(
        (v) => v.lang === language || v.lang.startsWith(language.split('-')[0])
      );
      if (voice) utterance.voice = voice;
      utterance.lang = language;
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else if (language === 'ta-IN' && !responsiveVoiceLoaded) {
      alert('Tamil speech is loading, please try again in a moment.');
      setIsSpeaking(false);
    } else if (language === 'hi-IN' && !responsiveVoiceLoaded) {
      alert('Hindi speech is loading, please try again in a moment.');
      setIsSpeaking(false);
    } else if (language === 'te-IN' && !responsiveVoiceLoaded) {
      alert('Telugu speech is loading, please try again in a moment.');
      setIsSpeaking(false);
    } else if (language !== 'en-IN' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(recipe);
      utterance.lang = language;
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else if ((language === 'ta-IN' || language === 'hi-IN' || language === 'te-IN') && typeof responsiveVoice === 'undefined') {
      alert(`${languageMap[language]} speech library not loaded. Please ensure the script tag is in your index.html.`);
      setIsSpeaking(false);
    } else {
      alert('Speech synthesis is not available for this language.');
      setIsSpeaking(false);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      if ((language === 'ta-IN' || language === 'hi-IN' || language === 'te-IN') && responsiveVoiceLoaded && typeof responsiveVoice !== 'undefined') {
        responsiveVoice.cancel();
      } else if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    } else {
      speakRecipe();
    }
  };

  return (
    <div className="font-sans bg-gradient-to-br from-orange-100 to-yellow-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <div className="inline-flex items-center text-orange-600">
            <ChefHat
              className={`mr-2 ${animateHat ? 'animate-bounce' : ''}`}
              size={32}
            />
            <h1 className="text-3xl font-semibold">Cook with AI</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Transform your leftover ingredients into delicious Indian recipes
          </p>
        </header>

        <main className="bg-white rounded-2xl shadow-md p-8 max-w-lg mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-6 text-center text-gray-700">
            <div>
              <Sparkles className="mx-auto text-orange-500" size={36} />
              <p className="text-sm mt-1">AI-Powered</p>
            </div>
            <div>
              <Clock className="mx-auto text-orange-500" size={36} />
              <p className="text-sm mt-1">Quick Results</p>
            </div>
            <div>
              <UtensilsCrossed className="mx-auto text-orange-500" size={36} />
              <p className="text-sm mt-1">Indian Cuisine</p>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="mealType" className="block text-gray-700 text-sm font-bold mb-2">
              Select Meal Type
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select a meal type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">
              What's in your fridge?
            </label>
            <textarea
              id="ingredients"
              rows={3}
              placeholder="Enter your ingredients (e.g., potatoes, onions, tomatoes, spices)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="region" className="block text-gray-700 text-sm font-bold mb-2">
              Select Region (Optional)
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Any Region</option>
              <option value="South Indian">South Indian</option>
              <option value="North Indian">North Indian</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
              Select Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="en-IN">English</option>
              <option value="ta-IN">Tamil</option>
              <option value="hi-IN">Hindi</option>
              <option value="te-IN">Telugu</option>
            </select>
          </div>

          <button
            onClick={generateRecipe}
            disabled={!ingredients || !mealType || loading}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline w-full"
          >
            {loading ? <Loader2 className="animate-spin text-white mx-auto" /> : 'Generate Indian Recipe'}
          </button>
        </main>

        {recipe && (
          <div className="mt-8 bg-white rounded-2xl shadow-md p-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Your Recipe <ChefHat className="inline-block text-orange-600" size={20} />
            </h2>
            {recipeImage && (
              <img src={recipeImage} alt={recipeName} className="w-full rounded mb-4" />
            )}
            <pre className="bg-gray-50 p-4 rounded whitespace-pre-wrap text-gray-700">
              {recipe}
            </pre>
            <div className="flex items-center justify-end gap-4 mt-4">
              <button
                onClick={toggleSpeech}
                className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 text-orange-600"
                disabled={((language === 'ta-IN' || language === 'hi-IN' || language === 'te-IN') && typeof responsiveVoice === 'undefined')}
              >
                {isSpeaking ? <Volume /> : <Volume2 />}
              </button>
              {!recipeGenerated && (
                <>
                  <button className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 text-orange-600">
                    <Book className="text-orange-600" />
                  </button>
                  <button className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 text-orange-600">
                    <Sparkles className="text-orange-600" />
                  </button>
                  <button className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 text-orange-600">
                    <Clock className="text-orange-600" />
                  </button>
                  <button className="p-2 bg-orange-100 rounded-full hover:bg-orange-200 text-orange-600">
                    <UtensilsCrossed className="text-orange-600" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}