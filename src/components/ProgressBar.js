import React from 'react'

const ProgressBar = ({progress}) => {
  console.log(progress)
  return (
    <div className='outer-prog'>
      <div className='inner-prog' style={{width:`${progress}%`,backgroundColor:'green'}}>

      </div>
    </div>
  )
}

export default ProgressBar