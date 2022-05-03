import React from 'react'
import './Counter.css'
import { FiThumbsDown, FiThumbsUp} from 'react-icons/fi'

function Counter({ icon, count, total }) {
  return (
    <div className='counter'>
        {(icon === "up") ? <FiThumbsUp className='icon' /> : <FiThumbsDown className='icon' />}
        <h6>{count} / {total}</h6>
    </div>
  )
}

export default Counter