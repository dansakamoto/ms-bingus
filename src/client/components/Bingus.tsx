import LoadDots from "@/client/ui/LoadDots";
import bingusPic from "@/client/assets/bingus.png";
import { useTranslation } from "react-i18next";
import "./Bingus.css";

export type BingusStatus = "waiting" | "loading" | "speaking" | "error";

export default function Bingus({
  status,
  mainText,
}: {
  status: BingusStatus;
  mainText: string;
}) {
  const { t } = useTranslation();

  let speech = <></>;
  if (status == "loading") {
    speech = <LoadDots />;
  } else if (status === "speaking" || status === "error") {
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
        className="speech-bubble min-h-[50px] text-2xl md:text-3xl flex place-content-center \
        items-center p-3 m-2 md:after:left-[350px] after:bottom-1"
        aria-live={status === "speaking" ? "polite" : "assertive"}
      >
        {speech}
      </div>
    );

  return (
    <div className="overflow-scroll max-w-5xl">
      {speechBubble}
      <img
        id="bingusPic"
        alt={`Bingus, ${t("a_pink_hairless_cat")}`}
        src={bingusPic}
        width="666"
        height="506"
      ></img>
    </div>
  );
}
