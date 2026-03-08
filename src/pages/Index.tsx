import { Header } from '@/components/Header';
import { SearchInput } from '@/components/SearchInput';
import { LoadingState } from '@/components/LoadingState';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useNetworkLookup } from '@/hooks/useNetworkLookup';
import { toast } from 'sonner';
import { useEffect } from 'react';

const Index = () => {
  const { result, isLoading, error, lookup, reset } = useNetworkLookup();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-background grid-pattern relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 scan-line opacity-30" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <Header />
        
        <div className="mb-12">
          <SearchInput onSearch={lookup} isLoading={isLoading} />
        </div>
        
        <ErrorBoundary>
          {isLoading ? (
            <LoadingState />
          ) : result ? (
            <ResultsDisplay result={result} onReset={reset} />
          ) : (
            <div className="text-center text-muted-foreground mt-16">
              <p className="font-mono text-sm">
                Enter an IP address or domain name to begin analysis
              </p>
            </div>
          )}
        </ErrorBoundary>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-mono">
            Network Intel • IP & Domain Lookup Tool
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
