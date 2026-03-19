import { Network, Radar } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-12 animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="animate-spin" style={{ animationDuration: '20s' }}>
          <Radar className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          <span className="text-gradient">Network</span> Lookup
        </h1>
        <Network className="w-10 h-10 text-primary" />
      </div>

      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        Lookup IP addresses and domain names for geolocation, WHOIS data, and security reputation analysis
      </p>

      <div className="flex justify-center gap-2 mt-6">
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          Geolocation
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          WHOIS
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          Reputation
        </span>
      </div>
    </header>
  );
};
