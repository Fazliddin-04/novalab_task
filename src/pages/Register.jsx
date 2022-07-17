import React, { useState, useEffect } from 'react'
import { BsFillHouseFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Register() {
  const [section, setSection] = useState(0)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const { first_name, last_name, email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const openLogin = () => {
    setSection(1)
    setTimeout(() => {
      navigate('/sign-in')
    }, 300)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      first_name,
      last_name,
      email,
    }

    dispatch(register(userData))
  }

  return (
    <div className="form-structor">
      <Link
        to="/"
        className="btn btn-ghost absolute top-10 left-10 text-2xl gap-3"
      >
        <BsFillHouseFill /> <span className='hidden sm:inline'>Back to Home</span>
      </Link>
      <svg
        className="fill-secondary col-start-1 row-start-1 h-screen w-full"
        width="1600"
        height="595"
        viewBox="0 0 1600 595"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 338L53.3 349.2C106.7 360.3 213.3 382.7 320 393.8C426.7 405 533.3 405 640 359.3C746.7 313.7 853.3 222.3 960 189.2C1066.7 156 1173.3 181 1280 159.2C1386.7 137.3 1493.3 68.7 1546.7 34.3L1600 0V595H1546.7C1493.3 595 1386.7 595 1280 595C1173.3 595 1066.7 595 960 595C853.3 595 746.7 595 640 595C533.3 595 426.7 595 320 595C213.3 595 106.7 595 53.3 595H0V338Z"></path>
      </svg>
      <form
        className={`signup max-w-xl ${section && 'slide-up'}`}
        onSubmit={onSubmit}
      >
        <h2 className="form-title">
          <span>or</span>Sign up
        </h2>
        <div className="form-holder">
          <input
            type="text"
            className="input-custom"
            id="first_name"
            value={first_name}
            onChange={onChange}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            className="input-custom"
            id="last_name"
            value={last_name}
            onChange={onChange}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            className="input-custom"
            id="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="input-custom"
            id="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            required
          />
        </div>
        <button className="submit-btn">Sign up</button>
      </form>
      <div className={`login ${!section && 'slide-up'}`}>
        <form className="center max-w-xl">
          <h2 className="form-title" onClick={() => openLogin()}>
            <span>or</span>Log in
          </h2>
          <div className="form-holder">
            <input
              type="email"
              className="input-custom"
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="input-custom"
              placeholder="Password"
              required
            />
          </div>
          <button className="submit-btn">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Register
