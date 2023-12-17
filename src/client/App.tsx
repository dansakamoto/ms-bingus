import "./App.css";
import { FormEvent, useState } from "react";
import sendPrompt from "@/client/services/sendPrompt";
import Bingus from "@/client/components/bingus";
import type { BingusStatus } from "@/client/components/bingus";

export default function App() {
  const [inputActive, setinputActive] = useState(true);
  const [mainText, setMainText] = useState("");
  const [bStatus, setBStatus] = useState<BingusStatus>("waiting");

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!inputActive) return;

    setinputActive(false);
    setBStatus("loading");
    const textinput = document.getElementById("textBox") as HTMLInputElement;
    const input = textinput.value;
    //textinput.value = "";
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
    <>
      <Bingus status={bStatus} mainText={mainText} />
      <form method="post" onSubmit={send}>
        <input id="textBox" type="text" className="m-5 text-2xl"></input>
        <button className="bg-[#1a1a1a] hover:bg-[#646cff]" type="submit">
          Speak to Bingus
        </button>
      </form>
    </>
  );
}
