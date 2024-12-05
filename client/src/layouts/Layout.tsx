import Header from "../components/Header.tsx";
import {Outlet} from "react-router";
import {Layout as AntLayout, Space} from "antd";

const Layout = () => {
	return (
		<AntLayout>
			<Space direction="vertical" size={'middle'}>
				<Header/>
				<Outlet/>
			</Space>
		</AntLayout>
	);
};

export default Layout;