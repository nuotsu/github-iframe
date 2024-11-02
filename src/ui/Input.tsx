export default function Input({
	icon: Icon,
	title,
	children,
	...props
}: { icon: React.ElementType } & React.ComponentProps<'input'>) {
	return (
		<label className="with-icon group cursor-pointer">
			<Icon />

			{children || (
				<input
					className="input grow"
					type="text"
					title={title}
					placeholder={title}
					{...props}
				/>
			)}
		</label>
	)
}
