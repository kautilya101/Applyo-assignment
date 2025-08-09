import { GradientBackground } from "@/components/GradientBackground";
import { getLoggedInUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BasePage() {

  const user = await getLoggedInUser();
  if(user){
    redirect("/board");
  }
	return (
		<main className="w-full h-screen relative">
      <GradientBackground>
        <div className="max-w-7xl mx-auto relative z-10 h-full flex items-center justify-center px-4">
						<div className="max-w-4xl w-full text-center">
							<div className="flex items-center justify-center flex-col space-y-8">
								<h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
									Track Your Tasks
									<span className="block text-gray-600 text-3xl md:text-4xl mt-4">
										Boost Your Productivity
									</span>
								</h1>
								<p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
									Organize, prioritize, and accomplish your goals with our
									advanced task management system. Stay focused, meet deadlines,
									and achieve more every day.
								</p>
							</div>
						</div>
					</div>
      </GradientBackground>
    </main>
	);
}
