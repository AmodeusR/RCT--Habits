import "./styles/global.css";
import "./lib/dayjs";
import Header from "./components/Header";
import SummaryTable from "./components/SummaryTable";

function App() {
  return (
    <div className="min-h-screen text-white flex justify-center items-center">
      <main className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />  
      </main>
    </div>
  );
}

export default App;
