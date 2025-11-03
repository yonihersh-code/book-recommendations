import React, { useState } from 'react';
import type { BookRecommendation } from '../types';
import { ShareIcon } from './icons/ShareIcon';
import { AMAZON_ASSOCIATE_TAG } from '../constants';

interface RecommendationCardProps {
    book: BookRecommendation;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ book }) => {
    const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

    // Construct the affiliate link by adding your tag to the base URL.
    const getAffiliateLink = (baseLink: string): string => {
        if (!baseLink || !AMAZON_ASSOCIATE_TAG || AMAZON_ASSOCIATE_TAG === 'your-amazon-tag-20') {
            return baseLink;
        }
        try {
            const url = new URL(baseLink);
            url.searchParams.set('tag', AMAZON_ASSOCIATE_TAG);
            return url.href;
        } catch (error) {
            console.error("Invalid purchase link URL:", baseLink);
            return baseLink; // Return original link if it's not a valid URL
        }
    };
    
    const affiliatePurchaseLink = getAffiliateLink(book.purchaseLink);

    const handleShare = async () => {
        const shareText = `Check out this book recommendation: "${book.title}" by ${book.author}. Here's why you might like it: ${book.reason}`;
        const shareData = {
            title: 'Book Recommendation',
            text: shareText,
            url: affiliatePurchaseLink,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(`${shareText} Purchase here: ${affiliatePurchaseLink}`);
            setShareStatus('copied');
            setTimeout(() => setShareStatus('idle'), 2000);
        }
    };

    return (
        <div className="bg-gray-800/60 p-6 rounded-xl shadow-lg border border-gray-700/50 transform hover:scale-[1.02] hover:border-indigo-600/50 transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-xl font-bold text-indigo-300">{book.title}</h3>
                            <p className="text-md text-gray-400">by {book.author}</p>
                        </div>
                        {book.kindleUnlimited && (
                            <span className="bg-yellow-500/20 text-yellow-300 text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                                Kindle Unlimited
                            </span>
                        )}
                    </div>
                    <p className="text-gray-300 mt-3 mb-4">{book.reason}</p>
                    <div className="flex items-center gap-4 mt-auto">
                        <a
                            href={affiliatePurchaseLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors"
                        >
                            Purchase
                        </a>
                        <button
                            onClick={handleShare}
                            className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors relative"
                            aria-label="Share recommendation"
                        >
                            <ShareIcon className="w-5 h-5" />
                            {shareStatus === 'copied' && (
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                                    Copied!
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationCard;
