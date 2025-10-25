
import React, { useState, useEffect } from 'react';
import { fetchAuthorDetails, fetchAuthorWorks } from '../services/openLibrary';
import { BookCard } from '../components/BookCard';
import { Spinner } from '../components/Spinner';
import { AuthorDetails, AuthorWork, NavigateTo } from '../types';

interface AuthorViewProps {
    authorKey: string;
    navigateTo: NavigateTo;
}

const COVERS_API_BASE = 'https://covers.openlibrary.org/b/id/';

export const AuthorView: React.FC<AuthorViewProps> = ({ authorKey, navigateTo }) => {
    const [details, setDetails] = useState<AuthorDetails | null>(null);
    const [works, setWorks] = useState<AuthorWork[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAuthorData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [detailsData, worksData] = await Promise.all([
                    fetchAuthorDetails(authorKey),
                    fetchAuthorWorks(authorKey)
                ]);
                setDetails(detailsData);
                setWorks(worksData);
            } catch (err) {
                setError('Error loading author page.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadAuthorData();
    }, [authorKey]);

    if (loading) return <Spinner />;
    if (error || !details) return <p className="text-red-500 text-center py-10">{error || 'Author not found.'}</p>;

    const photoUrl = details.photos?.[0] ? `${COVERS_API_BASE}${details.photos[0]}-M.jpg` : 'https://picsum.photos/150/150';

    return (
        <div>
            <div className="flex items-center gap-8 mb-12 pb-8 border-b border-gray-300">
                <img className="w-36 h-36 rounded-full object-cover bg-gray-300" src={photoUrl} alt={`Photo of ${details.name}`} />
                <div>
                    <h2 className="font-lora text-4xl font-bold">{details.name}</h2>
                </div>
            </div>
            <h3 className="font-lora text-3xl font-bold mb-6">Works by {details.name}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {works.map(work => (
                    <BookCard key={work.key} book={work} onClick={() => navigateTo({ type: 'details', key: work.key })} />
                ))}
            </div>
        </div>
    );
};
