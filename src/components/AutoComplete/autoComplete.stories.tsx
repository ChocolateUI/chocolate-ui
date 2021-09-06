import React from 'react'
import { Story, Meta } from '@storybook/react'
import AutoComplete, { AutoCompleteProps } from './autoComplete'
import { DataSourceType } from './autoComplete'
import { lakersWithNumber } from './dataConfig'
import AutoCompleteDoc from './auto-complete-doc.mdx'
interface GithubUserProps {
    login: string;
    url: string;
    avatar_url: string;
}

const handleAsyncFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res => res.json())
        .then(({ items }) => {
            return items.length && items.map((item: any) => ({ value: item.login, ...item }))
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

const BaseAutoComplete = (props: AutoCompleteProps) => {
  const { fetchSuggestions, renderOption, placeholder, size, width, disabled } = props;
  return (
    <AutoComplete
      fetchSuggestions={fetchSuggestions}
      width={width}
      size={size}
      disabled={disabled}
      renderOption={renderOption}
      placeholder={placeholder}
    />
  )
}

export default {
  component: AutoComplete,
  title: 'AutoComplete',
  parameters: {
    controls: {
      include: ['disabled', 'size', 'placeholder', 'width']
    },
    docs: {
      page: AutoCompleteDoc
    }
  },
  argTypes: {
    width: {
      control: { 
        type: 'range', min: 100, max: 400, step: 1,
      }
    },
  }
} as Meta;

// _default
const _default: Story<AutoCompleteProps> = (args) => <BaseAutoComplete {...args} />;

export const ConfigSearch = _default.bind({});

ConfigSearch.args = {
  fetchSuggestions: handleFetch,
  width: 300,
  size: 'sm',
  disabled: false,
  placeholder: '输入你最喜欢换的水果试试看'
}

export const RemoteSearch= _default.bind({});

RemoteSearch.args = {
  ...ConfigSearch.args,
  fetchSuggestions: handleAsyncFetch,
  placeholder: '随便搜点什么吧'
}

export const DiyOptions = _default.bind({});

DiyOptions.args = {
  ...ConfigSearch.args,
  fetchSuggestions: handleAsyncFetch,
  placeholder: '随便搜点什么吧',
  renderOption: renderOption,
}