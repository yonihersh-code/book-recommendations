import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-t-indigo-400 border-gray-600 rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
