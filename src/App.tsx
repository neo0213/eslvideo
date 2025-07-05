import { useRef, useState } from "react";
import "./App.css";
import { QRCodeSVG } from "qrcode.react";
import eslLogo from "./assets/esl-logo.svg";
import bullseye from "./assets/bullseye.svg";

function App() {
  const [textQR, setTextQR] = useState("");
  const [imageSelect, setImageSelect] = useState("");
  const svgRef = useRef<HTMLDivElement>(null);

  const handleQRDownload = () => {
    const svg = svgRef.current?.querySelector("svg");

    if (!svg) {
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svg.width.baseVal.value;
      canvas.height = svg.height.baseVal.value;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "qr-code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    img.onerror = (err) => {
      console.error("Failed to load SVG into image:", err);
    };

    img.src = url;
  };

  return (
    <>
      <div className="container mx-auto p-4 shadow-md">
        <div className="flex items-center mb-4">
          <p className="p-2 text-xl font-semibold">QR Code Generator</p>
          <div className="ml-auto flex items-center">
            <button
              onClick={handleQRDownload}
              type="button"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Download
            </button>
            <div className="relative">
              <select
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                onChange={(e) => setImageSelect(e.target.value)}
              >
                <option value="web">Web</option>
                <option value="app">App</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <textarea
            name="qrText"
            onChange={(e) => setTextQR(e.target.value)}
            placeholder="chattybot://cb/soft-skills-dialogue-sick"
            className="border border-gray-300 focus:border-gray-400 focus:outline-none rounded p-2 flex-1 shadow-sm outline-none"
          />
          <div className="h-[300px] w-[300px]" ref={svgRef}>
            {textQR ? (
              <QRCodeSVG
                value={textQR}
                imageSettings={{
                  src: imageSelect === "web" ? eslLogo : bullseye,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
                height={300}
                width={300}
                minVersion={4}
              />
            ) : (
              <div className="border h-full flex justify-center items-center">
                <h2 className="text-gray-400 text-2xl font-medium">QR Here</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
