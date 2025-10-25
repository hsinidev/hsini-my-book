
import React, { useState, useEffect } from 'react';
import { fetchSubject } from '../services/openLibrary';
import { BookCard } from '../components/BookCard';
import { Spinner } from '../components/Spinner';
import { NavigateTo, SubjectBook } from '../types';

interface SubjectViewProps {
    subjectName: string;
    navigateTo: NavigateTo;
}

export const SubjectView: React.FC<SubjectViewProps> = ({ subjectName, navigateTo }) => {
    const [subjectData, setSubjectData] = useState<{name: string, works: SubjectBook[]}|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const loadSubject = async () => {
             try {
                setLoading(true);
                setError(null);
                const data = await fetchSubject(subjectName);
                setSubjectData(data);
            } catch (err) {
                setError('Error loading subject page.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadSubject();
    }, [subjectName]);

    if (loading) return <Spinner />;
    if (error || !subjectData) return <p className="text-red-500 text-center py-10">{error || 'Subject not found.'}</p>;

    return (
         <div>
            <div className="mb-6">
                <h2 className="font-lora text-3xl font-bold">Subject: {subjectData.name}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-8">
                {subjectData.works.map(work => (
                    <BookCard key={work.key} book={work} onClick={() => navigateTo({ type: 'details', key: work.key })} />
                ))}
            </div>
        </div>
    );
};
