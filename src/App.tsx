import React, {useRef} from 'react';
import './App.css';
import Slide from "./slide/Slide";
import {useReactToPrint} from "react-to-print";


function App() {
	const slideRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const printElement = useReactToPrint({
		content: () => slideRef.current
	})

	const onPrint = () => {
		buttonRef.current!.style.display = "none";
		printElement()
		buttonRef.current!.style.display = "block";
	}

	return (
		<div className={"app"}>
			<div className={"slide-container"} ref={slideRef}>
				<Slide/>
				<button ref={buttonRef} id={"print-button"} onClick={onPrint}>Print slide</button>
			</div>
		</div>

	)
}

export default App;
