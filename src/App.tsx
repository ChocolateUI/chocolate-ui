import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AutoComplete, { DataSourceType } from './components/AutoComplete/autoComplete'

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}
library.add(fas)
const App: React.FC = () => {

    // const handleFetch = (query: string) => {
    //     return lakersWithNumber.filter(player => player.value.includes(query))
    // }
    const handleFetch = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({ items }) => {
                console.log(items)
                return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
            })
    }

    const renderOption = (item: DataSourceType) => {
        const itemWithGithub = item as DataSourceType<GithubUserProps>
        return (
            <>
                <h2>Name: {itemWithGithub.value}</h2>
                <p>url: {itemWithGithub.url}</p>
            </>
        )
    }
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ margin: 20, display: "block", flexDirection: "column" }}>
                    <AutoComplete
                        fetchSuggestions={handleFetch}
                        width={400}
                        size="sm"
                        onSelect={(item) => { console.log('===>', item) }}
                        renderOption={renderOption}
                    />
                </div>
            </header>
        </div>
    );
}

export default App;
