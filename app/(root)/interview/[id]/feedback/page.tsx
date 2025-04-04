import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ButtonWithLoader from "@/components/ButtonWithLoader";
import AnimatedFeedbackContent from "@/components/AnimatedFeedbackContent";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id,
  });

  return (
    <section className="section-feedback">
      <AnimatedFeedbackContent interview={interview} feedback={feedback} />

      <div className="buttons">
        <ButtonWithLoader href="/" className="btn-secondary flex-1">
          <p className="text-sm font-semibold text-primary-200 text-center">
            Back to dashboard
          </p>
        </ButtonWithLoader>

        <ButtonWithLoader href={`/interview/${id}`} className="btn-primary flex-1">
          <p className="text-sm font-semibold text-black text-center">
            Retake Interview
          </p>
        </ButtonWithLoader>
      </div>
    </section>
  );
};

export default Feedback;