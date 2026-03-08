import { useState, useCallback } from 'react';
import type { LookupResult, GeolocationData, WhoisData, ReputationData } from '@/types/network';

// Simple deterministic hash from a string to produce consistent "random" values
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

// Seeded pseudo-random number generator
const seededRandom = (seed: number, index: number): number => {
  const x = Math.sin(seed + index * 9301) * 10000;
  return x - Math.floor(x);
};

// Simulated API responses for demo — deterministic per query
const simulateGeolocation = (query: string): GeolocationData => {
  const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query);
  const seed = hashCode(query);
  
  const locations = [
    { city: 'San Francisco', region: 'California', country: 'United States', countryCode: 'US', lat: 37.7749, lon: -122.4194, timezone: 'America/Los_Angeles', isp: 'Cloudflare, Inc.', org: 'Cloudflare', as: 'AS13335 Cloudflare, Inc.' },
    { city: 'London', region: 'England', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London', isp: 'Amazon Technologies', org: 'AWS', as: 'AS16509 Amazon.com' },
    { city: 'Tokyo', region: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo', isp: 'Google LLC', org: 'Google Cloud', as: 'AS15169 Google LLC' },
    { city: 'Frankfurt', region: 'Hesse', country: 'Germany', countryCode: 'DE', lat: 50.1109, lon: 8.6821, timezone: 'Europe/Berlin', isp: 'Microsoft Corporation', org: 'Azure', as: 'AS8075 Microsoft' },
  ];
  
  const location = locations[seed % locations.length];
  
  return {
    ip: isIP ? query : `${seed % 255}.${(seed >> 8) % 255}.${(seed >> 16) % 255}.${(seed >> 24) % 255}`,
    ...location,
  };
};

const simulateWhois = (query: string): WhoisData => {
  const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query);
  const domain = isIP ? 'example.com' : query;
  const seed = hashCode(query);
  
  const registrars = ['GoDaddy.com, LLC', 'Namecheap, Inc.', 'Google Domains', 'Cloudflare, Inc.'];
  const statuses = ['clientTransferProhibited', 'clientUpdateProhibited', 'clientDeleteProhibited'];
  
  const createdOffset = seededRandom(seed, 1) * 10 * 365 * 24 * 60 * 60 * 1000;
  const expiresOffset = seededRandom(seed, 2) * 3 * 365 * 24 * 60 * 60 * 1000;
  const updatedOffset = seededRandom(seed, 3) * 365 * 24 * 60 * 60 * 1000;
  
  const created = new Date(Date.now() - createdOffset);
  const expires = new Date(Date.now() + expiresOffset);
  const updated = new Date(Date.now() - updatedOffset);
  
  return {
    domainName: domain.toUpperCase(),
    registrar: registrars[seed % registrars.length],
    createdDate: created.toISOString().split('T')[0],
    expiresDate: expires.toISOString().split('T')[0],
    updatedDate: updated.toISOString().split('T')[0],
    nameServers: [`ns1.${domain}`, `ns2.${domain}`],
    status: statuses.slice(0, (seed % 3) + 1),
    registrantOrg: 'Privacy Protected',
    registrantCountry: 'US',
  };
};

const simulateReputation = (query: string): ReputationData => {
  const seed = hashCode(query);
  const score = seed % 100;
  let riskLevel: ReputationData['riskLevel'];
  
  if (score >= 80) riskLevel = 'low';
  else if (score >= 50) riskLevel = 'medium';
  else if (score >= 20) riskLevel = 'high';
  else riskLevel = 'critical';
  
  return {
    score,
    riskLevel,
    isMalicious: score < 30,
    isProxy: seededRandom(seed, 10) > 0.8,
    isVpn: seededRandom(seed, 11) > 0.85,
    isTor: seededRandom(seed, 12) > 0.95,
    isBot: seededRandom(seed, 13) > 0.9,
    categories: ['Business', 'Technology', 'Hosting', 'Cloud Services', 'CDN'].slice(0, (seed % 3) + 1),
  };
};

export const useNetworkLookup = () => {
  const [result, setResult] = useState<LookupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate input
      const trimmedQuery = query.trim().toLowerCase();
      const isIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(trimmedQuery);
      const isDomain = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z]{2,})+$/.test(trimmedQuery);
      
      if (!isIP && !isDomain) {
        throw new Error('Please enter a valid IP address or domain name');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const lookupResult: LookupResult = {
        query: trimmedQuery,
        type: isIP ? 'ip' : 'domain',
        timestamp: new Date(),
        geolocation: simulateGeolocation(trimmedQuery),
        whois: simulateWhois(trimmedQuery),
        reputation: simulateReputation(trimmedQuery),
      };
      
      setResult(lookupResult);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, isLoading, error, lookup, reset };
};
