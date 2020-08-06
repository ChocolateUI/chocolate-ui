import React from 'react'
import Button from './components/Button/button'

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <Button onClick={(e)=>{e.preventDefault(); alert('123')}}>Button Click</Button>
                <Button btnType="primary" size="sm" disabled> Button Small Disabled </Button>
                <Button btnType="danger" size="sm"> Button Small Danger </Button>
                <Button btnType="primary" size="lg"> Button Small Large </Button>
                <Button btnType="link" href="www.baidu.com" target="_blank"> Button Link </Button>
                <Button btnType="link" href="www.baidu.com" disabled> Button Link disabled</Button>
            </header>
        </div>
    );
}

export default App;
