import { useRef } from 'react';
import { useCopyToClipboard } from '../custom-hooks/useCopyToClipboard';

const CopyToClipboard: React.FC = () => {
	const elementRef = useRef<HTMLParagraphElement>(null);
	const { copyToClipboard, isCopied } =
		useCopyToClipboard<HTMLParagraphElement | null>();

	return (
		<div style={{ display: 'grid', placeItems: 'center' }}>
			<p ref={elementRef}>This is a secret key</p>
			<button
				type="button"
				className="btn"
				onClick={() => copyToClipboard(elementRef)}
			>
				{isCopied ? 'Copied' : 'Copy'}
			</button>
			<div style={{ display: 'grid' }}>
				<label htmlFor="comment">Comment</label>
				<textarea name="comment" id="comment"></textarea>
			</div>
		</div>
	);
};

export default CopyToClipboard;
