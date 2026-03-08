export interface GeolocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

export interface WhoisData {
  domainName: string;
  registrar: string;
  createdDate: string;
  expiresDate: string;
  updatedDate: string;
  nameServers: string[];
  status: string[];
  registrantOrg?: string;
  registrantCountry?: string;
}

export interface ReputationData {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  isMalicious: boolean;
  isProxy: boolean;
  isVpn: boolean;
  isTor: boolean;
  isBot: boolean;
  categories: string[];
}

export interface LookupResult {
  query: string;
  type: 'ip' | 'domain';
  timestamp: Date;
  geolocation: GeolocationData | null;
  whois: WhoisData | null;
  reputation: ReputationData | null;
  error?: string;
}
