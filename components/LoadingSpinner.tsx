
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-300"
        role="status"
      >
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;