import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/HomePage";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
                <Home />
            </div>
        </>
    );
}

export default App;
