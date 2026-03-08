import { Loader2, Database, Shield, MapPin } from 'lucide-react';

export const LoadingState = () => {
  const steps = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Resolving location...' },
    { icon: <Database className="w-5 h-5" />, label: 'Querying WHOIS...' },
    { icon: <Shield className="w-5 h-5" />, label: 'Checking reputation...' },
  ];

  return (
    <div className="glass-card rounded-xl p-8 max-w-md mx-auto text-center">
      <div className="inline-block mb-6 animate-spin [animation-duration:1.5s]">
        <Loader2 className="w-12 h-12 text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Scanning Network...
      </h3>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 150}ms` }}
            className="flex items-center gap-3 text-muted-foreground animate-pulse"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {step.icon}
            </div>
            <span className="font-mono text-sm">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
