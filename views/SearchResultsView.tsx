import React, { useState, useEffect } from 'react';
import { searchBooks } from '../services/openLibrary';
import { BookCard } from '../components/BookCard';
import { Spinner } from '../components/Spinner';
import { Pagination } from '../components/Pagination';
import { NavigateTo, SearchBook } from '../types';

interface SearchResultsViewProps {
    query: string;
    navigateTo: NavigateTo;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({ query, navigateTo }) => {
    const [results, setResults] = useState<SearchBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        // Reset to page 1 whenever the query changes and perform the initial search
        performSearch(1, true);
    }, [query]);

    const performSearch = async (page: number, isNewQuery = false) => {
        if (isNewQuery) {
            setCurrentPage(1);
            setTotalPages(0);
        }
        try {
            setLoading(true);
            setError(null);
            const { docs, numFound } = await searchBooks(query, page);
            setResults(docs);
            setTotalPages(Math.ceil(numFound / 30)); // 30 is the limit in searchBooks
            setCurrentPage(page);
            window.scrollTo(0, 0); // Scroll to top on page change
        } catch (err) {
            setError('Error fetching search results.');
            console.error('Search Error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

    return (
        <>
            <div className="mb-6">
                <h2 className="font-lora text-3xl font-bold">Search Results for "{query}"</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-8">
                {results.length > 0 ? (
                    results.map(book => (
                        <BookCard 
                            key={book.key} 
                            book={book} 
                            onClick={() => navigateTo({ type: 'details', key: book.key, ia: book.ia?.[0] })} 
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No results found.</p>
                )}
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={performSearch}
            />
        </>
    );
};
