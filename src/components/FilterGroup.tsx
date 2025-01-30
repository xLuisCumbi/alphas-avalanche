import { FC } from 'react';
import { useStore } from '../store/useStore';
import { Check } from 'lucide-react';

export const FilterGroup: FC = () => {
    const {
        projects,
        selectedCategories,
        selectedStatuses,
        toggleCategory,
        toggleStatus
    } = useStore();

    const categories = Array.from(new Set(projects.map((p) => p.category)));
    const statuses = Array.from(new Set(projects.map((p) => p.status)));

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-semibold text-white mb-4 text-left">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label
                            key={category}
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => toggleCategory(category)}
                        >
                            <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors
                                ${selectedCategories.has(category)
                                    ? 'bg-avax-red border-avax-red'
                                    : 'border-white/20 group-hover:border-avax-red'}`}
                            >
                                {selectedCategories.has(category) && (
                                    <Check size={12} className="text-white" />
                                )}
                            </div>
                            <span className="text-sm text-white/80">
                                {category}
                            </span>
                            <span className="text-xs text-white/40 ml-auto">
                                ({projects.filter(p => p.category === category).length})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-semibold text-white mb-4 text-left">Status</h3>
                <div className="space-y-2">
                    {statuses.map((status) => (
                        <label
                            key={status}
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => toggleStatus(status)}
                        >
                            <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors
                                ${selectedStatuses.has(status)
                                    ? 'bg-avax-red border-avax-red'
                                    : 'border-white/20 group-hover:border-avax-red'}`}
                            >
                                {selectedStatuses.has(status) && (
                                    <Check size={12} className="text-white" />
                                )}
                            </div>
                            <span className="text-sm text-white/80">
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                            <span className="text-xs text-white/40 ml-auto">
                                ({projects.filter(p => p.status === status).length})
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};