import { useState, useEffect, useRef } from 'react'
import './App.css'
import SmokeyBackground from './components/ui/SmokeyBackground'
import ThreeDImageCarousel from './components/ui/ThreeDImageCarousel'
import ThreeDCarousel from './components/ui/ThreeDCarousel'

function App() {
  const [activeSection, setActiveSection] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const statsRef = useRef(null)
  const technicalRef = useRef(null)
  const [statsInView, setStatsInView] = useState(false)
  const [technicalInView, setTechnicalInView] = useState(false)

  const handleScroll = () => {
    const sections = ['about', 'projects', 'contact']
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statsRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!technicalRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTechnicalInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(technicalRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const SegmentedProgressBar = ({ percentage, animated = true }) => {
    const totalSegments = 20
    const filledSegments = Math.round((percentage / 100) * totalSegments)
    
    return (
      <div className="w-full bg-green-900/20 rounded border border-green-400/30 relative backdrop-blur-sm p-1 overflow-hidden">
        <div className="flex h-4 relative">
          {Array.from({ length: totalSegments }).map((_, index) => {
            const isFilled = index < filledSegments
            const isLast = index === totalSegments - 1
            return (
              <div key={index} className="relative flex-1" style={{ transform: 'skewX(-8deg)' }}>
                <div
                  className={`w-full h-full transition-all duration-500 ease-out ${
                    isFilled
                      ? 'bg-gradient-to-br from-green-400/80 via-green-500/90 to-green-400/80'
                      : 'bg-green-900/30'
                  }`}
                  style={{
                    animation: animated && isFilled 
                      ? `fillSegment 0.6s ease-out ${index * 0.05}s both, glowPulse 3s ease-in-out infinite ${index * 0.15}s`
                      : 'none',
                    boxShadow: isFilled
                      ? '0 0 12px rgba(74, 222, 128, 0.7), 0 0 20px rgba(74, 222, 128, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.3)'
                      : 'inset 0 1px 0 rgba(0, 0, 0, 0.2)',
                    clipPath: index === 0 
                      ? 'polygon(0 0, calc(100% - 2px) 0, calc(100% - 2px) 100%, 0 100%)'
                      : index === totalSegments - 1
                      ? 'polygon(2px 0, 100% 0, 100% 100%, 2px 100%)'
                      : 'polygon(2px 0, calc(100% - 2px) 0, calc(100% - 2px) 100%, 2px 100%)',
                    transformOrigin: 'left center',
                  }}
                >
                  {isFilled && (
                    <div className="w-full h-full bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>
                  )}
                </div>
                {!isLast && (
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-green-400/40 z-10 transition-opacity duration-300"
                    style={{ 
                      right: '0',
                      transform: 'skewX(8deg)',
                      boxShadow: '0 0 2px rgba(74, 222, 128, 0.5)',
                      opacity: isFilled ? 1 : 0.5
                    }}
                  ></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <SmokeyBackground 
        backdropBlurAmount="sm" 
        color="#0F5132" 
        className="fixed inset-0 z-0"
      />
      
      <div className="container mx-auto px-4 md:px-4 lg:px-6 py-16 relative z-10">
        <main className="max-w-7xl mx-auto">
          <section id="about" className="mb-6 md:mb-8 scroll-mt-20">
            <div className="relative">
              {/* Creative layout with image and text */}
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center justify-items-center lg:justify-items-start">
                {/* Image Section - First on mobile, left side on desktop */}
                <div className="relative order-1 lg:order-1 mb-4 md:mb-6 lg:mb-0 fade-in-section">
                  <div className="relative w-full max-w-[280px] md:max-w-md mx-auto lg:mx-0 lg:mr-0">
                    {/* Decorative background elements */}
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
                    
                    {/* Image container with creative border */}
                    <div className="relative z-10">
                      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="bg-white/5 rounded-2xl overflow-hidden">
                          <img 
                            src="/profile.jpg" 
                            alt="John Lester Esteves (Lii)" 
                            className="w-full h-auto object-cover aspect-square"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400x400/0F5132/ffffff?text=Lii'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Section - Second on mobile, right side on desktop */}
                <div className="order-2 lg:order-2 space-y-6 text-center lg:text-left lg:pl-0 fade-in-section">
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight leading-tight">
                      Hi!
                    </h2>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight md:whitespace-nowrap">
                      I'm{' '}
                      <span className="text-green-300">John Lester Esteves</span>
                      <span className="text-green-200"> (LII)</span>
                    </h2>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                      Passionate about bringing ideas to life through code and design. 
                      I enjoy the process of creating beautiful, functional web experiences 
                      that make a difference.
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center justify-center lg:justify-start gap-3 pt-6 fade-in-section">
                    <a
                      href="https://github.com/Lii11111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <svg className="w-6 h-6 text-white hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                        GitHub
                      </span>
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/john-lester-esteves-b519aa2b1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-6 h-6 text-white hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                        LinkedIn
                      </span>
                    </a>
                    
                    <a
                      href="https://www.facebook.com/Liiisjdz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5 text-white hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                        Facebook
                      </span>
                    </a>
                    
                    <a
                      href="https://www.instagram.com/liisjxvs/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5 text-white hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                        Instagram
                      </span>
                    </a>
                    
                    <a
                      href="mailto:lesteresteves03@gmail.com"
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="Email"
                    >
                      <svg className="w-5 h-5 text-white hover:text-green-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                        Email
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills, Hobbies, and Gaming Time Section */}
              <div ref={statsRef} className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-12 fade-in-section">
              {/* First Column - Soft Skills */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6">
                <h3 className="text-xs md:text-xl font-bold text-white mb-2 md:mb-4 tracking-tight">Soft Skills</h3>
                <div className="space-y-2 md:space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-[10px] md:text-sm text-gray-300 font-medium">Hardworking</span>
                      <span className="text-[10px] md:text-sm text-green-300 font-semibold">90%</span>
                    </div>
                    <SegmentedProgressBar percentage={90} animated={statsInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-[10px] md:text-sm text-gray-300 font-medium">Time Management</span>
                      <span className="text-[10px] md:text-sm text-green-300 font-semibold">90%</span>
                    </div>
                    <SegmentedProgressBar percentage={90} animated={statsInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-[10px] md:text-sm text-gray-300 font-medium">Adaptable</span>
                      <span className="text-[10px] md:text-sm text-green-300 font-semibold">100%</span>
                    </div>
                    <SegmentedProgressBar percentage={100} animated={statsInView} />
                  </div>
                </div>
              </div>

              {/* Second Column - Hobbies */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6">
                <h3 className="text-xs md:text-xl font-bold text-white mb-2 md:mb-4 tracking-tight">Hobbies</h3>
                <div className="space-y-2 md:space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-[10px] md:text-sm text-gray-300 font-medium">Coding</span>
                      <span className="text-[10px] md:text-sm text-green-300 font-semibold">80%</span>
                    </div>
                    <SegmentedProgressBar percentage={80} animated={statsInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-[10px] md:text-sm text-gray-300 font-medium">Gaming</span>
                      <span className="text-[10px] md:text-sm text-green-300 font-semibold">80%</span>
                    </div>
                    <SegmentedProgressBar percentage={80} animated={statsInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-[10px] md:text-sm text-gray-300 font-medium">Watching</span>
                      <span className="text-[10px] md:text-sm text-green-300 font-semibold">60%</span>
                    </div>
                    <SegmentedProgressBar percentage={60} animated={statsInView} />
                  </div>
                </div>
              </div>

              {/* Third Column - Gaming Time */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 flex flex-col justify-center items-center">
                <h3 className="text-xs md:text-xl font-bold text-green-300 mb-2 md:mb-4 tracking-wider" style={{ fontFamily: "'Orbitron', monospace", textShadow: '0 0 10px rgba(74, 222, 128, 0.8), 0 0 20px rgba(74, 222, 128, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.5)' }}>TIMEZONE</h3>
                <div className="text-sm md:text-4xl font-bold text-green-400 tracking-wider whitespace-nowrap" style={{ fontFamily: "'Orbitron', monospace", textShadow: '0 0 15px rgba(74, 222, 128, 0.8), 0 0 30px rgba(74, 222, 128, 0.4)' }}>
                  {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true 
                  }).toUpperCase()}
                </div>
                <div className="text-[8px] md:text-xl font-bold text-green-300 tracking-wider mt-1 md:mt-3 whitespace-nowrap text-center" style={{ fontFamily: "'Orbitron', monospace", textShadow: '0 0 8px rgba(74, 222, 128, 0.6), 0 0 15px rgba(74, 222, 128, 0.3)' }}>
                  {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}, {currentTime.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Technical Skills Section */}
            <div ref={technicalRef} className="mt-8 md:mt-16 fade-in-section">
              <h3 
                className="text-3xl md:text-4xl font-bold text-green-300 mb-8 text-center tracking-wider"
                style={{ 
                  fontFamily: "'Orbitron', monospace", 
                  textShadow: '0 0 15px rgba(74, 222, 128, 1), 0 0 30px rgba(74, 222, 128, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 40px rgba(74, 222, 128, 0.3)'
                }}
              >
                TECHNICAL SKILLS
              </h3>
              
              {/* Auto-scrolling Icons Carousel */}
              <div className="relative w-full overflow-hidden py-8">
                <div className="flex animate-scroll gap-12 md:gap-16">
                  {/* First set of icons */}
                  <div className="flex gap-12 md:gap-16 items-center flex-shrink-0">
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/tailwind1.png" alt="Tailwind" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/nodejs1.png" alt="Node.js" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/firebase.png" alt="Firebase" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/SQL.png" alt="SQL" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/supabase1.png" alt="Supabase" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex gap-12 md:gap-16 items-center flex-shrink-0">
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/tailwind1.png" alt="Tailwind" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/nodejs1.png" alt="Node.js" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/firebase.png" alt="Firebase" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/SQL.png" alt="SQL" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center icon-gaming">
                      <div className="relative">
                        <div className="absolute inset-0 bg-green-400/20 blur-xl rounded-full animate-pulse-glow"></div>
                        <img src="/supabase1.png" alt="Supabase" className="relative w-20 h-20 md:w-24 md:h-24 object-contain filter drop-shadow-[0_0_15px_rgba(74,222,128,0.8)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(74,222,128,1)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Progress Bars */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 mt-12">
                {/* Skills Grid - 2 columns on mobile */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">HTML5</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">80%</span>
                    </div>
                    <SegmentedProgressBar percentage={80} animated={technicalInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">CSS3</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">87%</span>
                    </div>
                    <SegmentedProgressBar percentage={87} animated={technicalInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">JAVASCRIPT</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">75%</span>
                    </div>
                    <SegmentedProgressBar percentage={75} animated={technicalInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">SUPABASE</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">65%</span>
                    </div>
                    <SegmentedProgressBar percentage={65} animated={technicalInView} />
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">FIREBASE</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">70%</span>
                    </div>
                    <SegmentedProgressBar percentage={70} animated={technicalInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">SQL</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">65%</span>
                    </div>
                    <SegmentedProgressBar percentage={65} animated={technicalInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">NODEJS</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">55%</span>
                    </div>
                    <SegmentedProgressBar percentage={55} animated={technicalInView} />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 md:mb-2">
                      <span className="text-xs md:text-sm text-gray-300 font-medium">NEXTJS</span>
                      <span className="text-xs md:text-sm text-green-300 font-semibold">60%</span>
                    </div>
                    <SegmentedProgressBar percentage={60} animated={technicalInView} />
                  </div>
                </div>
              </div>

              {/* Explore More Button */}
              <div className="flex items-center justify-center gap-4 mt-8 fade-in-section">
                {/* Left Arrow (pointing right >>) */}
                <div className="flex gap-1 animate-arrow-pulse">
                  <svg 
                    className="w-6 h-6 md:w-8 md:h-8 text-green-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <svg 
                    className="w-6 h-6 md:w-8 md:h-8 text-green-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                {/* Button with Container */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-400/50 rounded-xl px-6 md:px-8 py-3 md:py-4 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                >
                  <span 
                    className="text-green-300 italic text-lg md:text-xl font-semibold hover:text-green-200 transition-colors duration-300"
                    style={{
                      textShadow: '0 0 10px rgba(74, 222, 128, 0.8), 0 0 20px rgba(74, 222, 128, 0.4), 2px 2px 4px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    Explore More
                  </span>
                </button>
                
                {/* Right Arrow (pointing left <<) */}
                <div className="flex gap-1 animate-arrow-pulse">
                  <svg 
                    className="w-6 h-6 md:w-8 md:h-8 text-green-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <svg 
                    className="w-6 h-6 md:w-8 md:h-8 text-green-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(74, 222, 128, 0.8))'
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Navigation Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-green-300 transition-colors text-2xl"
            >
              ×
            </button>
            
            <h2 
              className="text-3xl md:text-4xl font-bold text-green-300 mb-8 text-center tracking-wider"
              style={{ 
                fontFamily: "'Orbitron', monospace", 
                textShadow: '0 0 15px rgba(74, 222, 128, 1), 0 0 30px rgba(74, 222, 128, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.8)'
              }}
            >
              EXPLORE ME
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={() => {
                  scrollToSection('about')
                  setIsModalOpen(false)
                }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/50 rounded-xl px-6 py-4 text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                ABOUT ME
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setIsProjectsModalOpen(true)
                }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/50 rounded-xl px-6 py-4 text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                PROJECTS
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false)
                  setIsContactModalOpen(true)
                }}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-400/50 rounded-xl px-6 py-4 text-white font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                CONTACT ME
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Modal */}
      {isProjectsModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsProjectsModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"></div>
          </div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 md:p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Back Button */}
            <button
              onClick={() => {
                setIsProjectsModalOpen(false)
                setIsModalOpen(true)
              }}
              className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center text-white hover:text-green-300 hover:bg-white/10 rounded-full transition-all duration-300 z-10"
              aria-label="Back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsProjectsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:text-green-300 hover:bg-white/10 rounded-full transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Header Section */}
            <div className="text-center mb-8 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-green-400/50 blur-sm"></div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-green-300 mb-3 tracking-wider relative"
                style={{ 
                  fontFamily: "'Orbitron', monospace", 
                  textShadow: '0 0 15px rgba(74, 222, 128, 1), 0 0 30px rgba(74, 222, 128, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.8)'
                }}
              >
                PROJECTS
              </h2>
              <p className="text-gray-400 text-sm md:text-base italic">
                Explore my latest work and creations
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            
            {/* 3D Carousel */}
            <ThreeDCarousel
              items={[
                {
                  id: 1,
                  title: 'Mini Sari-sari Store Website',
                  brand: '',
                  description: 'A simple website with a purpose of viewing and with a feature of monitoring total sales for every sessions.',
                  tags: ['React', 'Tailwind', 'Vite'],
                  imageUrl: '/mamas.png',
                  link: 'https://mamasss.vercel.app/'
                },
                {
                  id: 2,
                  title: 'Employee Management System',
                  brand: '',
                  description: 'A CRUD system for storing employee data with a backend of Express and a database of Supabase.',
                  tags: ['React', 'Express', 'Tailwind', 'Supabase'],
                  imageUrl: '/employee.png',
                  link: 'https://employee-management-system-psi-beryl.vercel.app/login'
                },
                {
                  id: 3,
                  title: 'MetroJobs Website (OJT Project)',
                  brand: '',
                  description: 'A manpower website used for viewing purposes of an applicant for the open positions.',
                  tags: ['HTML', 'CSS', 'Javascript'],
                  imageUrl: '/metro.png',
                  link: 'https://metro-jobs.vercel.app/'
                },
                {
                  id: 4,
                  title: 'LoopWork',
                  brand: '',
                  description: 'Modernized Office Management System that has 16 basic tools including premium one for daily office tasks.',
                  tags: ['React', 'Express', 'Supabase', 'Tailwind CSS'],
                  imageUrl: '/loopwork.png',
                  link: 'https://loopwork-seven.vercel.app/dashboard'
                }
              ]}
              autoRotate={true}
              rotateInterval={4000}
            />
          </div>
        </div>
      )}

      {/* Contact Me Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          {/* Modal Content */}
          <div 
            className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-green-300 transition-colors text-2xl"
            >
              ×
            </button>
            
            <h2 
              className="text-3xl md:text-4xl font-bold text-green-300 mb-8 text-center tracking-wider"
              style={{ 
                fontFamily: "'Orbitron', monospace", 
                textShadow: '0 0 15px rgba(74, 222, 128, 1), 0 0 30px rgba(74, 222, 128, 0.6), 3px 3px 6px rgba(0, 0, 0, 0.8)'
              }}
            >
              CONTACT ME
            </h2>
            
            {/* Contact content will go here */}
            <div className="text-white text-center">
              <p className="text-gray-400">Contact form coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

