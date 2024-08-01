// app/page.tsx
import FormComponent from '../components/FormComponent';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <main className="p-4">
        <h1 className="text-center text-2xl font-bold mb-6">Collect Input Form</h1>
        <FormComponent />
      </main>
    </div>
  );
}

