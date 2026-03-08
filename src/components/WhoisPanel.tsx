import { FileText, Calendar, Server, Shield } from 'lucide-react';
import type { WhoisData } from '@/types/network';

interface WhoisPanelProps {
  whois: WhoisData;
}

export const WhoisPanel = ({ whois }: WhoisPanelProps) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden glow-border">
      <div className="p-4 border-b border-border flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">WHOIS Information</h3>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="space-y-3">
          <DataRow
            icon={<Server className="w-4 h-4" />}
            label="Domain"
            value={whois.domainName}
          />
          <DataRow
            icon={<Shield className="w-4 h-4" />}
            label="Registrar"
            value={whois.registrar}
          />
          <DataRow
            icon={<Calendar className="w-4 h-4" />}
            label="Created"
            value={whois.createdDate}
          />
          <DataRow
            icon={<Calendar className="w-4 h-4" />}
            label="Expires"
            value={whois.expiresDate}
            highlight={isExpiringSoon(whois.expiresDate)}
          />
          <DataRow
            icon={<Calendar className="w-4 h-4" />}
            label="Updated"
            value={whois.updatedDate}
          />
        </div>
        
        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Name Servers</p>
          <div className="space-y-1">
            {whois.nameServers.map((ns, i) => (
              <p key={i} className="font-mono text-sm text-foreground bg-secondary/50 px-2 py-1 rounded">
                {ns}
              </p>
            ))}
          </div>
        </div>
        
        <div className="pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {whois.status.map((status, i) => (
              <span
                key={i}
                className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow = ({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <span className={`font-mono text-sm ${highlight ? 'text-warning' : 'text-foreground'}`}>
      {value}
    </span>
  </div>
);

const isExpiringSoon = (dateStr: string): boolean => {
  const expiresDate = new Date(dateStr);
  const monthsUntilExpiry = (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30);
  return monthsUntilExpiry < 3;
};
