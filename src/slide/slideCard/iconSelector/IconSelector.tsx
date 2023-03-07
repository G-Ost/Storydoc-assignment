import React from "react";
import "./iconSelector.css"

interface IconSelectorProps {
	onClick: (icon: string) => void
}


const IconSelector: React.FC<IconSelectorProps> = ({onClick}) => {
	const icons: string[] = [
		"star",
		"home",
		"face",
		"favorite",
		"settings",
		"bolt",
		"public",
		"pets"
	]

	return (
		<div className={"icon-selector"}>
			{icons.map(icon => (
				<div key={icon} onClick={() => (onClick(icon))} className="material-icons selectable-icon">{icon}</div>
			))}
		</div>

	)
}

export default IconSelector;