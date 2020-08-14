import React from 'react'
import { storiesOf } from '@storybook/react'
import AutoComplete from './autoComplete'
import { DataSourceType } from '../AutoComplete/autoComplete'
import { lakersWithNumber } from './dataConfig'

interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const handleAsyncFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({ items }) => {
            return items.length && items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
        })
}

const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query) || player.zhValue.includes(query))
}

const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
        <>
            <span><img alt="avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} src={itemWithGithub.avatar_url} /></span>
            <span style={{ marginLeft: 20}}>姓名: {itemWithGithub.value}</span>
        </>
    )
}

const defaultAutoComplete = () => (
    <AutoComplete
        fetchSuggestions={handleFetch}
        width={300}
        size="sm"
        placeholder="输入你最喜欢换的水果试试看"
    />
)

const asyncInput = () => (
    <AutoComplete
        fetchSuggestions={handleAsyncFetch}
        width={300}
        size="sm"
        placeholder="随便搜点什么吧"
    />
)

const diyInput = () => (
    <AutoComplete
        fetchSuggestions={handleAsyncFetch}
        width={300}
        size="sm"
        placeholder="随便搜点什么吧"
        renderOption={renderOption}
    />
)

storiesOf('AutoComponent 自动完成', module)
    .add('默认样式', defaultAutoComplete)
    .add('异步自动完成', asyncInput)
    .add('自定义下拉样式', diyInput)