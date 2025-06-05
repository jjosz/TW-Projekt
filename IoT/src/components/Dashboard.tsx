import { useState } from 'react';
import DeviceCard from './DeviceCard.tsx';
import Charts from './Charts.tsx';
import '../App.css';

export const mockData = [
  { deviceId: 1, temperature: 23.5, pressure: 1013.25, humidity: 45, readingDate: '2024-06-01 12:00' },
  { deviceId: 1, temperature: 23.9, pressure: 1013.1, humidity: 44, readingDate: '2024-06-01 13:00' },
  { deviceId: 2, temperature: 23.7, pressure: 1012.8, humidity: 44, readingDate: '2024-06-01 12:00' },
  { deviceId: 2, temperature: 24.1, pressure: 1012.5, humidity: 43, readingDate: '2024-06-01 13:00' },
  { deviceId: 3, temperature: 23.4, pressure: 1013.1, humidity: 46, readingDate: '2024-06-01 12:00' },
  { deviceId: 3, temperature: 23.6, pressure: 1012.9, humidity: 47, readingDate: '2024-06-01 13:00' },
  { deviceId: 4, temperature: 24.5, pressure: 990.4, humidity: 40.3, readingDate: '2024-06-01 12:00' },
  { deviceId: 4, temperature: 24.7, pressure: 991.0, humidity: 41, readingDate: '2024-06-01 13:00' }
];


function Dashboard() {
  const uniqueDeviceIds = Array.from(new Set(mockData.map(d => d.deviceId))).sort();
  const [activeDeviceId, setActiveDeviceId] = useState<number>(uniqueDeviceIds[0]);

  const deviceEntries = mockData.filter(d => d.deviceId === activeDeviceId);
  const activeDeviceData = deviceEntries[deviceEntries.length - 1];

  return (
        <div className="dashboard px-6 py-4 bg-neutral-900 min-h-screen text-white">
          {/* Górna sekcja: Tytuł + wykres */}
          <div className="mb-6">
            {activeDeviceData && (
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">
                  Device No. {activeDeviceData.deviceId}
                </h2>
                <div className="w-full h-[300px] bg-neutral-800 rounded-lg p-4">
                  <Charts selectedId={activeDeviceId} data={mockData} />
                </div>
              </div>
            )}
          </div>

          {/* Siatka urządzeń */}
          <div className="flex flex-wrap gap-4 justify-start">
            {Array.from({ length: 5 }).map((_, i) => {
              const deviceId = i;
              const all = mockData.filter((d) => d.deviceId === deviceId);
              const last = all[all.length - 1];

              return (
                <div key={deviceId} className="w-full sm:w-[calc(20%-0.5rem)] min-w-[150px]">
                  <DeviceCard
                    data={
                      last ?? {
                        deviceId,
                        temperature: undefined,
                        pressure: undefined,
                        humidity: undefined,
                      }
                    }
                    selected={deviceId === activeDeviceId}
                    onClick={() => setActiveDeviceId(deviceId)}
                  />
                </div>
              );
            })}
          </div>
        </div>

  );
}

export default Dashboard;