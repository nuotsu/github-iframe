'use client'

import { store, DISPLAYS, type Theme, type Display } from '@/lib/store'
import Input from '@/ui/Input'
import { debounce } from '@/lib/utils'
import {
	VscSettings,
	VscFileCode,
	VscRepo,
	VscSymbolColor,
	VscEye,
	VscEyeClosed,
	VscPaintcan,
	VscCode,
	VscListSelection,
	VscListOrdered,
} from 'react-icons/vsc'
import { bundledThemes } from 'shiki'
import Checkbox from '@/ui/Checkbox'

export default function Options() {
	const {
		repo,
		path,
		theme,
		lang,
		display,
		lineNums,
		highlight,
		setRepo,
		setPath,
		setTheme,
		setLang,
		setDisplay,
		setLineNums,
		setHighlight,
	} = store()

	const ext = path?.split('.').at(-1) ?? ''

	return (
		<fieldset className="border border-neutral-300 p-2">
			<legend className="with-icon">
				<VscSettings /> Options
			</legend>

			<div className="grid gap-x-4 gap-y-2 md:grid-cols-2">
				<Input
					title="Repo owner/repo"
					icon={VscRepo}
					defaultValue={repo}
					onChange={debounce((e) => setRepo(e.target.value))}
					pattern=".+/.+"
					required
				/>

				<Input
					title="Path to file"
					icon={VscFileCode}
					defaultValue={path}
					onChange={debounce((e) => setPath(e.target.value))}
					className="group-[:has(.view-file-source:hover)_input]/root:border-black/30"
					required
				/>

				<Input icon={VscSymbolColor}>
					<select
						title="Theme"
						className="input w-full"
						defaultValue={theme}
						onChange={(e) => setTheme(e.target.value as Theme)}
					>
						<option disabled>Select a theme</option>
						{Object.entries(bundledThemes).map(([option]) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</Input>

				<Input
					label="Language"
					icon={VscCode}
					defaultValue={lang}
					onChange={(e) => setLang(e.target.value)}
					placeholder={ext}
				/>

				<Checkbox
					label={`${lineNums ? 'Hide' : 'Show'} line numbers`}
					onIcon={VscListOrdered}
					offIcon={VscListSelection}
					defaultChecked={lineNums}
					reverseChecked
					onChange={(e) => setLineNums(e.target.checked)}
				/>

				<Input
					label="Highlight"
					title="Lines to highlight"
					icon={VscPaintcan}
					defaultValue={highlight}
					onChange={(e) => setHighlight(e.target.value)}
					pattern="((\d+|\d+-\d+),)*(\d+|\d+-\d+)"
					placeholder="lines (e.g. 5,14-19)"
				/>

				<Input
					label="Display"
					icon={display === 'none' ? VscEyeClosed : VscEye}
				>
					<select
						className="input w-full"
						defaultValue={display}
						onChange={(e) => setDisplay(e.target.value as Display)}
					>
						{DISPLAYS.map((option) => (
							<option key={option}>{option}</option>
						))}
					</select>
				</Input>
			</div>
		</fieldset>
	)
}
