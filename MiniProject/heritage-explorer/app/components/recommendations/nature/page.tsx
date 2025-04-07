"use client";

const natureData = [
  { id: 3, name: "Ooty Hill Station", location: "Ooty" },
  { id: 5, name: "Kodaikanal Lake", location: "Kodaikanal" },
  { id: 10, name: "Emerald Lake", location: "Yercaud" },
];

export default function NatureRecommendations() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">🌿 Nature & Hill Recommendations</h2>
      <ul className="space-y-2">
        {natureData.map((place) => (
          <li key={place.id} className="bg-green-100 p-3 rounded">
            <strong>{place.name}</strong> - {place.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
