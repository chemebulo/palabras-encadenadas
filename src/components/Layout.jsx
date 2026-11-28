import { NavLink, Outlet } from 'react-router';

export function Layout() {
	return (
		<div className="app-layout">
			<header className="app-header">
				<h1>Palabras Encadenadas</h1>
				<nav className="app-nav">
					<NavLink to="/" end>
						Jugar
					</NavLink>
					<NavLink to="/ranking">Top 10</NavLink>
				</nav>
			</header>

			<Outlet />
		</div>
	);
}