import React from "react";
import InterviewCard from "@/components/InterviewCard";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import AnimatedHeroSection from "@/components/AnimatedHeroSection";
import CursorGlow from "@/components/CursorGlow";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user?.id) {
    return <div>Please sign in to continue</div>;
  }

  const [userInterviews, latestInterviews] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  // Ensure we have arrays even if the functions return null
  const safeUserInterviews = userInterviews || [];
  const safeLatestInterviews = latestInterviews || [];

  const hasPastInterviews = safeUserInterviews.length > 0;
  const hasUpcomingInterviews = safeLatestInterviews.length > 0;

  return (
    <>
      <CursorGlow />
      <AnimatedHeroSection />

      <section className={"flex flex-col gap-6 mt-8"}>
        <h2>Your Interviews</h2>

        <div className={"interviews-section"}>
          {hasPastInterviews ? (
            safeUserInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet.</p>
          )}
        </div>
      </section>

      <section className={"flex flex-col gap-6 mt-8"}>
        <h2>Take an interview</h2>

        <div className={"interviews-section"}>
          {hasUpcomingInterviews ? (
            safeLatestInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available.</p>
          )}
        </div>
      </section>
    </>
  );
};
export default Page;
