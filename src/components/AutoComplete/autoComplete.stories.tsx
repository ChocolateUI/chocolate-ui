import React from "react";
import { Story, Meta } from "@storybook/react";
import AutoComplete, { AutoCompleteProps } from "./autoComplete";
import { DataSourceType } from "./autoComplete";
import { lakersWithNumber } from "./dataConfig";
import AutoCompleteDoc from "./auto-complete-doc.mdx";
import Card from "../Card/card";
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const handleAsyncFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      return (
        items.length &&
        items.map((item: any) => ({ value: item.login, ...item }))
      );
    });
};

const handleFetch = (query: string) => {
  return lakersWithNumber.filter(
    (player) => player.value.includes(query) || player.zhValue.includes(query)
  );
};

const renderOption = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<GithubUserProps>;
  return (
    <>
      <span>
        <img
          alt="avatar"
          style={{ width: 50, height: 50, borderRadius: "50%" }}
          src={itemWithGithub.avatar_url}
        />
      </span>
      <span style={{ marginLeft: 20 }}>姓名: {itemWithGithub.value}</span>
    </>
  );
};

const BaseAutoComplete = () => {
  const commonCss = { width: 300, marginBottom: 20 };
  const cardCss = { margin: "20px 20px 0 0" };

  return (
    <div style={{ display: "flex", width: 1024, flexWrap: "wrap" }}>
      <Card title="不同大小" style={cardCss} shadow>
        <AutoComplete
          fetchSuggestions={handleFetch}
          style={commonCss}
          size="sm"
          placeholder="输入你最喜欢换的水果试试看"
        />
        <AutoComplete
          fetchSuggestions={handleFetch}
          style={commonCss}
          size="lg"
          placeholder="输入你最喜欢换的水果试试看"
        />
      </Card>
      <Card title="远程搜索" style={cardCss} shadow>
        <AutoComplete
          fetchSuggestions={handleAsyncFetch}
          style={commonCss}
          size="sm"
          placeholder="随便搜点什么吧"
        />
        <AutoComplete
          fetchSuggestions={handleAsyncFetch}
          style={commonCss}
          size="lg"
          placeholder="随便搜点什么吧"
        />
      </Card>
      <Card title="不可用" style={cardCss} shadow>
        <AutoComplete
          fetchSuggestions={handleAsyncFetch}
          style={commonCss}
          disabled
          size="sm"
          placeholder="随便搜点什么吧"
        />
        <AutoComplete
          fetchSuggestions={handleAsyncFetch}
          style={commonCss}
          disabled
          size="lg"
          placeholder="随便搜点什么吧"
        />
      </Card>
      <Card title="自定义下拉选项" style={cardCss} shadow>
      <AutoComplete
          fetchSuggestions={handleAsyncFetch}
          style={commonCss}
          size="sm"
          renderOption={renderOption}
          placeholder="随便搜点什么吧"
        />
        <AutoComplete
          fetchSuggestions={handleAsyncFetch}
          style={commonCss}
          size="lg"
          renderOption={renderOption}
          placeholder="随便搜点什么吧"
        />
      </Card>
    </div>
  );
};

export default {
  component: AutoComplete,
  title: "AutoComplete 自动完成",
  parameters: {
    controls: {
      include: ["disabled", "size", "placeholder", "width"],
    },
    docs: {
      page: AutoCompleteDoc,
    },
  },
  argTypes: {
    width: {
      control: {
        type: "range",
        min: 100,
        max: 400,
        step: 1,
      },
    },
  },
} as Meta;

// _default
const _default: Story<AutoCompleteProps> = (args) => (
  <BaseAutoComplete {...args} />
);

export const Primary = _default.bind({});

Primary.args = {
  fetchSuggestions: handleFetch,
  width: 300,
  size: "sm",
  disabled: false,
  placeholder: "输入你最喜欢换的水果试试看",
};
