import { useEffect, useState } from 'react';

type State = {
	isLoading: boolean;
	error: null | GeolocationPositionError;
	data: {
		latitude: number;
		longitude: number;
	} | null;
};

type GeoLocationOptions = {
	enableHighAccuracy?: boolean;
	maximumAge?: number;
	timeout?: number;
};

export const useGeoLocation = (options?: GeoLocationOptions) => {
	const [state, setState] = useState<State>(() => ({
		isLoading: false,
		error: null,
		data: null,
	}));

	useEffect(() => {
		setState((prev) => ({ ...prev, isLoading: true }));
		const successHandler = (e: GeolocationPosition) => {
			const { latitude, longitude } = e.coords;
			setState((prev) => ({
				...prev,
				isLoading: false,
				data: { latitude, longitude },
			}));
		};

		const errorHandler = (e: GeolocationPositionError) => {
			setState((prev) => ({ ...prev, error: e, isLoading: false }));
		};

		navigator.geolocation.getCurrentPosition(
			successHandler,
			errorHandler,
			options,
		);

		const watchId = navigator.geolocation.watchPosition(
			successHandler,
			errorHandler,
			options,
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, [options]);

	return { ...state };
};
