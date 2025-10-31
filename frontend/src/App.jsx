export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      {/* Hero Section */}
      <section className="text-center text-white p-8 rounded-3xl shadow-2xl backdrop-blur-md bg-white/10">
        <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg">
          Beginning of something <span className="text-yellow-300">great...</span>
        </h1>
        <p className="text-xl text-white/80 animate-pulse">Hello World 🌍</p>
      </section>

      {/* Team Section */}
      <section className="text-center text-white p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg w-80">
        <h2 className="text-2xl font-semibold mb-4 drop-shadow-md">Our Team 💫</h2>
        <ul className="space-y-2 text-lg">
          {["Casper", "Markus", "Mario", "Umejr"].map((name) => (
            <li
              key={name}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}
