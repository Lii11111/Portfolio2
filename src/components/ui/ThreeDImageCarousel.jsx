import React, { useState, useEffect, useRef, useCallback } from 'react';

// Embedded CSS Styles
const EMBEDDED_CSS = `
/* --- Cascade Slider Styles --- */
.cascade-slider_container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    z-index: 20; 
    user-select: none;
    -webkit-user-select: none; 
    touch-action: pan-y;
}

.cascade-slider_slides {
    position: relative;
    height: 100%; 
}

.cascade-slider_item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(0.3); 
    transition: all 1s ease; 
    opacity: 0;
    z-index: 1; 
    cursor: grab; 
}

.cascade-slider_item.now {
    cursor: default;
}

.cascade-slider_item:active {
    cursor: grabbing;
}

/* Slide Positioning Classes (Core 3D Logic - MUST REMAIN IN CSS) */
.cascade-slider_item.next {
    left: 50%;
    transform: translateY(-50%) translateX(-120%) scale(0.6);
    opacity: 1;
    z-index: 4; 
}

.cascade-slider_item.prev {
    left: 50%;
    transform: translateY(-50%) translateX(20%) scale(0.6);
    opacity: 1;
    z-index: 4; 
}

.cascade-slider_item.now {
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(1);
    opacity: 1;
    z-index: 5; 
}

/* Arrows - Structural CSS remains for positioning/size */
.cascade-slider_arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    cursor: pointer;
    z-index: 6; 
    transform: translate(0, -50%);
    width: 40px; 
    height: 40px; 
    transition: all 0.3s ease;
}

/* Arrow Positioning Fix (Responsive CSS) */
@media screen and (max-width: 575px) {
    .cascade-slider_arrow-left { 
        left: 5px; 
    }
    .cascade-slider_arrow-right { 
        right: 5px; 
    }
}

@media screen and (min-width: 576px) {
    .cascade-slider_arrow-left { left: -4%; }
    .cascade-slider_arrow-right { right: -4%; }
}

/* Image Containers */
.cascade-slider_item > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 0;
}

.cascade-slider_item a {
    display: block;
    padding: 0;
    margin: 0;
    transition: all 0.3s ease;
    text-decoration: none;
    line-height: 1;
}

/* Images */
.cascade-slider_slides img {
    max-width: 150px;
    width: 100%;
    height: auto; 
    display: block;
    transition: all 0.5s ease;
    object-fit: contain;
    background: transparent;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    margin-bottom: 0;
    padding: 0;
}

/* Label Text */
.cascade-slider_label {
    margin-top: 48px;
    padding-top: 12px;
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.5s ease;
    display: block;
    width: 100%;
    text-shadow: 
        0 0 10px rgba(74, 222, 128, 0.8),
        0 0 20px rgba(74, 222, 128, 0.4),
        2px 2px 4px rgba(0, 0, 0, 0.8),
        0 0 30px rgba(74, 222, 128, 0.2);
    white-space: nowrap;
    position: relative;
    z-index: 10;
    line-height: 1.2;
}

.cascade-slider_item:not(.now) .cascade-slider_label {
    opacity: 0.4;
    text-shadow: 
        0 0 5px rgba(74, 222, 128, 0.3),
        1px 1px 2px rgba(0, 0, 0, 0.5);
    transform: scale(0.8);
}

.cascade-slider_item.now .cascade-slider_label {
    opacity: 1;
    text-shadow: 
        0 0 15px rgba(74, 222, 128, 1),
        0 0 30px rgba(74, 222, 128, 0.6),
        3px 3px 6px rgba(0, 0, 0, 0.8),
        0 0 40px rgba(74, 222, 128, 0.3);
    transform: scale(1.1);
    animation: labelGlow 2s ease-in-out infinite;
}

@keyframes labelGlow {
    0%, 100% {
        text-shadow: 
            0 0 15px rgba(74, 222, 128, 1),
            0 0 30px rgba(74, 222, 128, 0.6),
            3px 3px 6px rgba(0, 0, 0, 0.8),
            0 0 40px rgba(74, 222, 128, 0.3);
    }
    50% {
        text-shadow: 
            0 0 20px rgba(74, 222, 128, 1.2),
            0 0 40px rgba(74, 222, 128, 0.8),
            3px 3px 6px rgba(0, 0, 0, 0.8),
            0 0 60px rgba(74, 222, 128, 0.5);
    }
}

.cascade-slider_item:not(.now) img {
    filter: grayscale(0.8) brightness(0.6) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    opacity: 0.5;
    transform: scale(0.8);
}

.cascade-slider_item.now img {
    filter: grayscale(0) brightness(1.2) drop-shadow(0 0 20px rgba(74, 222, 128, 0.8)) drop-shadow(0 0 40px rgba(74, 222, 128, 0.4));
    opacity: 1;
    transform: scale(1.3);
    animation: iconGlow 2s ease-in-out infinite;
}

@keyframes iconGlow {
    0%, 100% {
        filter: grayscale(0) brightness(1.2) drop-shadow(0 0 20px rgba(74, 222, 128, 0.8)) drop-shadow(0 0 40px rgba(74, 222, 128, 0.4));
    }
    50% {
        filter: grayscale(0) brightness(1.4) drop-shadow(0 0 30px rgba(74, 222, 128, 1)) drop-shadow(0 0 60px rgba(74, 222, 128, 0.6));
    }
}

/* --- Media Queries --- */
@media screen and (min-width: 414px) {
    .cascade-slider_container { height: 40vh; }
    .cascade-slider_slides img { max-width: 200px; }
}

@media screen and (min-width: 576px) {
    .cascade-slider_container { height: 60vh; }
    .cascade-slider_slides img { max-width: 270px; }
}

@media screen and (min-width: 768px) {
    .cascade-slider_item.next { transform: translateY(-50%) translateX(-125%) scale(0.6); }
    .cascade-slider_item.prev { transform: translateY(-50%) translateX(25%) scale(0.6); }
    .cascade-slider_slides img { max-width: 250px; }
}

@media screen and (min-width: 991px) {
    .cascade-slider_item.next { transform: translateY(-50%) translateX(-115%) scale(0.55); z-index: 4; }
    .cascade-slider_item.prev { transform: translateY(-50%) translateX(15%) scale(0.55); z-index: 4; }
    .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-150%) scale(0.37); z-index: 1; }
    .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(50%) scale(0.37); z-index: 2; }
    .cascade-slider_slides img { max-width: 300px; }
    .cascade-slider_container { height: 37vh; }
}

@media screen and (min-width: 1100px) {
    .cascade-slider_item.next { transform: translateY(-50%) translateX(-130%) scale(0.55); }
    .cascade-slider_item.prev { transform: translateY(-50%) translateX(30%) scale(0.55); }
    .cascade-slider_item.next2 { transform: translateY(-50%) translateX(-180%) scale(0.37); }
    .cascade-slider_item.prev2 { transform: translateY(-50%) translateX(80%) scale(0.37); }
    .cascade-slider_slides img { max-width: 350px; }
}
`;

