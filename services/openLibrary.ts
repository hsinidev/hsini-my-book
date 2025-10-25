import { SearchBook, BookDetails, AuthorDetails, AuthorWork, SubjectBook } from '../types';

const API_BASE = 'https://openlibrary.org';
const SEARCH_LIMIT = 30;
const CATEGORY_LIMIT = 18;

export const searchBooks = async (query: string, page: number): Promise<{ docs: SearchBook[], numFound: number }> => {
  const offset = (page - 1) * SEARCH_LIMIT;
  const response = await fetch(`${API_BASE}/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,cover_i,ia&limit=${SEARCH_LIMIT}&offset=${offset}`);
  if (!response.ok) throw new Error('Network error during search');
  const data = await response.json();
  return { docs: data.docs, numFound: data.numFound };
};

export const fetchSuggestions = async (query: string): Promise<SearchBook[]> => {
    const response = await fetch(`${API_BASE}/search.json?q=${encodeURIComponent(query)}&fields=key,title,author_name,cover_i&limit=7`);
    if (!response.ok) throw new Error('Failed to fetch suggestions');
    const data = await response.json();
    return data.docs as SearchBook[];
};

export const fetchBookDetails = async (key: string): Promise<BookDetails> => {
    const response = await fetch(`${API_BASE}${key}.json`);
    if (!response.ok) throw new Error('Book not found');
    return response.json();
};

export const fetchAuthorDetails = async (key: string): Promise<AuthorDetails> => {
    const response = await fetch(`${API_BASE}${key}.json`);
    if (!response.ok) throw new Error('Author not found');
    return response.json();
};

export const fetchAuthorWorks = async (key: string): Promise<AuthorWork[]> => {
    const response = await fetch(`${API_BASE}/authors/${key}/works.json?limit=30`);
    if (!response.ok) throw new Error('Could not load author works');
    const data = await response.json();
    return data.entries;
};

export const fetchSubject = async (subject: string): Promise<{name: string, works: SubjectBook[]}> => {
    const formattedSubject = subject.toLowerCase().replace(/ /g, '_');
    const response = await fetch(`${API_BASE}/subjects/${formattedSubject}.json?limit=50`);
    if (!response.ok) throw new Error('Could not load subject');
    return response.json();
};

export const fetchBooksBySubject = async (subject: string, page: number): Promise<{ works: any[], work_count: number }> => {
    const offset = (page - 1) * CATEGORY_LIMIT;
    const response = await fetch(`${API_BASE}/subjects/${subject}.json?limit=${CATEGORY_LIMIT}&offset=${offset}`);
    if (!response.ok) throw new Error(`Could not load books for subject: ${subject}`);
    const data = await response.json();
    return { works: data.works, work_count: data.work_count };
}

// Fix: Add and export fetchTrendingBooks function.
export const fetchTrendingBooks = async (): Promise<SearchBook[]> => {
    const response = await fetch(`${API_BASE}/trending/weekly.json?limit=${CATEGORY_LIMIT}`);
    if (!response.ok) throw new Error('Could not load trending books');
    const data = await response.json();
    return data.works;
};
