import React, { useState, useEffect } from 'react';
import { BookCard } from './BookCard';
import { Spinner } from './Spinner';
import { fetchBooksBySubject, fetchTrendingBooks } from '../services/openLibrary';
import { NavigateTo } from '../types';

interface CarouselProps {
  title: string;
  subject?: string;
  navigateTo: NavigateTo;
}

export const Carousel: React.FC<CarouselProps> = ({ title, subject, navigateTo }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fix: Pass page number to fetchBooksBySubject and handle the returned object structure.
        const fetchedBooks = subject
          ? (await fetchBooksBySubject(subject, 1)).works
          : await fetchTrendingBooks();
        setBooks(fetchedBooks);
      } catch (err) {
        setError('Could not load books.');
        console.error(`Carousel Error (${title}):`, err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [subject, title]);

  return (
    <section className="mb-12">
      <h2 className="font-lora text-3xl mb-6 pb-2 border-b border-gray-300">{title}</h2>
      <div className="flex overflow-x-auto pb-6 -mb-6 space-x-6">
        {loading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && books.map((book) => (
          <div key={book.key} className="flex-shrink-0 w-40">
            <BookCard
              book={book}
              onClick={() => navigateTo({ type: 'details', key: book.key, ia: book.ia?.[0] })}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
