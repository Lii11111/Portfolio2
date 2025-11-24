import React, { useRef, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

// Simple mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

const ThreeDCarousel = ({
  items,
  autoRotate = true,
  rotateInterval = 4000,
  cardHeight = 500,
}) => {
  const [active, setActive] = useState(0)
  const carouselRef = useRef(null)
  const [isInView, setIsInView] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const isMobile = useIsMobile()

  const minSwipeDistance = 50

  useEffect(() => {
    if (autoRotate && isInView && !isHovering) {
      const interval = setInterval(() => {
        setActive((prev) => (prev + 1) % items.length)
      }, rotateInterval)
      return () => clearInterval(interval)
    }
  }, [isInView, isHovering, autoRotate, rotateInterval, items.length])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }
    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current)
      }
      observer.disconnect()
    }
  }, [])

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) {
      setActive((prev) => (prev + 1) % items.length)
    } else if (distance < -minSwipeDistance) {
      setActive((prev) => (prev - 1 + items.length) % items.length)
    }
  }

  const getCardAnimationClass = (index) => {
    if (index === active) return 'scale-100 opacity-100 z-20'
    if (index === (active + 1) % items.length)
      return 'translate-x-[40%] scale-95 opacity-60 z-10'
    if (index === (active - 1 + items.length) % items.length)
      return 'translate-x-[-40%] scale-95 opacity-60 z-10'
    return 'scale-90 opacity-0'
  }

  return (
    <section className="bg-transparent min-w-full mx-auto flex items-center justify-center">
      <div className="w-full px-4 sm:px-6 lg:px-8 min-w-[350px] md:min-w-[1000px] max-w-7xl">
        <div
          className="relative overflow-hidden h-[550px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          ref={carouselRef}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute top-0 w-full max-w-md transform transition-all duration-500 ${getCardAnimationClass(
                  index
                )}`}
              >
                <div
                  className={`overflow-hidden bg-[#0F5132]/95 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg hover:shadow-xl flex flex-col h-[${cardHeight}px]`}
                >
                  <div
                    className="relative bg-black p-6 flex items-center justify-center h-48 overflow-hidden rounded-t-2xl"
                    style={{
                      backgroundImage: `url(${item.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                    <div className="p-6 flex flex-col flex-grow bg-[#0F5132]/90">
                    <h3 className="text-xl font-bold mb-1 text-white">
                      {item.title}
                    </h3>
                    {item.brand && (
                      <p className="text-gray-300 text-sm font-medium mb-2">
                        {item.brand}
                      </p>
                    )}
                    <p className="text-gray-200 text-sm flex-grow">
                      {item.description}
                    </p>

                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-500/30 backdrop-blur-sm border border-green-400/50 text-green-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 flex items-center hover:text-green-200 transition-colors relative group"
                      >
                        <span className="relative z-10">View Project</span>
                        <ArrowRight className="ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-green-300 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isMobile && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-green-300 hover:bg-white/20 z-30 shadow-lg transition-all hover:scale-110"
                onClick={() =>
                  setActive((prev) => (prev - 1 + items.length) % items.length)
                }
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-green-300 hover:bg-white/20 z-30 shadow-lg transition-all hover:scale-110"
                onClick={() => setActive((prev) => (prev + 1) % items.length)}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === idx
                    ? 'bg-green-300 w-8 shadow-lg shadow-green-300/50'
                    : 'bg-white/30 hover:bg-white/50 w-2'
                }`}
                onClick={() => setActive(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ThreeDCarousel

