import React, {useState} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Input from './components/Input/input';
import Button from './components/Button/button';

library.add(fas)
const App: React.FC = () => {
    const [value, setValue] = useState('')
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ margin: 20, display: "block", flexDirection: "column" }}>
                    <Input prepend="http://" append=".com" placeholder="Basic Usage" />
                </div>
                <Button onClick={(e)=>setValue('nice')}>sss</Button>
                <div style={{ margin: 20, display: "block", flexDirection: "column" }}>
                    <Input
                        placeholder="Basic Usage"
                        value={value}
                        defaultValue={value}
                        onChange={(e)=>setValue(e.target.value)}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
