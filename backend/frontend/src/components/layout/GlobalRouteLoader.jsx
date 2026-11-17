import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function GlobalRouteLoader() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // page pehle render hone do
    const appearTimer = setTimeout(() => {
      setVisible(true);
    }, 100);

    // 4 sec baad loader hatao
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 3100);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* CENTER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* ANIMATION + TEXT */}
        <div className="flex flex-col items-center">
          {/* LOTTIE (slightly smaller) */}
          <DotLottieReact
            src="https://lottie.host/f2709b51-bb59-48eb-87a3-e93ff12d048c/OaguP5ieTI.lottie"
            loop
            autoplay
            className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]"
          />

          {/* TEXT — under flag */}
          <h2 className="-mt-3 text-center font-semibold tracking-[0.12em] text-lg sm:text-xl drop-shadow-md">
            <span className="text-orange-500">HAPPY</span>{" "}
            <span className="text-white">REPUBLIC</span>{" "}
            <span className="text-green-500">DAY</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
