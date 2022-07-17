import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { update, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import pattern from '../assets/hollowed-boxes.png'
import Footer from '../components/Footer'

function Profile() {
  // eslint-disable-next-line no-unused-vars
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const [formData, setFormData] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    createdAt: user.createdAt,
    avatar: user.avatar,
  })

  const { id, first_name, last_name, email, createdAt, avatar } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/profile')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    try {
      if (user.first_name !== first_name || user.last_name !== last_name) {
        const userData = {
          first_name,
          last_name,
          id,
          email,
          createdAt,
          avatar,
        }

        dispatch(update(userData))
      }
    } catch (err) {
      toast.error(err)
    }
  }

  return (
    <>
      <Navbar />
      <div className="grid items-center min-h-screen bg-base-200 relative z-10 ">
        <div className="container px-4 mx-auto flex items-center flex-col gap-10">
          <div className="profile-heading">
            <div className="avatar gap-1">
              <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hidden">
                <img src={user.avatar ? user.avatar : pattern} alt="avatar" />
              </div>
            </div>
            <div className="aspect-none">
              <h1 className="text-6xl font-bold mt-5 mb-2">
                {user.first_name} {user.last_name}
              </h1>
              {user.createdAt ? (
                <p>Member since {new Date(user.createdAt).toDateString()}</p>
              ) : (
                <></>
              )}
              <p>ID: {user.id}</p>
            </div>
          </div>
          <div className="flex-1 max-w-xl">
            <form className="form-control gap-5" onSubmit={onSubmit}>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl mb-5">Personal Details</h3>
                <button className="btn btn-primary w-fit">Change</button>
              </div>
              <div className="flex flex-wrap gap-5">
                <label htmlFor="first_name" className="w-full max-w-sm">
                  First Name
                  <input
                    type="text"
                    id="first_name"
                    value={first_name}
                    onChange={onChange}
                    placeholder="First Name"
                    className="input input-bordered input-secondary w-full max-w-sm"
                  />
                </label>
                <label htmlFor="last_name" className="w-full max-w-sm">
                  Last Name
                  <input
                    type="text"
                    id="last_name"
                    value={last_name}
                    onChange={onChange}
                    placeholder="First Name"
                    className="input input-bordered input-secondary w-full max-w-sm"
                  />
                </label>
                <label htmlFor="email" className="w-full max-w-sm">
                  Email
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    className="input input-bordered input-secondary w-full max-w-sm mb-20"
                    disabled
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile
