import { type ChangeEvent, useId, useState } from 'react';

type InputFieldProps = {
	label: string;
	type: string;
	idSuffix: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
	label,
	idSuffix,
	type,
	value,
	onChange,
}: InputFieldProps) => {
	const id = useId();
	const inputId = `${id}-${idSuffix}`;

	return (
		<div className="input-group">
			<label htmlFor={inputId} className="input-label">
				{label} :
				<input
					type="text"
					name={type}
					id={inputId}
					value={value}
					onChange={onChange}
					className="input-field"
				/>
			</label>
		</div>
	);
};

const Form = () => {
	const [formData, setFormData] = useState(() => ({ name: '', email: '' }));

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		const field = id.includes('name') ? 'name' : 'email';
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<InputField
				label="Name"
				type="text"
				idSuffix="name"
				value={formData.name}
				onChange={handleChange}
			/>
			<InputField
				label="Email"
				type="email"
				idSuffix="email"
				value={formData.email}
				onChange={handleChange}
			/>
		</>
	);
};

const UseIdHook: React.FC = () => {
	return (
		<div className="form-container">
			<Form />
			<article className="form-article">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
				quam nostrum quidem consequuntur possimus nihil ipsam pariatur impedit
				explicabo esse modi maiores aspernatur itaque dolor quia nulla et minus
				amet animi laborum deserunt, quae vitae? Quia nobis placeat pariatur
				blanditiis aspernatur? Sunt explicabo consequatur id quam aliquam ullam
				tenetur accusamus.
			</article>
			<Form />
		</div>
	);
};

export default UseIdHook;
