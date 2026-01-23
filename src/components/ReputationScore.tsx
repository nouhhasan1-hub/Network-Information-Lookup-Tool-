import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Bot, Wifi } from 'lucide-react';
import type { ReputationData } from '@/types/network';

interface ReputationScoreProps {
  reputation: ReputationData;
}

const getRiskStyles = (riskLevel: ReputationData['riskLevel']) => {
  switch (riskLevel) {
    case 'low':
      return { bg: 'bg-success/20', text: 'text-success', border: 'border-success/30' };
    case 'medium':
      return { bg: 'bg-warning/20', text: 'text-warning', border: 'border-warning/30' };
    case 'high':
      return { bg: 'bg-destructive/20', text: 'text-destructive', border: 'border-destructive/30' };
    case 'critical':
      return { bg: 'bg-destructive/30', text: 'text-destructive', border: 'border-destructive/50' };
  }
};

const getRiskIcon = (riskLevel: ReputationData['riskLevel']) => {
  switch (riskLevel) {
    case 'low':
      return <CheckCircle className="w-6 h-6" />;
    case 'medium':
      return <AlertTriangle className="w-6 h-6" />;
    case 'high':
    case 'critical':
      return <XCircle className="w-6 h-6" />;
  }
};

export const ReputationScore = ({ reputation }: ReputationScoreProps) => {
  const styles = getRiskStyles(reputation.riskLevel);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (reputation.score / 100) * circumference;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card rounded-xl overflow-hidden glow-border"
    >
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Security Reputation</h3>
      </div>
      
      <div className="p-6">
        {/* Score Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="10"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="45"
                fill="none"
                stroke={reputation.score >= 80 ? 'hsl(var(--success))' : reputation.score >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--destructive))'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <motion.span
                className="text-3xl font-bold font-mono text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {reputation.score}
              </motion.span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Score</span>
            </div>
          </div>
        </div>
        
        {/* Risk Level Badge */}
        <div className="flex justify-center mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${styles.bg} ${styles.text} border ${styles.border}`}>
            {getRiskIcon(reputation.riskLevel)}
            <span className="font-semibold uppercase tracking-wider text-sm">
              {reputation.riskLevel} Risk
            </span>
          </div>
        </div>
        
        {/* Threat Indicators */}
        <div className="grid grid-cols-2 gap-3">
          <ThreatIndicator
            icon={<AlertTriangle className="w-4 h-4" />}
            label="Malicious"
            active={reputation.isMalicious}
          />
          <ThreatIndicator
            icon={<Eye className="w-4 h-4" />}
            label="Proxy"
            active={reputation.isProxy}
          />
          <ThreatIndicator
            icon={<Wifi className="w-4 h-4" />}
            label="VPN"
            active={reputation.isVpn}
          />
          <ThreatIndicator
            icon={<Bot className="w-4 h-4" />}
            label="Bot"
            active={reputation.isBot}
          />
        </div>
        
        {/* Categories */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Categories</p>
          <div className="flex flex-wrap gap-2">
            {reputation.categories.map((cat, i) => (
              <span
                key={i}
                className="text-xs font-mono bg-secondary text-secondary-foreground px-2 py-1 rounded"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ThreatIndicator = ({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) => (
  <div
    className={`flex items-center gap-2 p-2 rounded-lg text-sm ${
      active
        ? 'bg-destructive/20 text-destructive'
        : 'bg-secondary/50 text-muted-foreground'
    }`}
  >
    {icon}
    <span>{label}</span>
    <span className="ml-auto font-mono text-xs">
      {active ? 'YES' : 'NO'}
    </span>
  </div>
);
