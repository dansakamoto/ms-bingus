import { useEffect } from "react";
import LoadSpinner from "@/client/ui/LoadSpinner";
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
    const div = document.getElementById("bingusPic");
    if (div) div.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);
  let speech = <></>;
  if (status == "loading") {
    speech = <LoadSpinner />;
  } else if (status == "speaking") {
    speech = <>{mainText}</>;
  }

  const speechBubble =
    status === "waiting" ? (
      <></>
    ) : (
      <div className="speech-bubble min-h-[50px] text-3xl flex place-content-center items-center p-3 m-2 ">
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
