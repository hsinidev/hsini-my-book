
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const COVERS_API_BASE = 'https://covers.openlibrary.org/b/id/';
const ARCHIVE_API_BASE = 'https://archive.org/details/';

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  let coverId: number | undefined;
  if ('cover_i' in book && book.cover_i) coverId = book.cover_i;
  else if ('covers' in book && book.covers && book.covers.length > 0) coverId = book.covers[0];
  else if ('cover_id' in book && book.cover_id) coverId = book.cover_id;

  const coverUrl = coverId 
    ? `${COVERS_API_BASE}${coverId}-M.jpg` 
    : 'https://picsum.photos/180/280';

  let authorName = 'Unknown Author';
  if ('author_name' in book && book.author_name) {
    authorName = book.author_name.join(', ');
  } else if ('authors' in book && book.authors) {
    authorName = book.authors.map(a => a.name).join(', ');
  }

  const iaId = 'ia' in book && book.ia?.[0];

  return (
    <div 
      className="bg-white rounded border border-gray-200 cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl flex flex-col"
      onClick={onClick}
      title={`${book.title} by ${authorName}`}
    >
      <div 
        className="w-full pt-[150%] bg-cover bg-center bg-gray-200 rounded-t"
        style={{ backgroundImage: `url('${coverUrl}')` }}
      ></div>
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <div className="font-bold text-sm mb-1 truncate">{book.title}</div>
          <div className="text-xs text-gray-600 mb-2 truncate">{authorName}</div>
        </div>
        {iaId && (
          <a
            href={`${ARCHIVE_API_BASE}${iaId}/mode/2up`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-auto py-1.5 px-2 text-xs text-center bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
            onClick={(e) => e.stopPropagation()}
          >
            Read Book
          </a>
        )}
      </div>
    </div>
  );
};
