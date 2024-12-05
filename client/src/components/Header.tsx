import {Menu,} from "antd";
import {Header as AntHeader} from "antd/lib/layout/layout";
import {NavLink, useLocation} from "react-router";

const Header = () => {

	const links = [
		{
			name: 'Главная',
			url: '/'
		},
	];

	const location =  useLocation();

	const menuItems = links.map((_, index) => ({
		key: index,
		label: (
			<NavLink to={_.url}>{_.name}</NavLink>
		),
	}));

	return (
		<AntHeader style={{ display: 'flex', alignItems: 'center' }}>
			<Menu
				theme='dark'
				mode='horizontal'
				items={menuItems}
				selectedKeys={[links.findIndex((el) => el.url === location.pathname).toString()]}
				style={{ flex: 1, minWidth: 0 }}
			/>
		</AntHeader>
	);
};

export default Header;