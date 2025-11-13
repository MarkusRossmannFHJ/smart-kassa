import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { AppDispatch } from "../../redux/store";
import { ToastWarningShowed } from "../../redux/slices/toastSlice";

export function useWarningToast(
  showToast: boolean,
  message: string,
  resetAction: AppDispatch
) {
  const toastShownRef = useRef(true);

  useEffect(() => {
    console.log("Toast State:", showToast);
    if (showToast && toastShownRef.current) {
      toast(message, {
        position: "top-center",
        closeButton: true,
        duration: 3000,
      });
      toastShownRef.current = false;
      resetAction(ToastWarningShowed());
    }
  }, [showToast, message, resetAction]);
}
