import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Home() {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    var gradient = new Gradient()
    gradient.initGradient('#canvas')
  }, [])
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen w-screen overflow-hidden relative z-10">
        <div className="background--custom">
          <canvas id="canvas"></canvas>
        </div>
        <div className="container h-1/2 mx-auto px-4 rounded-3xl transition">
          <div className="text-white  sm:pt-10 px-10 sm:px-20">
            <div>
              <h1 className="mb-5">Hello there</h1>
              <p className="mb-5 sm:text-xl max-w-xl">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
