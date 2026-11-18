function Slide({ slide }) {
  return (
    <section className={`slide-page ${slide.type}-page`}>
      <article className={`slide ${slide.type}-slide`} aria-label={slide.label}>
        {slide.type === 'design' && (
          <>
            <h1 className="slide-title">
              {slide.title}
              <span>{slide.subtitle}</span>
            </h1>
            <div className="product-badge">2 в 1</div>

            <div className="model model-dryer">
              <span className="model-label">Фен</span>
              <img src={slide.dryerImage} alt="Девушка сушит волосы феном" />
            </div>

            <img
              className="product-image"
              src={slide.productImage}
              alt="Фен и стайлер"
            />

            <div className="model model-styler">
              <span className="model-label">Стайлер</span>
              <img
                src={slide.stylerImage}
                alt="Девушка укладывает волосы стайлером"
              />
            </div>
          </>
        )}

        {slide.type === 'lightweight' && (
          <>
            <div className="mobile-eyebrow">
              <img
                className="eyebrow-icon"
                src={slide.mobileEyebrowIcon}
                alt=""
              />
              {slide.mobileEyebrow}
            </div>
            <picture className="lightweight-model">
              <source media="(max-width: 600px)" srcSet={slide.mobileImage} />
              <img src={slide.image} alt="Девушка с лёгким стайлером и чашкой кофе" />
            </picture>

            <div className="weight-seal" aria-label="Не тяжелее чашки кофе">
              <img src={slide.sealImage} alt="" />
              <span>{slide.sealText}</span>
            </div>

            <div className="lightweight-copy">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <span className="weight-badge">{slide.weight}</span>
            </div>
          </>
        )}

        {slide.type === 'motor' && (
          <>
            <div className="mobile-eyebrow">
              <img
                className="eyebrow-icon"
                src={slide.mobileEyebrowIcon}
                alt=""
              />
              {slide.mobileEyebrow}
            </div>
            <picture className="motor-image">
              <source media="(max-width: 600px)" srcSet={slide.mobileImage} />
              <img src={slide.image} alt={slide.imageAlt} />
            </picture>
            <h2 className="motor-title">{slide.title}</h2>
            <p className="motor-subtitle">{slide.subtitle}</p>

            <div className="power-seal" aria-label="Салонная мощность">
              <img src={slide.sealImage} alt="" />
              <span>{slide.sealText}</span>
            </div>
          </>
        )}
      </article>
    </section>
  );
}

export default Slide;
