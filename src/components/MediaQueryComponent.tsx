import { useMediaQuery } from '../custom-hooks/useMediaQuery';

const MediaQueryComponent: React.FC = () => {
	const { isMatch } = useMediaQuery('(min-width:700px)');
	return (
		<div>
			<p> Is screen Large : {isMatch.toString()}</p>
		</div>
	);
};

export default MediaQueryComponent;
