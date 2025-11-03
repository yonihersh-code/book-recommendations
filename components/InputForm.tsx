import React, { useState } from 'react';
import type { UserInput } from '../types';
import { BOOK_LENGTH_OPTIONS, GENDER_OPTIONS } from '../constants';

interface InputFormProps {
    onSubmit: (userInput: UserInput) => void;
    isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState<UserInput>({
        name: '',
        age: '',
        gender: GENDER_OPTIONS[0],
        tvShows: '',
        genres: '',
        pastBooks: '',
        favoriteAuthors: '',
        bookLength: BOOK_LENGTH_OPTIONS[0],
        otherFactors: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputClasses = "w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-500";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label htmlFor="name" className={labelClasses}>Your Name (Optional)</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g., Alex"
                    />
                </div>
                 <div>
                    <label htmlFor="age" className={labelClasses}>Age (Required)</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g., 28"
                        min="1"
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="gender" className={labelClasses}>Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={inputClasses}
                    >
                        {GENDER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="tvShows" className={labelClasses}>Favorite TV Shows or Movies</label>
                        <span className="text-xs text-gray-500 mb-2">One per line</span>
                    </div>
                    <textarea
                        id="tvShows"
                        name="tvShows"
                        value={formData.tvShows}
                        onChange={handleChange}
                        className={inputClasses}
                        rows={3}
                        placeholder="e.g., Stranger Things, The Office, Lord of the Rings"
                    />
                </div>
                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="genres" className={labelClasses}>Favorite Genres</label>
                        <span className="text-xs text-gray-500 mb-2">One per line</span>
                    </div>
                    <textarea
                        id="genres"
                        name="genres"
                        value={formData.genres}
                        onChange={handleChange}
                        className={inputClasses}
                        rows={3}
                        placeholder="e.g., Sci-Fi, Fantasy, Mystery, Romance"
                    />
                </div>
            </div>
            <div>
                 <div className="flex justify-between items-center">
                    <label htmlFor="pastBooks" className={labelClasses}>Books You've Enjoyed</label>
                    <span className="text-xs text-gray-500 mb-2">One per line</span>
                </div>
                <textarea
                    id="pastBooks"
                    name="pastBooks"
                    value={formData.pastBooks}
                    onChange={handleChange}
                    className={inputClasses}
                    rows={3}
                    placeholder="e.g., The Hobbit by J.R.R. Tolkien, Project Hail Mary by Andy Weir"
                />
            </div>
            <div>
                 <div className="flex justify-between items-center">
                    <label htmlFor="favoriteAuthors" className={labelClasses}>Favorite Authors</label>
                    <span className="text-xs text-gray-500 mb-2">One per line</span>
                </div>
                <textarea
                    id="favoriteAuthors"
                    name="favoriteAuthors"
                    value={formData.favoriteAuthors}
                    onChange={handleChange}
                    className={inputClasses}
                    rows={3}
                    placeholder="e.g., J.K. Rowling, Stephen King, Jane Austen"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="bookLength" className={labelClasses}>Preferred Book Length</label>
                    <select
                        id="bookLength"
                        name="bookLength"
                        value={formData.bookLength}
                        onChange={handleChange}
                        className={inputClasses}
                    >
                        {BOOK_LENGTH_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="otherFactors" className={labelClasses}>Anything else? (Optional)</label>
                    <input
                        type="text"
                        id="otherFactors"
                        name="otherFactors"
                        value={formData.otherFactors}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g., fast-paced plot, character-driven"
                    />
                </div>
            </div>
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center text-lg"
                >
                    {isLoading ? 'Finding your next read...' : 'Get Recommendations'}
                </button>
            </div>
        </form>
    );
};

export default InputForm;
