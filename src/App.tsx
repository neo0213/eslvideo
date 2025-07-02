import { useState } from "react";
import "./App.css";
import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';

function App() {
  const [textQR, setTextQR] = useState("");

  return (
    <>
      <div className="container mx-auto p-4 shadow-md ">
        <p className="p-2 text-xl font-medium mb-4">QR Code Generator</p>
        <div className="grid grid-cols-2 grid-rows-0 gap-4">
          <textarea
            onChange={(e) => setTextQR(e.target.value)}
            placeholder="chattybot://cb/soft-skills-dialogue-sick"
            className="border border-gray-300 focus:border-gray-400 focus:outline-none rounded p-2 flex-1 shadow-sm outline-none"
          />
          <div className="h-[300px] w-[300px]">
          { textQR && 

            <QRCodeSVG 
              value={textQR}
              imageSettings={{
              src: 'https://eslvideo.com/images/logo-blue3.svg',
              height: 24,
              width: 24,
              excavate: true,
              
              }}
              height={300}
              width={300}
              minVersion={4}
            />
            }
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
