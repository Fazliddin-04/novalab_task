import React, { useEffect, useState } from 'react'
import { BsFillHouseFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

function Login() {
  const [section, setSection] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
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
  }, [isError, message, isSuccess, user, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const openSignup = () => {
    setSection(1)
    setTimeout(() => {
      navigate('/sign-up')
    }, 300)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div className="form-structor">
      <Link
        to="/"
        className="btn btn-ghost absolute top-10 left-10 text-2xl gap-3"
      >
        <BsFillHouseFill />{' '}
        <span className="hidden sm:inline">Back to Home</span>
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
      <form className={`signup max-w-xl ${!section && 'slide-up'}`}>
        <h2 className="form-title" onClick={() => openSignup()}>
          <span>or</span>Sign up
        </h2>
        <div className="form-holder">
          <input
            type="text"
            className="input-custom"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            className="input-custom"
            placeholder="Last Name"
            required
          />
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
        <button className="submit-btn">Sign up</button>
      </form>
      <div className={`login ${section && 'slide-up'}`}>
        <form className="center max-w-xl" onSubmit={onSubmit}>
          <h2 className="form-title" onClick={() => setSection(0)}>
            <span>or</span>Log in
          </h2>
          <div className="form-holder">
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
          <button className="submit-btn">Log in</button>
        </form>
      </div>
    </div>
  )
}

export default Login
