import { FC, useState } from 'react';
import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SearchBar: FC = () => {
    const { setSearchTerm } = useStore();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search projects..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-4 py-2 pl-10 text-white bg-avax-blue/50 backdrop-blur-lg border border-avax-red/20 rounded-lg focus:ring-2 focus:ring-avax-red focus:border-transparent placeholder-white/40 transition-all"
            />
            <Search
                className={`absolute left-3 top-2.5 h-5 w-5 transition-colors ${
                    isFocused ? 'text-white' : 'text-[#FF394A]'
                }`}
            />
        </div>
    );
};