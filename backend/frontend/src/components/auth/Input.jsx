import React from 'react';

const Input = ({ label, type = "text", error, className = "", ...props }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 text-sm ${error ? "border-red-500 focus:ring-red-200" : ""
                    }`}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1 pl-1">{error}</span>}
        </div>
    );
};

export default Input;
