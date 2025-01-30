export interface Project {
  name: string;
  launch_date: string;
  category: string;
  description: string;
  website: string;
  logo: string;
  status: 'live' | 'upcoming' | 'ended';
  contract_address?: string;
  socials: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
  dex: {
    dex_screener_url?: string;
    swap_url?: string;
  };
}