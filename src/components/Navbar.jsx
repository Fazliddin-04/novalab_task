import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import pattern from '../assets/hollowed-boxes.png'
import axios from 'axios'

function Navbar() {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      const response1 = await axios.get('https://reqres.in/api/users')
      const response2 = await axios.get('https://reqres.in/api/users?page=2')
      if (response1.data && response2.data) {
        // eslint-disable-next-line array-callback-return
        response1.data.data.map((e) => {
          response2.data.data.push(e)
        })
        setData(response2.data.data)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="navbar sticky top-0 left-0 z-20 bg-primary text-primary-content">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Frontend Task
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="hidden sm:block dropdown dropdown-end">
          <input
            type="text"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search members"
            class="input input-bordered"
          />
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-68 max-h-96 overflow-y-scroll"
          >
            {data
              // eslint-disable-next-line array-callback-return
              ?.filter((user) => {
                if (query === '') {
                  return user
                } else if (
                  user.first_name.toLowerCase().includes(query.toLowerCase())
                ) {
                  return user
                }
              })
              .map((user, index) => (
                <li key={index}>
                  <div class="avatar">
                    <div class="w-8 rounded">
                      <img src={user.avatar} alt="" />
                    </div>

                    <p className="flex flex-col">
                      <span className="text-xl">{user.first_name}</span>
                      {user.email}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.avatar ? user.avatar : pattern} alt="avatar" />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <h3 className="text-xl p-2 text-neutral-content">
                  Signed in as{' '}
                  <span className="text-white">
                    {user.first_name ? user.first_name : user.name}
                  </span>
                </h3>
                <li>
                  <Link
                    to="/profile"
                    className={`${
                      location.pathname === '/profile' ? 'active' : ''
                    }`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={onLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/sign-in" className="btn btn-ghost normal-case text-xl">
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="btn btn-secondary normal-case text-xl"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
