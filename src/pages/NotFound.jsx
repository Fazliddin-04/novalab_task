import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">
          <div className="max-w-lg">
            <h1 className="text-8xl mb-8 font-bold">Oops!</h1>
            <p className="text-5xl mb-8">404 - Page Not Found!</p>
            <Link to="/" className="btn btn-primary btn-lg">
              <FaHome className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NotFound
