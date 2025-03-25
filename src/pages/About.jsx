import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import banner1 from "../assets/Images/aboutus1.webp";
import banner2 from "../assets/Images/aboutus2.webp";
import banner3 from "../assets/Images/aboutus3.webp";
import foundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/About/Stats";
import ContactFormSection from "../components/core/About/ContactFormSection"

const About = () => {
  return (
    <div>
      <div className="bg-richblack-700">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-center items-center gap-10 text-center text-white">
          <header className="lg:w-[70%] text-4xl font-semibold py-20">
            Driving Innovation in Online Education for a
            <HighlightText text={"Brighter Future"} />
            <div className="lg:w-[95%] text-xl text-richblack-300 font-medium mt-3">
              SkillFlare is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </div>
          </header>

          <div className="lg:h-[150px] sm:h-[90px]"></div>

          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={banner1} alt="" />
            <img src={banner2} alt="" />
            <img src={banner3} alt="" />
          </div>
        </div>
      </div>
      {/* section2 */}
      <section className="border-b border-richblack-400 py-5 px-10 items-center justify-center">
        <div className="h-[150px]"></div>
        <div className=" md:text-4xl sm:text-xl pb-20">
          <div className="text-white justify-center items-center">
            We are passionate about revolutionizing the online education and
            shape you as a
            <HighlightText text={"Ranchoddas Shamaldas Chanchad"} />
            <span className="bg-gradient-to-b from-[#fbfafa] to-[#fefdfc] text-transparent bg-clip-text font-bold">
              {" "}
              not the
            </span>
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
              {" "}
              Chatur
            </span>
          </div>
        </div>
      </section>

      {/* section3 */}
      <section className=" flex w-11/12 items-center justify-center pt-20 text-richblack-100 pb-24">
        <div className="w-[50%] gap-10 flex flex-col ">
          <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
            Our Founding Story
          </h1>

          <p className="text-richblack-300 lg:w-[95%] font-medium ">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>
          <p className="text-richblack-300 lg:w-[95%] font-medium">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </p>
        </div>
        <div className="ml-10 shadow-[0_0_20px_0] shadow-[#FC6767]">
          <img src={foundingStory} alt="" />
        </div>
      </section>

      {/* secton 4 */}
      <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-center ">
      <div className="my-24 lg:w-[40%]  flex-col gap-10">
      <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
          <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
        </div>
        <div className="my-24 lg:w-[40%]  flex-col gap-10">
        <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
          <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>

      {/* section5 */}
<StatsComponent/>
<ContactFormSection/>
    </div>
  );
};

export default About;
