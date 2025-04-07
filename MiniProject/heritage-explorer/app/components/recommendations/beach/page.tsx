"use client";

const beachData = [
  { id: 2, name: "Marina Beach", location: "Chennai" },
  { id: 8, name: "Kanyakumari Beach", location: "Kanyakumari" },
  { id: 9, name: "Elliot's Beach", location: "Chennai" },
];

export default function BeachRecommendations() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🏖️ Beach Recommendations</h2>
      <ul className="space-y-2">
        {beachData.map((beach) => (
          <li key={beach.id} className="bg-blue-100 p-3 rounded">
            <strong>{beach.name}</strong> - {beach.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
