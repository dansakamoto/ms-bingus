import "./LoadDots.css";
import { useTranslation } from "react-i18next";

export default function LoadDots() {
  const { t } = useTranslation();
  return (
    <div className="dot-flashing">
      <p className="hidden" aria-hidden="false">
        {t("bingus_is_typing")}
      </p>
    </div>
  );
}
