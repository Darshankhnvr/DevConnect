import { Link } from "react-router-dom";
import Feature from "../components/FeaturesCard";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">DevConnect</h1>
          <div className="space-x-4">
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Join Now
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-50 text-center py-20 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
            Connect. Collaborate. Code.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Meet passionate developers, share ideas, and grow together.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              title="Find Developers"
              desc="Discover devs around the world to work on cool projects together."
            />
            <Feature
              title="Project Showcase"
              desc="Share your portfolio and gain feedback."
            />
            <Feature
              title="Live Events"
              desc="Join live sessions and coding challenges every week."
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-blue-600 text-white">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to build the future?
          </h3>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-5 py-2 rounded-full hover:bg-gray-200 font-medium transition"
          >
            Join DevConnect Now
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} DevConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
