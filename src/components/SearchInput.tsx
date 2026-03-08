import { useState, FormEvent } from 'react';
import { Search, Globe, Server } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchInput = ({ onSearch, isLoading }: SearchInputProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glass-card rounded-xl p-1.5 glow-border">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 pl-4 text-muted-foreground">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-mono hidden sm:inline">//</span>
            </div>

            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter IP address or domain name..."
              name="network-query"
              className="flex-1 bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 font-mono text-base"
              disabled={isLoading}
            />

            <Button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 font-medium transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin">
                  <Server className="w-5 h-5" />
                </div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span className="ml-2 hidden sm:inline">Lookup</span>
            </Button>
          </div>
        </div>
      </form>

      <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => setQuery('8.8.8.8')}
          className="hover:text-primary transition-colors font-mono"
        >
          8.8.8.8
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => setQuery('cloudflare.com')}
          className="hover:text-primary transition-colors font-mono"
        >
          cloudflare.com
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => setQuery('github.com')}
          className="hover:text-primary transition-colors font-mono"
        >
          github.com
        </button>
      </div>
    </div>
  );
};
