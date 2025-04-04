"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InterviewButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push("/interview");
  };

  return (
    <Button
      onClick={handleClick}
      className={"btn-primary max-sm:w-full"}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></span>
          Preparing...
        </>
      ) : (
        "Personalize an Interview"
      )}
    </Button>
  );
};

export default InterviewButton;
