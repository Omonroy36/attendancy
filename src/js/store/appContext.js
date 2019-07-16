import React from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	class StoreWrapper extends React.Component {
		constructor(props) {
			super(props);

			//this will be passed as the contenxt value
			this.state = getState({
				getStore: () => this.state.store,
				setStore: updatedStore =>
					this.setState({
						store: Object.assign(this.state.store, updatedStore)
					})
			});
		}

		componentDidMount() {
			// All students in cohort
			// const url =
			// 	"https://api.breatheco.de/students/cohort/downtown-ft-iii?access_token=bdba9802085fbb134d7dafbc76f0f1d53808f294";
			// fetch(url, { cache: "no-cache" }).then(response => alert());

			// All cohorts
			const url = "https://api.breatheco.de/cohorts/?access_token=d0feed2a021a9aee7036cdc56c5bd16bca1c2603";
			fetch(url, { cache: "no-cache" })
				.then(response => response.json())
				.then(data => {
					this.setState(({ store }) => {
						data.data.sort((a, b) => (new Date(a.kickoff_date) < new Date(b.kickoff_date) ? 1 : -1));
						return { store: { ...store, cohorts: data.data } };
					});
				});

			// // A WAY OF SAVING TO STORE LEAVING THE OLD DATA, CREATES A NEW KEY DATA WITH THE VALUE OF DATA
			// fetch(url)
			// 	.then(response => response.json())
			// 	.then(data => {
			// 		this.setState(state => {
			// 			return { store: { ...state.store, data } };
			// 		});
			// 	});

			// // ANOTHER WAY OF SAVING TO STORE LEAVING THE OLD DATA, CREATES A NEW KEY CALLED COHORTS
			// fetch(url)
			// 	.then(response => response.json())
			// 	.then(data => {
			// 		const store = this.state.store;
			// 		this.setState({ store: { ...store, cohorts: data } });
			// 	});

			// Single student activity
			// const url =
			// 	"https://assets.breatheco.de/apis/activity/user/hernanjkd@gmail.com?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6NTUzLCJpYXQiOjE1NjI3OTg1NjYsImV4cCI6MzMxMTk3NTA1NjZ9.tgDRDOrDCNysOYmgMNI3p5caoeAU-e--jhGB3XieVWQ";
			// fetch(url)
			// 	.then(response => response.json())
			// 	.then(data => {
			// 		data.log.map(e => {
			// 			// Creates the "day" key for the incoming data
			// 			e.day = e.data ? JSON.parse(e.data).day : null;
			// 			// Sets the "created date" in Date format
			// 			e.created_at.date = new Date(e.created_at.date);
			// 		});
			// 		// Sort data by "created date"
			// 		data.log.sort((a, b) => (a.created_at.date > b.created_at.date ? 1 : -1));
			// 		this.setState({ store: data });
			// 	});
		}

		render() {
			return (
				<Context.Provider value={this.state}>
					<PassedComponent {...this.props} />
				</Context.Provider>
			);
		}
	}
	return StoreWrapper;
};

export default injectContext;
