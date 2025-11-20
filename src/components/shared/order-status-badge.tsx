import { TPaymentStatus } from "@/types/order.type";
import { CheckCircle, Clock, CreditCard, XCircle } from "lucide-react";

export const getPaymentStatusConfig = (status: TPaymentStatus) => {
  switch (status) {
    case "Pending":
      return {
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: Clock,
      };
    case "Paid":
      return {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      };
    case "Failed":
      return {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
      };
    case "Refunded":
      return {
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: CreditCard,
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: Clock,
      };
  }
};
