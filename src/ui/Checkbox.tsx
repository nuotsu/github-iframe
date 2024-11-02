import { LiaToggleOnSolid, LiaToggleOffSolid } from 'react-icons/lia'

export default function Checkbox({
	label,
	...props
}: { label: string } & React.ComponentProps<'input'>) {
	return (
		<label className="with-icon cursor-pointer">
			<input className="peer" type="checkbox" hidden {...props} />

			<LiaToggleOnSolid className="peer-checked:hidden" />
			<LiaToggleOffSolid className="hidden peer-checked:block" />

			{label}
		</label>
	)
}
