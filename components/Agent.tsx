"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";
import { toast } from "react-hot-toast"; // Add this import
import { Toaster } from "@/components/Toaster";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "agent";
  content: string;
}

const Agent = ({
  userName,
  userId,
  type,
  interviewId,
  questions,
}: AgentProps) => {
  const router = useRouter();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage: SavedMessage = {
          role: message.role as "user" | "system" | "agent",
          content: message.transcript,
        };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const handleGenerateFeedback = async (messages: SavedMessage[]) => {
    const { success, feedbackId: id } = await createFeedback({
      interviewId: interviewId!,
      userId: userId!,
      transcript: messages,
    });

    console.log("success: ", success, " & id: ", id);

    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`);
    } else {
      console.log("Error generating feedback");
      router.push("/");
    }
  };

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        // Show toast before generating feedback
        toast.loading("Analyzing your interview responses...", {
          duration: 5000,
        });
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";

      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
    
    // Show toast notification when call ends
    if (type !== "generate") {
      toast.success("Generating your feedback...", {
        icon: "⏳",
        duration: 5000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const latestMessage = messages[messages.length - 1]?.content;

  const isCallInactiveOrFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className={"avatar"}>
            <Image src={"/ai-avatar.png"} alt={"vapi"} width={65} height={54} />
            {isSpeaking && <span className={"animate-speak"} />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src={"/user-avatar.png"}
              alt={"user-avatar"}
              width={540}
              height={540}
              className={"rounded-full object-cover size-[120px]"}
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className={"transcript"}>
            <p
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
              key={latestMessage}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className={"w-full flex justify-center"}>
        {callStatus !== "ACTIVE" ? (
          <button
            className={cn(
              "relative btn-call transition-all hover:scale-105",
              !isCallInactiveOrFinished
                ? "animate-pulse duration-5000"
                : "duration-300"
            )}
            onClick={handleCall}
          >
            <span
              className={cn(
                "absolute inset-0 rounded-full opacity-75",
                callStatus === CallStatus.CONNECTING ? "animate-ping" : "hidden"
              )}
            />
            <span className="relative z-10 flex items-center justify-center">
              {isCallInactiveOrFinished ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call
                </>
              ) : (
                <span className="flex">
                  <span className="animate-bounce mx-0.5">.</span>
                  <span className="animate-bounce mx-0.5 delay-75">.</span>
                  <span className="animate-bounce mx-0.5 delay-150">.</span>
                </span>
              )}
            </span>
          </button>
        ) : (
          <button
            className={"btn-disconnect"}
            onClick={() => {
              handleDisconnect();
            }}
          >
            End
          </button>
        )}
      </div>
      
      {/* Add Toaster component */}
      <Toaster />
    </>
  );
};
export default Agent;
