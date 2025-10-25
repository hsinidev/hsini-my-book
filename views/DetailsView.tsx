
import React, { useState, useEffect } from 'react';
import { fetchBookDetails, fetchAuthorDetails } from '../services/openLibrary';
import { Spinner } from '../components/Spinner';
import { BookDetails, AuthorDetails, NavigateTo } from '../types';

interface DetailsViewProps {
    bookKey: string;
    ia?: string;
    navigateTo: NavigateTo;
}

const COVERS_API_BASE = 'https://covers.openlibrary.org/b/id/';
const ARCHIVE_API_BASE = 'https://archive.org/details/';

export const DetailsView: React.FC<DetailsViewProps> = ({ bookKey, ia, navigateTo }) => {
    const [book, setBook] = useState<BookDetails | null>(null);
    const [author, setAuthor] = useState<AuthorDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const bookData = await fetchBookDetails(bookKey);
                setBook(bookData);

                const authorKey = bookData.authors?.[0]?.author.key;
                if (authorKey) {
                    const authorData = await fetchAuthorDetails(authorKey);
                    setAuthor(authorData);
                }
            } catch (err) {
                setError('Error loading book details.');
                console.error('Book Details Error:', err);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [bookKey]);

    if (loading) return <Spinner />;
    if (error || !book) return <p className="text-red-500 text-center py-10">{error || 'Book not found.'}</p>;

    const description = typeof book.description === 'string' 
        ? book.description 
        : (book.description?.value ?? 'No description available.');
    
    const coverId = book.covers?.[0] ?? null;
    const bookIA = ia || (book.ia && book.ia.length > 0 ? book.ia[0] : undefined);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-8">
            <div>
                {coverId ? (
                    <img src={`${COVERS_API_BASE}${coverId}-L.jpg`} alt={`Cover of ${book.title}`} className="w-full h-auto rounded-lg shadow-lg" />
                ) : (
                    <div className="w-full pt-[140%] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">No Cover</div>
                )}
            </div>
            <div>
                <h2 className="font-lora text-4xl font-bold mb-2">{book.title}</h2>
                <p className="text-xl text-gray-600 mb-6">
                    by{' '}
                    {author ? (
                        <a className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigateTo({ type: 'author', key: book.authors[0].author.key })}>
                            {author.name}
                        </a>
                    ) : (
                        'Unknown Author'
                    )}
                </p>
                
                {bookIA && (
                    <a href={`${ARCHIVE_API_BASE}${bookIA}/mode/2up`} target="_blank" rel="noopener noreferrer" className="inline-block mb-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-md transition hover:bg-blue-700">
                        Read Book
                    </a>
                )}
                
                <div className="prose" dangerouslySetInnerHTML={{ __html: description.replace(/\r\n/g, '<br />') }}></div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {book.subjects?.slice(0, 10).map(sub => (
                        <a key={sub} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer transition hover:bg-blue-600 hover:text-white" onClick={() => navigateTo({ type: 'subject', name: sub })}>
                            {sub}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
