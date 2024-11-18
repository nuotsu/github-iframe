import { LiaToggleOnSolid, LiaToggleOffSolid } from 'react-icons/lia'
import clsx from 'clsx'

export default function Checkbox({
	label,
	reverseChecked,
	...props
}: {
	label: string
	reverseChecked?: boolean
} & React.ComponentProps<'input'>) {
	return (
		<label className="with-icon cursor-pointer">
			<input className="peer" type="checkbox" hidden {...props} />

			<LiaToggleOnSolid
				className={clsx(
					reverseChecked ? 'peer-checked:hidden' : 'hidden peer-checked:block',
				)}
			/>
			<LiaToggleOffSolid
				className={clsx(
					reverseChecked ? 'hidden peer-checked:block' : 'peer-checked:hidden',
				)}
			/>

			{label}
		</label>
	)
}
