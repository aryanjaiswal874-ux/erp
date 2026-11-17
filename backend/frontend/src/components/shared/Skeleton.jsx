import React from 'react';

export const Skeleton = ({ className }) => {
    return (
        <div className={`animate-pulse bg-slate-200 rounded-md ${className}`}></div>
    );
};

export const ProductCardSkeleton = () => {
    return (
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-4">
            <Skeleton className="w-full aspect-[4/3] rounded-xl mb-4" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-4" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </div>
    );
};

export const ServiceCardSkeleton = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50">
            <Skeleton className="w-12 h-12 rounded-xl mb-6" />
            <Skeleton className="h-5 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    );
};
