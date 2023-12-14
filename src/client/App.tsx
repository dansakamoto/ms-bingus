import './App.css'
import { FormEvent, useState } from 'react'
import LoadSpinner from "./ui/LoadSpinner";
import sendPrompt from "./services/sendPrompt";

export default function App() {
  const [mainText, setMainText] = useState(<></>);
  const [chatReady, setChatReady] = useState(true);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!chatReady) return;

    setChatReady(false);
    setMainText(<LoadSpinner />);
    const textinput = document.getElementById("textBox") as HTMLInputElement;
    const input = textinput.value;
    textinput.value = "";
    sendPrompt(input).then((res) => {
      setMainText(<>{res}</>);
      setChatReady(true);
    }).catch((e: Error) => {
      console.log(e);
    })
  };

  return (
    <>
      <div className="min-h-[50px]">{mainText}</div>
      <form method="post" onSubmit={send}>
        <input id="textBox" type="text"></input>
        <button className="bg-[#1a1a1a] hover:bg-[#646cff]" type="submit">Request his wisdom</button>
      </form>
    </>
  );
}
