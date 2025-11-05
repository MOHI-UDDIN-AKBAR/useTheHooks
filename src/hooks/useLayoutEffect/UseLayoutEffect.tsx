import { useLayoutEffect, useRef, useState } from 'react';

const UseLayoutEffectHook = () => {
	const [isVisible, setVisible] = useState(false);
	const pRef = useRef<HTMLParagraphElement>(null);

	useLayoutEffect(() => {
		if (!isVisible || !pRef.current) return;
		pRef.current.style.marginTop = `${50}px`;
		pRef.current.style.border = '2px solid red';
	}, [isVisible]);

	return (
		<>
			<button type="button" onClick={() => setVisible((prev) => !prev)}>
				Toggle Popup
			</button>
			{isVisible && (
				<p ref={pRef} style={{ transition: 'all 0.3s' }}>
					This is a popup (watch for flash/jump!)
				</p>
			)}
		</>
	);
};

export default UseLayoutEffectHook;
