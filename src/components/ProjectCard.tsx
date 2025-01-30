import { FC } from 'react';
import { Project } from '../types/Project';
import { Send, MessagesSquare, ExternalLink, ClipboardCopy, Calendar } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    const copyContractAddress = () => {
        if (project.contract_address) {
            navigator.clipboard.writeText(project.contract_address);
            // You might want to add a toast notification here
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'live':
                return 'bg-green-500/10 text-green-500 border border-green-500/20';
            case 'upcoming':
                return 'bg-avax-blue/10 text-avax-blue dark:text-white border border-avax-blue/20';
            default:
                return 'bg-gray-500/10 text-gray-500 border border-gray-500/20';
        }
    };

    return (
        <div className="bg-avax-blue dark:bg-[#161617] rounded-lg shadow-lg transition-all hover:shadow-xl hover:translate-y-[-2px] border border-white/10">
            <div className="relative">
                <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="w-full h-40 object-cover rounded-t-lg"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
                <p className="text-white/80 mb-4 line-clamp-2">{project.description}</p>

                {project.contract_address && (
                    <div className="mb-4 flex items-center gap-2 bg-[#161617] p-2 rounded-lg">
                        <span className="text-xs text-white/60">Contract:</span>
                        <code className="text-xs text-avax-red font-mono">
                            {project.contract_address.slice(0, 6)}...{project.contract_address.slice(-4)}
                        </code>
                        <button
                            onClick={copyContractAddress}
                            className="ml-auto text-white/60 hover:text-avax-red"
                            title="Copy contract address"
                        >
                            <ClipboardCopy size={14} />
                        </button>
                    </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-avax-blue/20 text-white border border-white/10 px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                    </span>
                    <span className="bg-avax-red/10 text-avax-red border border-avax-red/20 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(project.launch_date).toLocaleDateString()}
                    </span>
                </div>

                <div className="flex gap-4 mt-4">
                    {project.socials.twitter && (
                        <a
                            href={project.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-avax-red hover:text-white transition-colors group relative"
                            title="Follow on X (Twitter)"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Follow on X
                            </span>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    )}
                    {project.socials.telegram && (
                        <a
                            href={project.socials.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-avax-red hover:text-white transition-colors group relative"
                            title="Join Telegram"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Join Telegram
                            </span>
                            <Send size={20} />
                        </a>
                    )}
                    {project.socials.discord && (
                        <a
                            href={project.socials.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-avax-red hover:text-white transition-colors group relative"
                            title="Join Discord"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Join Discord
                            </span>
                            <MessagesSquare size={20} />
                        </a>
                    )}
                    <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-avax-red hover:text-white transition-colors group relative"
                        title="Visit Website"
                    >
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Visit Website
                        </span>
                        <ExternalLink size={20} />
                    </a>
                </div>

                {project.dex.swap_url && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <a
                            href={project.dex.swap_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-avax-red hover:text-white text-sm flex items-center gap-2 font-medium transition-colors"
                        >
                            Trade on DEX <ExternalLink size={16} />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};