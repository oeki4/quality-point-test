import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Employees from './pages/Employees.tsx';
import './assets/css/reset.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./layouts/Layout.tsx";
import EmployeeCard from "./pages/EmployeeCard.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<Layout/>}>
					<Route index element={<Employees/>}/>
					<Route path={'employee/:id'} element={<EmployeeCard/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
  </StrictMode>,
)
