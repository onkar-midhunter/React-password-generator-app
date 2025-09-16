import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordref = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumberAllowed, isCharacterAllowed]);

  const onKeyboardCopy = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumberAllowed, isCharacterAllowed]);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800">
      <div className="relative bg-white/20 backdrop-blur-lg rounded-none shadow-2xl w-full h-full flex flex-col items-center justify-center p-0">
        <h1 className="text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg tracking-wide">
          Password Generator
        </h1>
        <div className="flex items-center mb-12 w-3/4 max-w-4xl">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordref}
            className="flex-1 px-12 py-8 rounded-l-2xl bg-gray-900 text-green-400 font-mono text-4xl outline-none border-2 border-green-400 focus:ring-2 focus:ring-green-500 transition-all duration-200"
            style={{ letterSpacing: "0.1em" }}
          />
          <button
            className="px-10 py-8 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-extrabold rounded-none rounded-r-2xl text-3xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 active:scale-95"
            onClick={onKeyboardCopy}
          >
            Copy
          </button>
          <button
            className="ml-6 px-10 py-8 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-extrabold rounded-2xl text-3xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
            onClick={() => {
              setPassword("");
            }}
          >
            Clear
          </button>
        </div>
        {copied && (
          <div className="absolute top-10 right-16 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg text-2xl animate-bounce z-10">
            Copied!
          </div>
        )}
        <div className="mb-10 w-3/4 max-w-4xl">
          <label className="block text-white mb-4 font-semibold text-2xl">
            Length:{" "}
            <span className="text-green-300 font-bold">{length}</span>
          </label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
            className="w-full accent-green-500 h-3 rounded-lg"
          />
        </div>
        <div className="flex gap-16 justify-between w-3/4 max-w-4xl mb-2">
          <label className="flex items-center gap-4 text-white text-2xl">
            <input
              type="checkbox"
              checked={isNumberAllowed}
              id="numberInput"
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
              className="accent-green-500 w-7 h-7"
            />
            Numbers
          </label>
          <label className="flex items-center gap-4 text-white text-2xl">
            <input
              type="checkbox"
              checked={isCharacterAllowed}
              id="characterInput"
              onChange={() => {
                setIsCharacterAllowed((prev) => !prev);
              }}
              className="accent-green-500 w-7 h-7"
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
