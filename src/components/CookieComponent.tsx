import { useCookie } from '../custom-hooks/useCookie';

const CookieComponent: React.FC = () => {
	const { value, setValue, deleteCookie } = useCookie('name', 'Samir', {
		maxAge: 10000,
		path: '/',
	});
	return (
		<div>
			<p>Name : {value}</p>
			<div className="cookie-controls">
				<button type="button" onClick={() => setValue('Rifat')} className="btn">
					Change name to sally
				</button>
				<button type="button" className="btn" onClick={() => deleteCookie()}>
					Delete Name
				</button>
			</div>
		</div>
	);
};

export default CookieComponent;
