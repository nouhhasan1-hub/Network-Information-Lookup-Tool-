import { motion } from 'framer-motion';
import { Loader2, Database, Shield, MapPin } from 'lucide-react';

export const LoadingState = () => {
  const steps = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Resolving location...' },
    { icon: <Database className="w-5 h-5" />, label: 'Querying WHOIS...' },
    { icon: <Shield className="w-5 h-5" />, label: 'Checking reputation...' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="glass-card rounded-xl p-8 max-w-md mx-auto text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="inline-block mb-6"
      >
        <Loader2 className="w-12 h-12 text-primary" />
      </motion.div>
      
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Scanning Network...
      </h3>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {step.icon}
            </div>
            <span className="font-mono text-sm">{step.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
