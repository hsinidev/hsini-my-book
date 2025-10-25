
import React from 'react';
import { SearchForm } from './SearchForm';

interface HeaderProps {
  onSearch: (query: string) => void;
  onLogoClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onLogoClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between flex-wrap gap-4 sticky top-0 z-10">
      <a
        href="#"
        className="font-lora font-bold text-2xl text-gray-800 no-underline"
        onClick={(e) => {
          e.preventDefault();
          onLogoClick();
        }}
      >
        my library book
      </a>
      <SearchForm onSearch={onSearch} />
    </header>
  );
};
