import { FC } from 'react';
import { useStore } from '../store/useStore';

export const CategoryFilter: FC = () => {
    const { projects, selectedCategories, toggleCategory } = useStore();

    const categories = [...new Set(projects.map(project => project.category))];

    return (
        <div className="space-y-2">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Categories</h3>
            <div className="space-y-2">
                {categories.map((category) => (
                    <label
                        key={category}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCategories.has(category)}
                            onChange={() => toggleCategory(category)}
                            className="rounded border-gray-300 text-avax-red focus:ring-avax-red"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            {category}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};