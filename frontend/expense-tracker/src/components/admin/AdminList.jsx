import React from 'react'

const AdminList = ({users, onUpdate}) => {
  return (
    <div className='card'>
        <h1 className='text-xl mb-5'>Users</h1>
        
        <div className=''>
        <div className="flex justify-between border-b-2">
            <div className="w-1/4 font-semibold">Name</div>
            <div className="w-1/4 font-semibold">Email</div>
            <div className="w-1/4 font-semibold">Role</div>
            <div className="w-1/4 font-semibold">Is Active</div>
          </div>
          {users.map((user) => (
          <div className="mt-3">
            <div className="flex justify-between py-2">
              <div className="w-1/4 border-b pb-3 flex items-center">{user.fullName}</div>
              <div className="w-1/4 border-b pb-3 flex items-center">{user.email}</div>
              <div className="w-1/4 border-b pb-3 flex items-center">
                <button>
                  {user.isAdmin ? "Admin":"User"}
                </button>
              </div>
              <div className="w-1/4 border-b pb-3 flex items-center">
                <button onClick={()=> onUpdate(user._id)} className={`${user.status === "active" ? "bg-green-400" : "bg-red-400"} w-30 text-center px-4 py-1 rounded-lg`}>
                  {user.status === "active"? "Activated" : "Deactivated"}
                </button>
              </div>
              
            </div>
          </div>

))}
</div>

      </div>
  )
}

export default AdminList