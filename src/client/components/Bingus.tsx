import { useEffect } from "react";
import LoadDots from "@/client/ui/LoadDots";
import bingusPic from "@/client/assets/bingus.png";
import "./Bingus.css";

export type BingusStatus = "waiting" | "loading" | "speaking";

export default function Bingus({
  status,
  mainText,
}: {
  status: "waiting" | "loading" | "speaking";
  mainText: string;
}) {
  useEffect(() => {
    //const div = document.getElementById("bingusPic");
    //if (div) div.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  let speech = <></>;
  if (status == "loading") {
    speech = <LoadDots />;
  } else if (status == "speaking") {
    speech = <>{mainText}</>;
    const div = document.getElementById("speech-bubble");
    if (div) div.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  const speechBubble =
    status === "waiting" ? (
      <></>
    ) : (
      <div
        id="speech-bubble"
        className="speech-bubble min-h-[50px] text-xl md:text-3xl flex place-content-center \
        items-center p-3 m-2 md:after:left-[350px] after:bottom-1"
      >
        {speech}
      </div>
    );

  return (
    <div className="overflow-scroll max-w-5xl">
      {speechBubble}
      <img id="bingusPic" src={bingusPic}></img>
    </div>
  );
}
