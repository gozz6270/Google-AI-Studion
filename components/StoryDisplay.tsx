
import React, { useState, useEffect } from 'react';

interface StoryDisplayProps {
  imageUrl: string;
  storyText: string;
  isLoading: boolean;
}

const ImageWithLoader: React.FC<{ src: string, alt: string }> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
    }, [src]);

    return (
        <div className="relative w-full aspect-[4/3] bg-slate-700 rounded-lg overflow-hidden">
            <img
                src={src}
                alt={alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
            />
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-dashed rounded-full animate-spin border-amber-200"></div>
                </div>
            )}
        </div>
    );
};


const StoryDisplay: React.FC<StoryDisplayProps> = ({ imageUrl, storyText, isLoading }) => {
  return (
    <div className="relative">
      <ImageWithLoader src={imageUrl} alt="A scene from the adventure" />
      
      <div className="mt-6 bg-black/30 p-6 rounded-md border border-slate-600">
        <p className="text-amber-100 leading-relaxed whitespace-pre-wrap text-lg">
          {storyText}
        </p>
      </div>
    </div>
  );
};

export default StoryDisplay;