"use client";

const templeData = [
  { id: 1, name: "Brihadeeswarar Temple", location: "Thanjavur" },
  { id: 4, name: "Meenakshi Temple", location: "Madurai" },
  { id: 6, name: "Sri Ranganathaswamy Temple", location: "Srirangam" },
  { id: 7, name: "Ramanathaswamy Temple", location: "Rameshwaram" },
];

export default function TempleRecommendations() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🏛️ Temple Recommendations</h2>
      <ul className="space-y-2">
        {templeData.map((temple) => (
          <li key={temple.id} className="bg-gray-100 p-3 rounded">
            <strong>{temple.name}</strong> - {temple.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
