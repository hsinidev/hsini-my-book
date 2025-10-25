import React, { useState, useEffect } from 'react';
import { BookCard } from './BookCard';
import { Spinner } from './Spinner';
import { Pagination } from './Pagination';
import { fetchBooksBySubject } from '../services/openLibrary';
import { NavigateTo, SubjectBook } from '../types';

interface CategoryTabsProps {
  navigateTo: NavigateTo;
}

const categories = [
  { name: 'Science Fiction', subject: 'science_fiction' },
  { name: 'Fantasy', subject: 'fantasy' },
  { name: 'Romance', subject: 'romance' },
  { name: 'Mystery & Thriller', subject: 'mystery' },
  { name: 'History', subject: 'history' },
];

const CATEGORY_LIMIT = 18;

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ navigateTo }) => {
  const [activeSubject, setActiveSubject] = useState(categories[0].subject);
  const [books, setBooks] = useState<SubjectBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // When subject changes, reset page to 1 and load books
    loadBooks(activeSubject, 1);
  }, [activeSubject]);

  const loadBooks = async (subject: string, page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { works, work_count } = await fetchBooksBySubject(subject, page); 
      setBooks(works);
      setTotalPages(Math.ceil(work_count / CATEGORY_LIMIT));
      setCurrentPage(page);
      if (page !== currentPage) {
        window.scrollTo(0, 0); // Scroll to top only on page change, not initial load
      }
    } catch (err) {
      setError('Could not load books for this category.');
      console.error(`CategoryTabs Error (${subject}):`, err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
      loadBooks(activeSubject, page);
  }

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
  }

  return (
    <div className="py-8">
      <p className="text-center text-gray-600 mb-6">
        Explore curated collections or use the search bar to find a specific book.
      </p>
      
      <div className="flex justify-center border-b border-gray-200 mb-8 space-x-2 sm:space-x-4">
        {categories.map((category) => (
          <button
            key={category.subject}
            onClick={() => handleSubjectChange(category.subject)}
            className={`px-3 sm:px-4 py-3 text-sm font-medium transition-colors duration-200 focus:outline-none whitespace-nowrap ${
              activeSubject === category.subject
                ? 'border-b-2 border-orange-600 text-orange-600'
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div>
        {loading && <Spinner />}
        {error && <p className="text-red-500 text-center py-10">{error}</p>}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onClick={() => navigateTo({ type: 'details', key: book.key, ia: book.ia?.[0] })}
                />
              ))}
            </div>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};
