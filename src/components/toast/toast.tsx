import clsx from "clsx";
import { useMemo } from "react";

type ToastParams = {
  message: string;
  type?: "success" | "error" | "info";
  showToast: boolean;
};

export const Toast = ({
  message,
  type = "info",
  showToast = false,
}: ToastParams): JSX.Element => {
  const alertType = useMemo(() => {
    switch (type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-error";
      case "info":
      default:
        return "alert-info";
    }
  }, [type]);

  return (
    <div className="toast">
      <div className={clsx("alert", alertType, { hidden: !showToast })}>
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
