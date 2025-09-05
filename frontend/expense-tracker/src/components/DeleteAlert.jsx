import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div className="">
      <p className='text-center'>{content}</p>
      <div className="flex justify-end mt-6">
          <button
          type="button"
          onClick={onDelete}
          className='btn-delete '
          >
            Delete
          </button>
      </div>
    </div>
  )
}

export default DeleteAlert