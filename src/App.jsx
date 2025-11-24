import { useState, useEffect } from 'react'
import './App.css'
import SmokeyBackground from './components/ui/SmokeyBackground'

function App() {
  const [activeSection, setActiveSection] = useState('')

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen relative">
      <SmokeyBackground 
        backdropBlurAmount="sm" 
        color="#0F5132" 
        className="fixed inset-0 z-0"
      />
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-center md:justify-end items-center py-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-4 md:px-6 py-3">
              <div className="flex items-center space-x-4 md:space-x-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className={`text-white font-semibold text-xs md:text-sm lg:text-base transition-colors duration-200 hover:text-green-300 tracking-tight ${
                    activeSection === 'about' ? 'text-green-300' : ''
                  }`}
                >
                  ABOUT ME
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`text-white font-semibold text-xs md:text-sm lg:text-base transition-colors duration-200 hover:text-green-300 tracking-tight ${
                    activeSection === 'projects' ? 'text-green-300' : ''
                  }`}
                >
                  PROJECTS
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`text-white font-semibold text-xs md:text-sm lg:text-base transition-colors duration-200 hover:text-green-300 tracking-tight ${
                    activeSection === 'contact' ? 'text-green-300' : ''
                  }`}
                >
                  CONTACT ME
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-4 lg:px-6 py-16 relative z-10">
        <main className="max-w-7xl mx-auto">
          <section id="about" className="mb-8 scroll-mt-20">
            <div className="relative">
              {/* Creative layout with image and text */}
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center justify-items-center lg:justify-items-start">
                {/* Image Section - First on mobile, left side on desktop */}
                <div className="relative order-1 lg:order-1 mb-6 lg:mb-0">
                  <div className="relative w-full max-w-sm md:max-w-md mx-auto lg:mx-0 lg:mr-0">
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
                <div className="order-2 lg:order-2 space-y-6 text-center lg:text-left lg:pl-0">
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
                  <div className="flex items-center justify-center lg:justify-start gap-3 pt-6">
                    <a
                      href="https://github.com/Lii11111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5 text-white hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
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
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5 text-white hover:text-green-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
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
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
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
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
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
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 hover:bg-white/10 hover:border-green-400/50 transition-all duration-300 hover:scale-110"
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
          </section>
        </main>
      </div>
    </div>
  )
}

export default App

