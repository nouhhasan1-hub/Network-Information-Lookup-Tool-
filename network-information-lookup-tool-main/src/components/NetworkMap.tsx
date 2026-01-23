import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import type { GeolocationData } from '@/types/network';
import 'leaflet/dist/leaflet.css';

interface NetworkMapProps {
  geolocation: GeolocationData;
}

// Custom marker icon
const createCustomIcon = () => {
  return new Icon({
    iconUrl: 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="rgb(0, 255, 255)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10" fill="rgba(0, 255, 255, 0.2)"/>
        <circle cx="12" cy="12" r="4" fill="rgb(0, 255, 255)"/>
      </svg>
    `),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

const MapUpdater = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo([lat, lon], 10, { duration: 1.5 });
  }, [map, lat, lon]);
  
  return null;
};

export const NetworkMap = ({ geolocation }: NetworkMapProps) => {
  const { lat, lon, city, country, countryCode } = geolocation;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-xl overflow-hidden glow-border"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Geolocation</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
          <Navigation className="w-4 h-4" />
          <span>{lat.toFixed(4)}, {lon.toFixed(4)}</span>
        </div>
      </div>
      
      <div className="h-64 relative">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]} icon={createCustomIcon()}>
            <Popup>
              <div className="text-center font-sans">
                <strong>{city}</strong>
                <br />
                {country} ({countryCode})
              </div>
            </Popup>
          </Marker>
          <MapUpdater lat={lat} lon={lon} />
        </MapContainer>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-card/50 to-transparent" />
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
    </motion.div>
  );
};
