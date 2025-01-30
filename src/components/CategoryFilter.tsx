import { FC } from 'react';
import { useStore } from '../store/useStore';

export const CategoryFilter: FC = () => {
    const { projects, selectedCategory, setSelectedCategory } = useStore();

    const categories = Array.from(new Set(projects.map((p) => p.category)));

    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedCategory
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};