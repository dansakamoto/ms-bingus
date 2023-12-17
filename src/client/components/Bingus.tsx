import LoadSpinner from "@/client/ui/LoadSpinner";
import bingusPic from "@/client/assets/bingus.png";

export type BingusStatus = "waiting" | "loading" | "speaking";

export default function Bingus({
  status,
  mainText,
}: {
  status: "waiting" | "loading" | "speaking";
  mainText: string;
}) {
  let speech = <></>;
  if (status == "loading") {
    speech = <LoadSpinner />;
  } else if (status == "speaking") {
    speech = <>{mainText}</>;
  }

  return (
    <>
      <div className="min-h-[50px] text-3xl">{speech}</div>
      <img src={bingusPic}></img>
    </>
  );
}
