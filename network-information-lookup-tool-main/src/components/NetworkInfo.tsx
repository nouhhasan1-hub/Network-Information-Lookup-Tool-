import { motion } from 'framer-motion';
import { Cpu, Building, Globe2 } from 'lucide-react';
import type { GeolocationData } from '@/types/network';

interface NetworkInfoProps {
  geolocation: GeolocationData;
}

export const NetworkInfo = ({ geolocation }: NetworkInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card rounded-xl overflow-hidden glow-border"
    >
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Cpu className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Network Details</h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Globe2 className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">IP Address</p>
            <p className="font-mono text-foreground truncate">{geolocation.ip}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">ISP / Organization</p>
            <p className="font-mono text-foreground truncate">{geolocation.isp}</p>
            <p className="text-sm text-muted-foreground truncate">{geolocation.org}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">AS Number</p>
            <p className="font-mono text-foreground text-sm truncate">{geolocation.as}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
