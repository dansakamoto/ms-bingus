import { FormEvent, useState, KeyboardEvent } from "react";
import sendPrompt from "@/client/services/sendPrompt";
import Bingus from "@/client/components/Bingus";
import type { BingusStatus } from "@/client/components/Bingus";

export default function App() {
  const [inputActive, setinputActive] = useState(true);
  const [mainText, setMainText] = useState("");
  const [bStatus, setBStatus] = useState<BingusStatus>("waiting");

  function kp(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  }

  const send = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!inputActive) return;

    setinputActive(false);
    setBStatus("loading");

    const textinput = document.getElementById("chatInput");
    const input = textinput ? textinput.innerHTML : "";
    console.log(textinput);
    if (textinput) textinput.innerHTML = "";
    sendPrompt(input)
      .then((res) => {
        setMainText(res);
        setBStatus("speaking");
        setinputActive(true);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div id="app" className="h-full flex flex-col justify-end">
      <Bingus status={bStatus} mainText={mainText} />
      <div className="w-screen flex justify-end fixed bottom-0 left-0 right-0 max-w-5xl">
        <form method="post" className="w-full flex">
          {/*<input id="textBox" type="text" className="text-2xl"></input>*/}
          {/*<textarea id="textBox" className="text-2xl"></textarea>*/}
          <div className="bg-white rounded-2xl text-black w-full p-2 m-2 border-2 border-black">
            <div
              id="chatInput"
              role="textbox"
              className="text-xl w-full focus:outline-none"
              onKeyDown={kp}
              contentEditable
            ></div>
          </div>
          <button
            onClick={send}
            className="bg-[#1a1a1a] hover:bg-[#646cff] min-w-[100px] \
            p-1 rounded-2xl text-xl my-2 mr-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
