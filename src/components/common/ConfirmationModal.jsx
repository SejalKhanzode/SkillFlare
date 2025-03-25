import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div>
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div>
            <IconBtn text={modalData?.btn1Text}
            onclick={modalData?.btn1Handler}/>
        <button onClick={modalData?.btn2}>
  {modalData?.btn2Text}
        </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
