import type { FormEvent, KeyboardEvent } from "react";

export default function MessageInput({
  kp,
  send,
}: {
  kp: (e: KeyboardEvent) => void;
  send: (e?: FormEvent) => void;
}) {
  return (
    <div className="w-screen flex justify-center fixed bottom-0 left-0 right-0">
      <div className="w-full max-w-5xl">
        <form method="post" className="w-full flex pb-4">
          <div className="bg-white rounded-2xl text-black w-full p-2 m-2 border-2 border-black">
            <div
              id="chatInput"
              role="textbox"
              data-text="Speak to Bingus"
              className="text-xl w-full focus:outline-none"
              aria-label="Speak to Bingus"
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
