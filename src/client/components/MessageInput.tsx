import type { FormEvent, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

export default function MessageInput({
  kp,
  send,
}: {
  kp: (e: KeyboardEvent) => void;
  send: (e?: FormEvent) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="w-screen flex justify-center fixed bottom-0 left-0 right-0">
      <div className="w-full max-w-5xl">
        <form method="post" className="w-full flex pb-4">
          <div className="bg-white rounded-2xl text-black w-full p-2 m-2 border-2 border-black">
            <div
              id="chatInput"
              role="textbox"
              data-text={t("speak_to_bingus")}
              className="text-xl w-full focus:outline-none"
              aria-label={t("speak_to_bingus")}
              onKeyDown={kp}
              contentEditable
            ></div>
          </div>
          <button
            onClick={send}
            className="bg-[#1a1a1a] hover:bg-[#646cff] min-w-[100px] \
        p-1 rounded-2xl text-xl my-2 mr-2"
          >
            {t("send")}
          </button>
        </form>
      </div>
    </div>
  );
}
