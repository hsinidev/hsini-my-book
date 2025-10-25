
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SearchBook } from '../types';
import { fetchSuggestions } from '../services/openLibrary';
import { SearchIcon } from './icons';

const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const COVERS_API_BASE_CARD = 'https://covers.openlibrary.org/b/id/';

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchBook[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setQuery(searchQuery.trim());
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const debouncedFetch = useCallback(
    debounce(async (currentQuery: string) => {
      if (currentQuery.length > 2) {
        try {
          const results = await fetchSuggestions(currentQuery);
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Failed to fetch suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedFetch(query);
  }, [query, debouncedFetch]);
  
  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex > -1 && suggestions[activeIndex]) {
      handleSearch(suggestions[activeIndex].title);
    } else {
      handleSearch(query);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  }

  const highlightMatch = (text: string, queryToHighlight: string) => {
    if (!queryToHighlight.trim()) return <span>{text}</span>;
    try {
        const parts = text.split(new RegExp(`(${queryToHighlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === queryToHighlight.toLowerCase() ? (
                        <strong key={i} className="font-extrabold">{part}</strong>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    } catch (e) {
        console.warn("Regex error in highlightMatch:", e);
        return <span>{text}</span>;
    }
  };

  return (
    <div className="flex-grow max-w-lg relative" ref={containerRef}>
      <form className="flex border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm" onSubmit={handleSubmit} role="search">
        <input
          type="search"
          placeholder="Search books by title"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 text-base border-none outline-none"
        />
        <button type="submit" aria-label="Search" className="px-5 py-2 bg-transparent cursor-pointer text-gray-500">
          <SearchIcon />
        </button>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-lg z-50 max-h-[420px] overflow-y-auto shadow-lg">
          {suggestions.map((book, index) => (
            <div
              key={book.key}
              className={`flex items-center gap-4 p-2 cursor-pointer transition-colors duration-150 ${index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              onClick={() => handleSearch(book.title)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <img
                src={book.cover_i ? `${COVERS_API_BASE_CARD}${book.cover_i}-S.jpg` : 'https://picsum.photos/40/60'}
                alt={`Cover of ${book.title}`}
                className="w-10 h-[60px] object-cover bg-gray-200 rounded-sm flex-shrink-0"
              />
              <div className="overflow-hidden">
                <div className="font-bold text-sm truncate">{highlightMatch(book.title, query)}</div>
                <div className="text-xs text-gray-500 truncate">{book.author_name?.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
