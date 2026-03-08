import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import type { GeolocationData } from '@/types/network';

interface NetworkMapProps {
  geolocation: GeolocationData;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const createMapUrls = (lat: number, lon: number) => {
  const safeLat = clamp(lat, -85, 85);
  const safeLon = clamp(lon, -180, 180);
  const delta = 0.18;

  const left = clamp(safeLon - delta, -180, 180);
  const right = clamp(safeLon + delta, -180, 180);
  const top = clamp(safeLat + delta, -85, 85);
  const bottom = clamp(safeLat - delta, -85, 85);

  const bbox = `${left},${bottom},${right},${top}`;

  return {
    embed: `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${safeLat}%2C${safeLon}`,
    details: `https://www.openstreetmap.org/?mlat=${safeLat}&mlon=${safeLon}#map=10/${safeLat}/${safeLon}`,
  };
};

export const NetworkMap = ({ geolocation }: NetworkMapProps) => {
  const { lat, lon, city, country } = geolocation;
  const mapUrls = createMapUrls(lat, lon);

  return (
    <div className="glass-card rounded-xl overflow-hidden glow-border">
      <div className="p-4 border-b border-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Geolocation</h3>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Navigation className="w-4 h-4" />
          <span>{lat.toFixed(4)}, {lon.toFixed(4)}</span>
        </div>
      </div>

      <div className="h-64 relative bg-muted/20">
        <iframe
          title={`Map centered on ${city}, ${country}`}
          src={mapUrls.embed}
          loading="lazy"
          className="h-full w-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-card/40 to-transparent" />
      </div>

      <div className="p-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">City</span>
          <p className="font-mono text-foreground">{city}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Country</span>
          <p className="font-mono text-foreground">{country}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Region</span>
          <p className="font-mono text-foreground">{geolocation.region}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Timezone</span>
          <p className="font-mono text-foreground">{geolocation.timezone}</p>
        </div>
      </div>

      <div className="px-4 pb-4">
        <a
          href={mapUrls.details}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:opacity-80 transition-opacity font-mono"
        >
          Open in OpenStreetMap
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
