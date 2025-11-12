import { useGeoLocation } from '../custom-hooks/useGeoLocation';

const GeoLocationComponent: React.FC = () => {
	const { isLoading, data, error } = useGeoLocation({
		maximumAge: 36000,
		timeout: 5000,
		enableHighAccuracy: false,
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div> {error.toString()}</div>;

	return <div> {data ? JSON.stringify(data, null, 10) : ''}</div>;
};

export default GeoLocationComponent;
