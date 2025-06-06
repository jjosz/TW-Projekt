import Typography from '@mui/material/Typography';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';

interface DeviceData {
  temperature: number;
  pressure: number;
  humidity: number;
  deviceId: number;
}

interface Props {
  data: DeviceData;
  selected?: boolean;
  onClick?: () => void;
  small?: boolean;   // nowy props
}

const DeviceCard = ({ data, selected = false, onClick, small = false }: Props) => {
  const { deviceId, temperature, pressure, humidity } = data;

  return (
      <div
          className={`card ${selected ? 'selected' : ''}`}
          onClick={onClick}
          style={{ width: small ? 120 : 200, padding: small ? '8px' : '16px', cursor: onClick ? 'pointer' : 'default' }}
      >
        <Typography variant={small ? "subtitle2" : "h6"}>
          Device No. {deviceId}
        </Typography>
        <hr />
        {temperature === 0 && pressure === 0 && humidity === 0 ? (
            <Typography variant={small ? "caption" : "body1"}>No data</Typography>
        ) : (
            <>
              <Typography variant={small ? "subtitle2" : "h6"} component="div" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <DeviceThermostatIcon fontSize={small ? "small" : "medium"} />
                <span className="value">{temperature}</span>
                <span>°C</span>
              </Typography>
              <Typography variant={small ? "subtitle2" : "h6"} component="div" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CloudUploadIcon fontSize={small ? "small" : "medium"} />
                <span className="value">{pressure}</span> hPa
              </Typography>
              <Typography variant={small ? "subtitle2" : "h6"} component="div" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <OpacityIcon fontSize={small ? "small" : "medium"} />
                <span className="value">{humidity}</span>%
              </Typography>
            </>
        )}
        <Typography variant="caption" color="primary" sx={{ fontSize: small ? 10 : undefined }}>
          DETAILS
        </Typography>
      </div>
  );
};

export default DeviceCard;
