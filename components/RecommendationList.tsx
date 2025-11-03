import React from 'react';
import type { BookRecommendation } from '../types';
import RecommendationCard from './RecommendationCard';

interface RecommendationListProps {
    recommendations: BookRecommendation[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:gap-8">
            {recommendations.map((book, index) => (
                <RecommendationCard key={`${book.title}-${index}`} book={book} />
            ))}
        </div>
    );
};

export default RecommendationList;
