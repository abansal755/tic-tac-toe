import { CssBaseline } from "@mui/material";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Local from "./pages/Local";
import Online from "./pages/Online";

const App = () => {
	return (
		<Fragment>
			<CssBaseline/>
			<Switch>
				<Route path='/' exact>
					<Home/>
				</Route>
				<Route path='/online'>
					<Online/>
				</Route>
				<Route path='/local'>
					<Local/>
				</Route>
			</Switch>
		</Fragment>
	)
}

export default App;