// Helper Function: Get Slide Classes
const getSlideClasses = (index, activeIndex, total, visibleCount) => {
    const diff = index - activeIndex;
    if (diff === 0) return 'now';
    if (diff === 1 || diff === -total + 1) return 'next';
    if (visibleCount === 5 && (diff === 2 || diff === -total + 2)) return 'next2';
    if (diff === -1 || diff === total - 1) return 'prev';
    if (visibleCount === 5 && (diff === -2 || diff === total - 2)) return 'prev2';
    return '';
};

// ThreeDImageCarousel Component
const ThreeDImageCarousel = ({
    slides,
    itemCount = 5,
    autoplay = false,
    delay = 3,
    pauseOnHover = true,
    className = '',
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const autoplayIntervalRef = useRef(null);
    const total = slides.length;
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const swipeThreshold = 50;

    const navigate = useCallback((direction) => {
        setActiveIndex(current => {
            if (direction === 'next') {
                return (current + 1) % total;
            } else {
                return (current - 1 + total) % total;
            }
        });
    }, [total]);

    const startAutoplay = useCallback(() => {
        if (autoplay && total > 1) {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
            }
            autoplayIntervalRef.current = window.setInterval(() => {
                navigate('next');
            }, delay * 1000);
        }
    }, [autoplay, delay, navigate, total]);

    const stopAutoplay = useCallback(() => {
        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
            autoplayIntervalRef.current = null;
        }
    }, []);

    useEffect(() => {
        startAutoplay();
        return () => { stopAutoplay(); };
    }, [startAutoplay, stopAutoplay]);

    const handleMouseEnter = () => {
        if (autoplay && pauseOnHover) {
            stopAutoplay();
        }
    };

    const handleExit = (e) => {
        if (autoplay && pauseOnHover) {
            startAutoplay();
        }
        if (isDragging) {
            handleEnd(e.clientX);
        }
    };

    const handleStart = (clientX) => {
        setIsDragging(true);
        setStartX(clientX);
        stopAutoplay();
    };

    const handleEnd = (clientX) => {
        if (!isDragging) return;
        const distance = clientX - startX;
        if (Math.abs(distance) > swipeThreshold) {
            if (distance < 0) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }
        setIsDragging(false);
        setStartX(0);
    };

    const onMouseDown = (e) => handleStart(e.clientX);
    const onMouseUp = (e) => {
        handleEnd(e.clientX);
        startAutoplay();
    };
    const onTouchStart = (e) => handleStart(e.touches[0].clientX);
    const onTouchEnd = (e) => {
        handleEnd(e.changedTouches[0].clientX);
        startAutoplay();
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: EMBEDDED_CSS }} />
            <div
                className={`cascade-slider_container ${className} bg-transparent min-w-[600px]`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleExit}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                <div className="cascade-slider_slides">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`cascade-slider_item ${getSlideClasses(index, activeIndex, total, itemCount)}`}
                            data-slide-number={index}
                        >
                            <div className="flex flex-col items-center">
                                <a href={slide.href || '#'}>
                                    <img 
                                        src={slide.src} 
                                        alt={slide.label || `Slide ${index + 1}`}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = `https://placehold.co/350x200/4F46E5/ffffff?text=Slide%20${index + 1}`;
                                        }}
                                    />
                                </a>
                                {slide.label && (
                                    <span className="cascade-slider_label">{slide.label}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ThreeDImageCarousel;

