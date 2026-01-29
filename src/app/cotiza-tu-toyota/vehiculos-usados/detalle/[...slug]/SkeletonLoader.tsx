import React from 'react';
import './loader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {/* Image Skeleton */}
      <div className="skeleton skeleton-image"></div>

      {/* Title and Price Skeleton */}
      <div className="skeleton-title-price">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
      </div>

      {/* Car Information Skeleton */}
      <div className="skeleton-info">
        <div className="skeleton skeleton-info-item"></div>
        <div className="skeleton skeleton-info-item"></div>
        <div className="skeleton skeleton-info-item"></div>
        <div className="skeleton skeleton-info-item"></div>
      </div>

      {/* Description Skeleton */}
      <div className="skeleton-description">
        <div className="skeleton skeleton-description-item"></div>
        <div className="skeleton skeleton-description-item"></div>
        <div className="skeleton skeleton-description-item"></div>
      </div>

      {/* Similar Vehicles Skeleton */}
      <div className="skeleton-similar">
        <div className="skeleton skeleton-similar-item"></div>
        <div className="skeleton skeleton-similar-item"></div>
        <div className="skeleton skeleton-similar-item"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
