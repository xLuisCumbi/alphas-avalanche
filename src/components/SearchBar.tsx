import { FC } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SearchBar: FC = () => {
    const { setSearchTerm } = useStore();

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search projects..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-white bg-[#161617] border border-white/10 rounded-lg focus:ring-2 focus:ring-ava-red focus:border-transparent placeholder-white/40"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
        </div>
    );
};