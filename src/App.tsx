import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu';

library.add(fas)
const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ margin: 20, display: "block", flexDirection: "column" }}>
                    <Menu defaultIndex="0" mode='vertical' onSelect={(index) => console.log('hello index', index)} defaultOpenSubMenus={['2']}>
                        <MenuItem >
                            coolLink 1
                        </MenuItem>
                        <MenuItem disabled>
                            coolLink 2
                        </MenuItem>
                        <SubMenu title='dropdown'>
                            <MenuItem>
                                dropdown 1
                            </MenuItem>
                            <MenuItem>
                                dropdown 2
                            </MenuItem>
                            <MenuItem>
                                dropdown 3
                            </MenuItem>
                        </SubMenu>
                        <MenuItem>
                            coolLink 3
                        </MenuItem>
                    </Menu>
                </div>
            </header>
        </div>
    );
}

export default App;
