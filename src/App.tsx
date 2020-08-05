import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Button onClick={(e)=>{e.preventDefault(); alert('123')}}>Button Click</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Small} disabled> Button Small Disabled </Button>
                <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Button Small Danger </Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Button Small Large </Button>
                <Button btnType={ButtonType.Link} href="www.baidu.com" target="_blank"> Button Link </Button>
                <Button btnType={ButtonType.Link} href="www.baidu.com" disabled> Button Link disabled</Button>
            </header>
        </div>
    );
}

export default App;
