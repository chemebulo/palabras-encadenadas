import { Routes, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Layout } from './components/Layout';
import { GamePage } from './pages/GamePage';
import { RankingPage } from './pages/RankingPage';
import './App.css';

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<GamePage />} />
					<Route path="/ranking" element={<RankingPage />} />
				</Route>
			</Routes>

			<ToastContainer
				position="bottom-right"
				autoClose={2200}
				theme="dark"
			/>
		</>
	);
}

export default App;