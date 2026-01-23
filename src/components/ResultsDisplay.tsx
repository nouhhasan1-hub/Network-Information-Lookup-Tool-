import { motion } from 'framer-motion';
import { Clock, RotateCcw } from 'lucide-react';
import { NetworkMap } from './NetworkMap';
import { WhoisPanel } from './WhoisPanel';
import { ReputationScore } from './ReputationScore';
import { NetworkInfo } from './NetworkInfo';
import { DownloadReport } from './DownloadReport';
import { Button } from '@/components/ui/button';
import type { LookupResult } from '@/types/network';

interface ResultsDisplayProps {
  result: LookupResult;
  onReset: () => void;
}

export const ResultsDisplay = ({ result, onReset }: ResultsDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Query Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/20 text-primary uppercase">
              {result.type}
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {result.timestamp.toLocaleTimeString()}
            </div>
          </div>
          <h2 className="text-2xl font-mono font-bold text-foreground glow-text">
            {result.query}
          </h2>
        </div>
        
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Lookup
        </Button>
      </motion.div>
      
      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {result.geolocation && <NetworkMap geolocation={result.geolocation} />}
          {result.geolocation && <NetworkInfo geolocation={result.geolocation} />}
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {result.whois && <WhoisPanel whois={result.whois} />}
          {result.reputation && <ReputationScore reputation={result.reputation} />}
        </div>
      </div>
      
      {/* Download Report */}
      <div className="max-w-md mx-auto">
        <DownloadReport result={result} />
      </div>
    </motion.div>
  );
};
