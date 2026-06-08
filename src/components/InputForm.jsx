export default function InputForm() {
  return (
    <div className="mt-8 space-y-5">
      <div>
        <label className="block font-medium mb-2">
          🟡 LeetCode Username
        </label>
        <input
          type="text"
          placeholder="anjali_17_10"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          🔵 Codeforces Handle
        </label>
        <input
          type="text"
          placeholder="Anjali021"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          🟤 CodeChef Username
        </label>
        <input
          type="text"
          placeholder="sane_ring_4"
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:scale-105 transition">
        Analyze Progress
      </button>
    </div>
  );
}