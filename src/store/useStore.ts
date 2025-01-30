import { create } from 'zustand';
import { Project } from '../types/Project';
import Fuse from 'fuse.js';

interface StoreState {
    projects: Project[];
    searchTerm: string;
    selectedCategories: Set<string>;
    selectedStatuses: Set<string>;
    setProjects: (projects: Project[]) => void;
    setSearchTerm: (term: string) => void;
    toggleCategory: (category: string) => void;
    toggleStatus: (status: string) => void;
    filteredProjects: () => Project[];
}

const fuseOptions = {
    keys: ['name', 'description', 'category'],
    threshold: 0.4,
};

export const useStore = create<StoreState>((set, get) => ({
    projects: [],
    searchTerm: '',
    selectedCategories: new Set(),
    selectedStatuses: new Set(),

    setProjects: (projects) => set({ projects }),
    setSearchTerm: (term) => set({ searchTerm: term }),

    toggleCategory: (category) => set((state) => {
        const newCategories = new Set(state.selectedCategories);
        if (newCategories.has(category)) {
            newCategories.delete(category);
        } else {
            newCategories.add(category);
        }
        return { selectedCategories: newCategories };
    }),

    toggleStatus: (status) => set((state) => {
        const newStatuses = new Set(state.selectedStatuses);
        if (newStatuses.has(status)) {
            newStatuses.delete(status);
        } else {
            newStatuses.add(status);
        }
        return { selectedStatuses: newStatuses };
    }),

    filteredProjects: () => {
        const { projects, searchTerm, selectedCategories, selectedStatuses } = get();
        let filtered = [...projects];

        if (selectedCategories.size > 0) {
            filtered = filtered.filter((p) => selectedCategories.has(p.category));
        }

        if (selectedStatuses.size > 0) {
            filtered = filtered.filter((p) => selectedStatuses.has(p.status));
        }

        if (searchTerm) {
            const fuse = new Fuse(filtered, fuseOptions);
            filtered = fuse.search(searchTerm).map((result) => result.item);
        }

        return filtered;
    },
}));