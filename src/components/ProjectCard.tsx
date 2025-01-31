import { FC, useState } from 'react';
import { Project } from '../types/Project';
import { Send, MessagesSquare, ExternalLink, ClipboardCopy, Calendar } from 'lucide-react';
import DexScreenerIcon from '/assets/socials/dexscreener.svg';
import ArenaIcon from '/assets/socials/arena.svg';

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    const [copied, setCopied] = useState(false);

    const copyContractAddress = () => {
        if (project.contract_address) {
            navigator.clipboard.writeText(project.contract_address);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'live':
                return 'bg-green-500/50 text-green-900 border border-green-800';
            case 'upcoming':
                return 'bg-avax-blue/10 text-avax-blue dark:text-white border border-avax-blue/20';
            case 'presale':
                return 'bg-yellow-500/50 text-yellow-900 border border-yellow-800';
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

                <div className="flex items-center justify-center gap-6 mt-6 mb-6">
                    {project.socials.twitter && (
                        <a
                            href={project.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF394A] hover:text-white transition-colors group relative"
                            title="Follow on Twitter"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Follow on Twitter
                            </span>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>                        </a>
                    )}
                    {project.socials.telegram && (
                        <a
                            href={project.socials.telegram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF394A] hover:text-white transition-colors group relative"
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
                            className="text-[#FF394A] hover:text-white transition-colors group relative"
                            title="Join Discord"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Join Discord
                            </span>
                            <MessagesSquare size={20} />
                        </a>
                    )}
                    {project.socials?.arena && (
                        <a
                            href={project.socials.arena}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF394A] hover:text-white transition-colors group relative"
                            title="Join Arena"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Join Arena
                            </span>
                            <img src={ArenaIcon} alt="Arena" className="w-5 h-5 [filter:invert(42%)_sepia(95%)_saturate(3418%)_hue-rotate(335deg)_brightness(99%)_contrast(101%)] group-hover:[filter:brightness(0)_invert(1)] transition-all" />
                        </a>
                    )}
                    <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF394A] hover:text-white transition-colors group relative"
                        title="Visit Website"
                    >
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Visit Website
                        </span>
                        <ExternalLink size={20} />
                    </a>
                    {project.dex?.dex_screener_url && (
                        <a
                            href={project.dex.swap_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF394A] hover:text-white transition-colors group relative"
                            title="Trade on DEX"
                        >
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-[#FF394A] bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Trade on DEX
                            </span>
                            <img
                                src={DexScreenerIcon}
                                alt="DexScreener"
                                className="w-5 h-5 [filter:invert(42%)_sepia(95%)_saturate(3418%)_hue-rotate(335deg)_brightness(99%)_contrast(101%)] group-hover:[filter:brightness(0)_invert(1)] transition-all"
                            />
                        </a>
                    )}
                </div>

                {project.contract_address && (
                    <div className="mt-6 p-6 border-t border-white/10">
                        <div className="flex items-center gap-3 bg-[#161617]/50 rounded-lg hover:bg-[#161617] transition-colors group">
                            <span className="text-xs text-white/60 font-medium">CA:</span>
                            <code className="text-sm text-white font-mono tracking-wider flex-1">
                                {project.contract_address.slice(0, 6)}...{project.contract_address.slice(-4)}
                            </code>
                            <button
                                onClick={copyContractAddress}
                                className="text-[#FF394A] hover:text-white transition-colors relative cursor-pointer"
                                title="Copy contract address"
                            >
                                <ClipboardCopy size={16} />
                                {copied && (
                                    <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-100 whitespace-nowrap">
                                        Copied!
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold leading-4 text-white font-display capitalize bg-[#FF394A]">
                        {project.category}
                    </span>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-white/75" />
                        <p className="font-mono text-xs font-normal text-white/75">
                            {new Date(project.launch_date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};