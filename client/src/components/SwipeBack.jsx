import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SwipeBack() {
  const navigate = useNavigate();

  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = endX - startX;
      const diffY = Math.abs(endY - startY);

      // 🔥 Only trigger if:
      // - swipe starts near left edge
      // - swipe is mostly horizontal
      // - swipe distance is enough
      if (
        startX < 40 &&       // from left edge
        diffX > 100 &&       // swipe distance
        diffY < 80           // avoid vertical scroll conflict
      ) {
        navigate(-1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate]);

  return null;
}