import React, { useState, useRef, useEffect } from "react";

function App() {
	const [state, setState] = useState([]);
	const getApi = () => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then((respuesta) => {
				return respuesta.json();
			})
			.then((data) => {
				setState(data);
			})

			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		getApi();
	}, []);
	const [songsActive, setsongsActive] = useState(null);
	let nombreRef = useRef(null);
	const setSingleSong = (x, i) => {
		nombreRef.src = `https://assets.breatheco.de/apis/sound/${x}`;
		setsongsActive(i);
	};
	const fplay = () => {
		if (nombreRef !== null) nombreRef.play();
	};
	const pause = () => {
		nombreRef.pause();
	};
	const adelantar = () => {
		let position =
			songsActive !== null
				? songsActive == state.length - 1
					? 0
					: songsActive + 1
				: 0;
		setSingleSong(state[position].url, position);
	};
	const atras = () => {
		let position =
			songsActive !== null
				? songsActive == 0
					? state.length - 1
					: songsActive - 1
				: 0;
		setSingleSong(state[position].url, position);
		fplay();
	};
	return (
		<div className="container mt-3">
			<div className="row">
				<div className="col-md-8 mx-auto text-center">
					<ol className="rounded ">
						{state.length > 0 &&
							state.map((valor, j) => {
								return (
									<li
										key={valor.id}
										className={
											" bg-secondary list-group-item list-group-item " +
											(songsActive === j)
										}
										onClick={() =>
											setSingleSong(valor.url, j)
										}>
										{valor.name}
									</li>
								);
							})}
					</ol>
					<div className="row">
						<div className="col-md-8 mx-auto text-center ">
							<div className="mb-2">
								<button
									className="btn-sm  rounded-circle p-2 m-0 bg-secondary border-0 m-1"
									onClick={atras}
									id="boton">
									<i class="fas fa-arrow-circle-left"></i>
								</button>
								<button
									className="btn-sm rounded-circle p-2 m-0 bg-secondary border-0 m-1 "
									onClick={pause}>
									<i class="far fa-pause-circle"></i>
								</button>
								<button
									className="btn-sm rounded-circle p-2 m-0 bg-secondary border-0 m-1"
									onClick={fplay}>
									<i class="far fa-play-circle"></i>
								</button>
								<button
									className="btn-sm rounded-circle p-2 m-0 bg-secondary border-0 m-1"
									onClick={adelantar}>
									<i class="fas fa-arrow-circle-right"></i>
								</button>
							</div>
							<audio
								className=""
								ref={(r) => (nombreRef = r)}
								autoPlay
								controls
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
