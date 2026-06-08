import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="flex justify-center px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
          <p className="text-center text-slate-500">
            Track ratings, solved problems and coding progress across multiple
            platforms in one place.
          </p>

          <InputForm />
        </div>
      </main>
    </div>
  );
}