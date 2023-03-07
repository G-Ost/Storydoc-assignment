import React from "react";

import "./slide.css"
import SlideCard, {SlideCardDataItem, SlideCardItemType} from "./slideCard/SlideCard";

interface SlideProps {
}


const Slide: React.FC<SlideProps> = ({}) => {
	const cardsInitialData: SlideCardDataItem[][] = [
		[
			{type: SlideCardItemType.ICON, value: "face"},
			{type: SlideCardItemType.TITLE, value: "Insert text here"},
			{type: SlideCardItemType.SUBTITLE, value: "And here your additional text"}

		],
		[
			{type: SlideCardItemType.ICON, value: "home"},
			{type: SlideCardItemType.TITLE, value: "Insert text here"},
			{type: SlideCardItemType.SUBTITLE, value: "And here your additional text"}
		],

		[
			{type: SlideCardItemType.ICON, value: "star"},
			{type: SlideCardItemType.TITLE, value: "Insert text here"},
			{type: SlideCardItemType.SUBTITLE, value: "And here your additional text"}

		]
	]

	return (
		<div  className={"slide"}>
			{cardsInitialData.map((slideData, cardIndex) => (
				<SlideCard key={cardIndex} initialCardData={slideData}/>
			))}
		</div>

	)
}

export default Slide;