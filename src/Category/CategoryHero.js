import React from 'react';

const CategoryHero = ({ title, description }) => {
  return (
    <div className="category__hero-area">
      <div />
      <div className="category__hero-center">
        <div />
        <div className="category__hero-center__text">
          <div className="category__hero-center__text__title">{title}</div>
          <div className="category__hero-center__short-line" />
          <div className="category__hero-center__text__description">
            {description}
          </div>
        </div>
        <div />
      </div>
      <div />
    </div>
  );
};

export default CategoryHero;
