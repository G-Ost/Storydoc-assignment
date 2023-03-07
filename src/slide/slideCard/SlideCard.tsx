import React, {useState} from "react";

import "./slideCard.css"
import {DragDropContext, Draggable, Droppable, DropResult} from "react-beautiful-dnd";
import IconSelector from "./iconSelector/IconSelector";
import {swapArrayElements} from "../slideUtils/slideUtils";

export enum SlideCardItemType {
	TITLE = "TITLE",
	SUBTITLE = "SUBTITLE",
	ICON = "ICON"
}

export type SlideCardDataItem = {
	type: SlideCardItemType,
	value: string
}

interface SlideCardProps {
	initialCardData: SlideCardDataItem[],
}

const SlideCard: React.FC<SlideCardProps> = ({initialCardData}) => {


	const [cardData, setCardData] = useState<SlideCardDataItem[]>(initialCardData)
	const [isIconSelectorVisible, setIsIconSelectorVisible] = useState<boolean>(false)
	const [isMouseOverIcon, setIsMouseOverIcon] = useState<boolean>(false)

	const getCardDataValueByType = (type: SlideCardItemType): string => {
		return cardData.find(item => item.type === type)?.value ?? ""
	}

	const toggleIconSelectorVisibility = () => {
		setIsIconSelectorVisible(!isIconSelectorVisible)
	}

	const onIconMouseEnter = () => {
		setIsMouseOverIcon(true)
	}

	const onIconMouseLeave = () => {
		setIsMouseOverIcon(false)
	}

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: SlideCardItemType) => {
		if (type === SlideCardItemType.TITLE && e.target.value.length > 14) {
			return;
		}
		if (type === SlideCardItemType.SUBTITLE && e.target.value.length > 25) {
			return;
		}
		const tempCardData = [...cardData];
		const itemIndex = tempCardData.findIndex(item => item.type === type)
		tempCardData[itemIndex] = {type: type, value: e.target.value};
		setCardData(tempCardData)
	}

	const onIconChange = (icon: string) => {
		const tempCardData = [...cardData];
		const itemIndex = tempCardData.findIndex(item => item.type === SlideCardItemType.ICON)
		tempCardData[itemIndex] = {type: SlideCardItemType.ICON, value: icon};
		setCardData(tempCardData)
		toggleIconSelectorVisibility();
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) {
			return;
		}
		const sourceIndex = result.source.index;
		const destinationIndex = result.destination.index;
		const newCardData = swapArrayElements([...cardData], sourceIndex, destinationIndex)
		setCardData(newCardData);
	};


	const cardSections: { [key in SlideCardItemType]: JSX.Element } = {
		[SlideCardItemType.TITLE]:
			<input onChange={(event) => {onInputChange(event, SlideCardItemType.TITLE)}}
				   className={"card-title-input"}
				   value={getCardDataValueByType(SlideCardItemType.TITLE)}
			/>,
		[SlideCardItemType.SUBTITLE]:
			<input onChange={(event) => {onInputChange(event, SlideCardItemType.SUBTITLE)}}
				   className={"card-subtitle-input"}
				   value={getCardDataValueByType(SlideCardItemType.SUBTITLE)}/>,
		[SlideCardItemType.ICON]:
			<div onMouseEnter={onIconMouseEnter} onMouseLeave={onIconMouseLeave}
				 onClick={toggleIconSelectorVisibility}
				 className="material-icons card-icon">
				{isMouseOverIcon ? "cached" : getCardDataValueByType(SlideCardItemType.ICON)}
			</div>
	}

	return (
		<div className={"slice-card-container"}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="slide-card">
					{(droppableProvided) => (
						<div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className={"slide-card"}>
							{cardData.map((data, index) => (
								<Draggable key={data.type} draggableId={data.value} index={index}>
									{(draggableProvided) => (
										<div
											className={"content-container"}
											ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
											{cardSections[data.type]}
										</div>
									)}
								</Draggable>
							))}
						</div>
					)}
				</Droppable>
			</DragDropContext>
			{isIconSelectorVisible && <IconSelector onClick={onIconChange}/>}
		</div>

	)
}

export default SlideCard;