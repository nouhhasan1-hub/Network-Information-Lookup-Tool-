import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import type { LookupResult } from '@/types/network';

interface DownloadReportProps {
  result: LookupResult;
}

export const DownloadReport = ({ result }: DownloadReportProps) => {
  const generateReport = () => {
    const report = `
================================================================================
                    NETWORK INFORMATION LOOKUP REPORT
================================================================================

Query: ${result.query}
Type: ${result.type.toUpperCase()}
Generated: ${result.timestamp.toLocaleString()}

--------------------------------------------------------------------------------
                              GEOLOCATION
--------------------------------------------------------------------------------
${result.geolocation ? `
IP Address:     ${result.geolocation.ip}
City:           ${result.geolocation.city}
Region:         ${result.geolocation.region}
Country:        ${result.geolocation.country} (${result.geolocation.countryCode})
Coordinates:    ${result.geolocation.lat}, ${result.geolocation.lon}
Timezone:       ${result.geolocation.timezone}
ISP:            ${result.geolocation.isp}
Organization:   ${result.geolocation.org}
AS Number:      ${result.geolocation.as}
` : 'No geolocation data available'}

--------------------------------------------------------------------------------
                            WHOIS INFORMATION
--------------------------------------------------------------------------------
${result.whois ? `
Domain Name:    ${result.whois.domainName}
Registrar:      ${result.whois.registrar}
Created:        ${result.whois.createdDate}
Expires:        ${result.whois.expiresDate}
Updated:        ${result.whois.updatedDate}
Name Servers:   ${result.whois.nameServers.join(', ')}
Status:         ${result.whois.status.join(', ')}
Registrant:     ${result.whois.registrantOrg || 'N/A'}
Country:        ${result.whois.registrantCountry || 'N/A'}
` : 'No WHOIS data available'}

--------------------------------------------------------------------------------
                          SECURITY REPUTATION
--------------------------------------------------------------------------------
${result.reputation ? `
Score:          ${result.reputation.score}/100
Risk Level:     ${result.reputation.riskLevel.toUpperCase()}
Malicious:      ${result.reputation.isMalicious ? 'YES' : 'NO'}
Proxy:          ${result.reputation.isProxy ? 'YES' : 'NO'}
VPN:            ${result.reputation.isVpn ? 'YES' : 'NO'}
Tor:            ${result.reputation.isTor ? 'YES' : 'NO'}
Bot:            ${result.reputation.isBot ? 'YES' : 'NO'}
Categories:     ${result.reputation.categories.join(', ')}
` : 'No reputation data available'}

================================================================================
                    END OF REPORT
================================================================================
`.trim();

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `network-report-${result.query.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <Button
        onClick={generateReport}
        variant="outline"
        className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:text-primary font-medium"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Report
      </Button>
    </motion.div>
  );
};
