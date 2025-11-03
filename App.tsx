import React, { useState, useCallback } from 'react';
import type { UserInput, BookRecommendation } from './types';
import { getBookRecommendations } from './services/geminiService';
import InputForm from './components/InputForm';
import RecommendationList from './components/RecommendationList';
import Loader from './components/Loader';
import { BookOpenIcon } from './components/icons/BookOpenIcon';

const App: React.FC = () => {
    const [recommendations, setRecommendations] = useState<BookRecommendation[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>('');

    const handleGetRecommendations = useCallback(async (userInput: UserInput) => {
        setIsLoading(true);
        setError(null);
        setRecommendations([]);
        setUserName(userInput.name || '');
        try {
            const result = await getBookRecommendations(userInput);
            setRecommendations(result);
        } catch (e) {
            console.error(e);
            setError('An error occurred while fetching recommendations. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <main className="container mx-auto px-4 py-8 md:py-12">
                <header className="text-center mb-8 md:mb-12">
                    <div className="flex justify-center items-center gap-4 mb-2">
                        <BookOpenIcon className="w-10 h-10 text-indigo-400" />
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            TBR
                        </h1>
                    </div>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        To Be Read. Your next great book is waiting.
                    </p>
                </header>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/50 rounded-2xl shadow-2xl shadow-indigo-900/10 p-6 md:p-8 backdrop-blur-sm border border-gray-700">
                        <InputForm onSubmit={handleGetRecommendations} isLoading={isLoading} />
                    </div>

                    {isLoading && <Loader />}

                    {error && (
                        <div className="mt-8 text-center bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700">
                            <p>{error}</p>
                        </div>
                    )}

                    {!isLoading && recommendations.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-300">
                                Your Personalized Recommendations{userName ? `, ${userName}` : ''}
                            </h2>
                            <RecommendationList recommendations={recommendations} />
                        </div>
                    )}
                </div>
                 <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Google's Gemini API</p>
                    <p className="mt-1">As an Amazon Associate, we may earn from qualifying purchases.</p>
                </footer>
            </main>
        </div>
    );
};

export default App;