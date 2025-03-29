"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, XCircle } from "lucide-react";

type AlertType = "success" | "error" | "info";

interface AlertMessageProps {
  type: AlertType;
  title: string;
  message: string;
  onClose?: () => void;
}

export function AlertMessage({ type, title, message, onClose }: AlertMessageProps) {
  const getStyles = () => {
    switch (type) {
      case "success":
        return { bgColor: "bg-green-100", borderColor: "border-green-500", textColor: "text-green-800" };
      case "error":
        return { bgColor: "bg-red-100", borderColor: "border-red-500", textColor: "text-red-800" };
      case "info":
      default:
        return { bgColor: "bg-blue-100", borderColor: "border-blue-500", textColor: "text-blue-800" };
    }
  };

  const { bgColor, borderColor, textColor } = getStyles();

  return (
    <Alert className={`relative flex items-start gap-3 p-4 border rounded-md shadow-md ${bgColor} ${borderColor} ${textColor} mb-3`}>
      <div>
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </div>
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </Alert>
  );
}
