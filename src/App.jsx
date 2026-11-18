import { useEffect, useRef, useState } from 'react';
import Slide from './components/Slide.jsx';

const slides = [
  {
    id: 'design',
    type: 'design',
    label: 'Фен и стайлер в уникальном дизайне',
    wheelLabel: (
      <>
        ФЕН-СТАЙЛЕР
        <br />
        2 В 1
      </>
    ),
    wheelAriaLabel: 'ФЕН-СТАЙЛЕР 2 В 1',
    wheelIcon: {
      active: '/wheel-design-active.png',
      inactive: '/wheel-design-inactive.png',
    },
    title: 'ФЕН и СТАЙЛЕР',
    subtitle: 'в уникальном дизайне',
    dryerImage: '/dryer-demo.png',
    stylerImage: '/styler-demo.png',
    productImage: '/hair-styler.png',
  },
  {
    id: 'lightweight',
    type: 'lightweight',
    label: 'Суперлёгкий стайлер',
    wheelLabel: 'СУПЕРЛЁГКИЙ',
    wheelAriaLabel: 'СУПЕРЛЁГКИЙ',
    wheelIcon: {
      active: '/wheel-lightweight-active.png',
      inactive: '/wheel-lightweight-inactive.png',
    },
    mobileEyebrow: (
      <>
        ЛЁГКОСТЬ
        <br />
        И КОМФОРТ
        <br />
        В РУКЕ
      </>
    ),
    mobileEyebrowIcon: '/lightweight-comfort-icon.png',
    image: '/lightweight-styler.png',
    mobileImage: '/lightweight-model-mobile.png',
    sealImage: '/lightweight-badge.png',
    sealText: (
      <>
        Не тяжелее
        <br />
        чашки кофе
      </>
    ),
    title: 'СУПЕРЛЁГКИЙ',
    description: (
      <>
        Уменьшает усталость рук
        <br className="mobile-copy-break" /> при сушке волос, делая
        <br className="mobile-copy-break" /> процедуру удобной и приятной
        <br className="mobile-copy-break" /> даже после напряжённого
        <br className="mobile-copy-break" /> рабочего дня.
      </>
    ),
    weight: '500 г',
  },
  {
    id: 'motor',
    type: 'motor',
    label: 'Инновационный японский мотор',
    wheelLabel: (
      <>
        ИННОВАЦИОННЫЙ
        <br />
        ЯПОНСКИЙ МОТОР
      </>
    ),
    wheelAriaLabel: 'ИННОВАЦИОННЫЙ ЯПОНСКИЙ МОТОР',
    wheelIcon: {
      active: '/wheel-motor-active.png',
      inactive: '/wheel-motor-inactive.png',
    },
    mobileEyebrow: (
      <>
        ИННОВАЦИОННЫЙ
        <br />
        ЯПОНСКИЙ МОТОР
      </>
    ),
    mobileEyebrowIcon: '/motor-fan-icon.svg',
    image: '/hair-dryer-motor.png',
    mobileImage: '/motor-detail-mobile.png',
    imageAlt: 'Детали бесщёточного мотора с магнитными полями',
    title: (
      <>
        <span className="motor-title-kicker">ДЛЯ ЦЕНИТЕЛЕЙ</span>
        <span className="motor-title-main">КОМФОРТА</span>
        <span className="motor-title-main">И КАЧЕСТВА</span>
        <span className="motor-title-tagline">В УХОДЕ ЗА ВОЛОСАМИ</span>
      </>
    ),
    subtitle: (
      <>
        Бесщёточный
        <br />
        мотор BLDC
      </>
    ),
    sealImage: '/lightweight-badge.png',
    sealText: (
      <>
        Салонная
        <br />
        мощность
      </>
    ),
  },
];

function App() {
  const presentationRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const presentation = presentationRef.current;
    if (!presentation) return undefined;

    const slidePages = [...presentation.querySelectorAll('.slide-page')];
    let activeIndex = -1;

    const updateVisibleSlides = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      slidePages.forEach((slidePage, index) => {
        const bounds = slidePage.getBoundingClientRect();
        const isVisible =
          bounds.top < viewportHeight * 0.8 &&
          bounds.bottom > viewportHeight * 0.2;
        slidePage.classList.toggle('is-visible', isVisible);

        const distance = Math.abs(
          (bounds.top + bounds.bottom) / 2 - viewportCenter
        );
        if (distance < closestDistance) {
          closestIndex = index;
          closestDistance = distance;
        }
      });

      if (closestIndex !== activeIndex) {
        activeIndex = closestIndex;
        setActiveSlide(closestIndex);
      }
    };

    presentation.classList.add('presentation--animated');
    updateVisibleSlides();
    window.addEventListener('scroll', updateVisibleSlides, { passive: true });
    window.addEventListener('resize', updateVisibleSlides);

    return () => {
      window.removeEventListener('scroll', updateVisibleSlides);
      window.removeEventListener('resize', updateVisibleSlides);
    };
  }, []);

  return (
    <main className="presentation" ref={presentationRef}>
      <nav className="slide-wheel" aria-label="Навигация по слайдам">
        <img
          className="slide-wheel-curve"
          src="/slide-wheel-curve.png"
          alt=""
          aria-hidden="true"
        />
        {slides.map((slide, index) => {
          const nextIndex = (activeSlide + 1) % slides.length;
          const positionClass =
            activeSlide === index
              ? 'is-active'
              : nextIndex === index
                ? 'is-before'
                : 'is-after';

          return (
            <button
              key={slide.id}
              className={`slide-wheel-item ${positionClass}`}
              type="button"
              aria-label={slide.wheelAriaLabel}
              aria-current={activeSlide === index ? 'true' : undefined}
              onClick={() => {
                const target = document.querySelectorAll('.slide-page')[index];
                if (!target) return;
                setActiveSlide(index);
                document.querySelectorAll('.slide-page').forEach((slidePage) => {
                  slidePage.classList.toggle('is-visible', slidePage === target);
                });
                window.scrollTo(0, target.offsetTop);
                window.dispatchEvent(new Event('scroll'));
              }}
            >
              <img
                src={
                  activeSlide === index
                    ? slide.wheelIcon.active
                    : slide.wheelIcon.inactive
                }
                alt=""
                aria-hidden="true"
              />
              {activeSlide === index && (
                <span className="slide-wheel-label">{slide.wheelLabel}</span>
              )}
            </button>
          );
        })}
      </nav>
      {slides.map((slide) => (
        <Slide key={slide.id} slide={slide} />
      ))}
    </main>
  );
}

export default App;
