import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"
import {
  useToast as useToastOriginal,
} from "@/components/ui/use-toast"

export const useToast = useToastOriginal

export {
  type ToastProps,
  type ToastActionElement,
  Toast,
}