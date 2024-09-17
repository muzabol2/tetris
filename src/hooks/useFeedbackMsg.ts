import { useState } from "react";

const useFeedbackMsg = (initialMessage: string | null = null) => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(initialMessage);

  const showMessage = (message: string, duration: number = 2000) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, duration);
  };

  return [feedbackMessage, showMessage] as const;
};

export { useFeedbackMsg };
