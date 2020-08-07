import React from 'react'
import Alert from './components/Alert/alert'

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ display: "block", flexDirection: "column" }}>
                    <Alert message="Tips" description="Detailed description and advice about successful copywriting." />
                    <Alert message="Tips" type="success" description="Detailed description and advice about successful copywriting." />
                    <Alert message="Tips" type="danger" description="Detailed description and advice about successful copywriting." />
                    <Alert message="Tips" type="warning" description="Detailed description and advice about successful copywriting." />
                    <Alert message="Message 必填" closable type="warning" onClose={(e)=>{e.preventDefault(); console.log('object')} }/>
                    <Alert message="Message 必填" closable type="warning"/>
                </div>
            </header>
        </div>
    );
}

export default App;
