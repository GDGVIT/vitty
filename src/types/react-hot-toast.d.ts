declare module "react-hot-toast" {
  import * as React from "react";
  export const Toaster: React.FC<any>;
  type ToastFn = (message: string, options?: any) => void;
  const toast: {
    success: ToastFn;
    error: ToastFn;
    loading: ToastFn;
    dismiss: (toastId?: string) => void;
    (message: string, options?: any): string;
  };
  export default toast;
}


