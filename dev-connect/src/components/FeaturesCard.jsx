 const Feature = ({ title, desc }) => (
    <div className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition">
      <h4 className="text-xl font-semibold mb-2 text-blue-600">{title}</h4>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
  export default Feature;