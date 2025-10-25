
export interface SearchBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  ia?: string[];
}

export interface SubjectBook {
  key: string;
  title: string;
  authors: { key: string; name: string }[];
  cover_id?: number;
  ia?: string[];
}

export interface BookDetails {
  title: string;
  authors: { author: { key: string } }[];
  description: string | { type: string; value: string };
  covers: number[];
  subjects: string[];
  ia?: string[];
}

export interface AuthorDetails {
  name: string;
  photos: number[];
  bio?: string | { type:string; value: string };
}

export interface AuthorWork {
  key: string;
  title: string;
  covers?: number[];
  ia?: string[];
}

export type Book = SearchBook | AuthorWork | SubjectBook;

export type StaticPage = 'about' | 'contact' | 'for-parents' | 'privacy' | 'terms' | 'dmca';

export type View =
  | { type: 'home' }
  | { type: 'search'; query: string }
  | { type: 'details'; key: string; ia?: string }
  | { type: 'author'; key: string }
  | { type: 'subject'; name: string }
  | { type: 'static'; page: StaticPage };

export type NavigateTo = (view: View) => void;
