import { motion } from 'framer-motion';
import { Network, Radar } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Radar className="w-10 h-10 text-primary" />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          <span className="text-gradient">Network</span> Intel
        </h1>
        <Network className="w-10 h-10 text-primary" />
      </div>
      
      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        Lookup IP addresses and domain names for geolocation, WHOIS data, and security reputation analysis
      </p>
      
      <motion.div
        className="flex justify-center gap-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          Geolocation
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          WHOIS
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
          Reputation
        </span>
      </motion.div>
    </motion.header>
  );
};
