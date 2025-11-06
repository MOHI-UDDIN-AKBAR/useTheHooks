import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './UseImperativeHandleHook.css';

type ModalProps = {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ModalRef =
	| {
			focusClose: () => void;
			focusConfirm: () => void;
			focusDeny: () => void;
	  }
	| undefined;

const Modal = forwardRef<ModalRef, ModalProps>(({ setShowModal }, ref) => {
	const confirmRef = useRef<HTMLButtonElement>(null);
	const cancelRef = useRef<HTMLButtonElement>(null);
	const denyRef = useRef<HTMLButtonElement>(null);

	useImperativeHandle(ref, () => {
		return {
			focusClose: () => {
				if (!cancelRef.current) return;
				cancelRef.current.classList.add('cancel-border-color');
			},
			focusConfirm: () => {
				if (!confirmRef.current) return;
				confirmRef.current.classList.add('confirm-border-color');
			},
			focusDeny: () => {
				if (!denyRef.current) return;
				denyRef.current.classList.add('deny-border-color');
			},
		};
	}, []);

	return (
		<div className="modal-body">
			<h1 className="modal__title">Title</h1>
			<p className="modal__content">Do you confirm</p>
			<div className="modal__controls">
				<button type="button" className="btn" ref={confirmRef}>
					Yes
				</button>
				<button type="button" className="btn" ref={denyRef}>
					No
				</button>
			</div>
			<button
				ref={cancelRef}
				type="button"
				className="btn cancel"
				onClick={() => setShowModal(false)}
			>
				X
			</button>
		</div>
	);
});

const UseImperativeHandleHook: React.FC = () => {
	const [isModalVisible, setShowModal] = useState(false);
	const modalRef = useRef<ModalRef>(null);

	const handleFocusClose = () => {
		if (!modalRef.current) return;
		modalRef.current.focusClose();
	};
	const handleFocusConfirm = () => {
		if (!modalRef.current) return;
		modalRef.current.focusConfirm();
	};
	const handleFocusDeny = () => {
		if (!modalRef.current) return;
		modalRef.current.focusDeny();
	};
	return (
		<section className="modal">
			<div className="modal__focus-controls">
				<button
					type="button"
					className="btn"
					onClick={() => setShowModal(true)}
				>
					Open
				</button>
				<button type="button" className="btn" onClick={handleFocusClose}>
					Focus Cancel
				</button>
				<button type="button" className="btn" onClick={handleFocusConfirm}>
					Focus Confirm
				</button>
				<button type="button" className="btn" onClick={handleFocusDeny}>
					Focus Deny
				</button>
			</div>

			{isModalVisible ? (
				<Modal setShowModal={setShowModal} ref={modalRef} />
			) : null}
		</section>
	);
};

export default UseImperativeHandleHook;
