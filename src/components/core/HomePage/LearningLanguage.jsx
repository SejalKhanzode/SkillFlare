import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/CodeBlocks"

import know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg"

const LearningLanguage = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>
      <div className='text-4xl'>Your swiss knife for
        <HighlightText text={"learning any language"}/>
      </div>

      <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5'>
                <img 
                    src = {know_your_progress}
                    alt = "KNowYourProgressImage"
                    className='object-contain -mr-32 '
                />
                <img 
                    src = {compare_with_others}
                    alt = "KNowYourProgressImage"
                    className='object-contain'
                />
                <img 
                    src = {plan_your_lesson}
                    alt = "KNowYourProgressImage"
                    className='object-contain -ml-36'
                />
            </div>

            
    </div></div>
  )
}

export default LearningLanguage
