"use client";

import { Toaster as HotToaster } from "react-hot-toast";

export function Toaster() {
  return (
    <HotToaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
          borderRadius: "8px",
          padding: "16px",
        },
        success: {
          iconTheme: {
            primary: "#65D9A5",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
}