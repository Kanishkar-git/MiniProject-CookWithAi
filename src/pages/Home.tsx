import { ChefHat, Book, Globe, Sparkles,ChevronDown } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,165,0,0.1)_0%,transparent_100%)] pointer-events-none" />
        
        <div className="text-center space-y-6 max-w-4xl mx-auto relative">
          <div className="mb-8">
            <ChefHat className="w-24 h-24 mx-auto text-orange-500 animate-bounce" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-transparent bg-clip-text animate-gradient">
            Cook with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-700">
            Your personal Indian cuisine recipe assistant
          </p>
          <p className="text-gray-600">
            Transform your ingredients into authentic Indian dishes from different regions!
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-orange-200">
              Generate Recipe <Sparkles className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {['English', 'தமிழ்', 'हिंदी', 'తెలుగు'].map((lang, index) => (
              <span key={index} className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-medium animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                {lang}
              </span>
            ))}
          </div>
        </div>

        <ChevronDown className="w-6 h-6 absolute bottom-8 animate-bounce text-orange-500" />
      </section>

      {/* Regional Cuisines */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-orange-600">Regional Cuisines</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                region: "North Indian",
                dishes: "Butter Chicken, Chole Bhature, Biryani"
              },
              {
                region: "South Indian",
                dishes: "Dosa, Idli, Sambar"
              },
              {
                region: "East Indian",
                dishes: "Rasgulla, Fish Curry, Litti Chokha"
              },
              {
                region: "West Indian",
                dishes: "Dhokla, Pav Bhaji, Vada Pav"
              }
            ].map((cuisine, index) => (
              <div key={index} 
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold mb-3 text-orange-600">{cuisine.region}</h3>
                <p className="text-gray-600">{cuisine.dishes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-orange-600">Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Globe />, title: "4 Languages", desc: "Cook in English, Tamil, Hindi, or Telugu" },
              { icon: <Sparkles />, title: "AI-Powered", desc: "Smart recipe generation based on ingredients" },
              { icon: <Book />, title: "Regional Expertise", desc: "Authentic recipes from all over India" }
            ].map((feature, index) => (
              <div key={index} 
                className="p-6 rounded-xl bg-white border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="text-orange-500 mb-4 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "500+", label: "Indian Recipes" },
              { number: "4", label: "Languages" },
              { number: "20+", label: "Regional Varieties" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl font-bold text-orange-500 animate-pulse">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-orange-100 text-center text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ChefHat className="w-6 h-6 text-orange-500" />
            <span className="font-semibold">Cook with AI</span>
          </div>
          <p>© 2025 Cook with AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;