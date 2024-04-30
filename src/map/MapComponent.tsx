import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

const MapComponent: React.FC = () => {
const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

const handleMapClick = (event: L.LeafletMouseEvent) => {
 setSelectedLocation([event.latlng.lat, event.latlng.lng]);
 };

 return (
 <div>
 <h2>برای انتحاب مکان مورد نظر برای روی نقشه کلیک کنید.</h2>
 <MapContainer center ={[35.6895, 51.3896]} zoom={13} style={{ height: '400px', width: '100%' }}>
 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
 <MapEvents onClick={handleMapClick} />
 {selectedLocation && (
 <Marker position={selectedLocation}>
 <Popup>
 مکان مورد نظر شما: {selectedLocation[0]}, {selectedLocation[1]}
 </Popup>
</Marker>
 )}
 </MapContainer>
</div>
 );
};

const MapEvents: React.FC<{ onClick: (event: L.LeafletMouseEvent) => void }> = ({ onClick }) => {
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const map = useMapEvents({
 click: onClick,});

 return null;
};

export default MapComponent;