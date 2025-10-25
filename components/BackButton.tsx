
import React from 'react';
import { BackIcon } from './icons';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="inline-flex items-center px-4 py-2 bg-gray-200 border border-gray-300 text-gray-800 rounded-md text-sm cursor-pointer transition hover:bg-gray-300"
      onClick={onClick}
    >
      <BackIcon /> Back
    </button>
  );
};
