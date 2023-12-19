import { FormEvent, useState, useEffect, KeyboardEvent } from "react";
import sendPrompt from "@/client/services/sendPrompt";
import Bingus from "@/client/components/Bingus";
import MessageInput from "@/client/components/MessageInput";
import type { BingusStatus } from "@/client/components/Bingus";
import "./App.css";

export default function App() {
  const [inputActive, setinputActive] = useState(true);
  const [mainText, setMainText] = useState("");
  const [bStatus, setBStatus] = useState<BingusStatus>("waiting");

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

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
    <div id="app" className="h-screen flex flex-col justify-end">
      <Bingus status={bStatus} mainText={mainText} />
      <MessageInput kp={kp} send={send} />
    </div>
  );
}
