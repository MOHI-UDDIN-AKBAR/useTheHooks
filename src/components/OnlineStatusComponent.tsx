import { useOnlineStatus } from '../custom-hooks/useOnlineStatus';

const OnlineStatusComponent: React.FC = () => {
	const { onlineStatus } = useOnlineStatus();
	return <div>is Online : {onlineStatus.toString()}</div>;
};

export default OnlineStatusComponent;
