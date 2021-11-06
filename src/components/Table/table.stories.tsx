import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import Card from "../Card/card";
import Table, { TableProps } from "./table";
import "../../styles/common.stories";
import Button from "../Button";
import {
  DescriptionBrave,
  DescriptionEle,
  DescriptionMoon,
} from "../../utils/constants";
import TableDoc from "./table-doc.mdx";
import Message from "../Message";

const BaseTabs = () => {
  const [stripe, setStripe] = useState(false);
  const [bordered, setBordered] = useState(false);
  const cardCss = { margin: "20px 20px 0 0" };
  const columns = [
    {
      title: "书名",
      dataIndex: "name",
      key: "name",
      hStyle: { width: 150 },
      cStyle: {},
    },
    {
      title: "简介",
      dataIndex: "intro",
      key: "intro",
      hStyle: {},
      cStyle: {},
    },
    {
      title: "豆瓣评分",
      dataIndex: "score",
      key: "score",
      hStyle: { width: 140 },
      cStyle: {},
    },
    {
      title: "操作",
      dataIndex: "opt",
      key: "opt",
      hStyle: {},
      cStyle: {},
    },
  ];
  const dataSource = [
    {
      name: (
        <a
          href="https://book.douban.com/subject/20260640/"
          target="_blank"
          rel="noreferrer"
        >
          《象与骑象人》
        </a>
      ),
      intro: <div>{DescriptionEle}</div>,
      score: (
        <div style={{ textAlign: "center" }}>
          <div>
            8.1 分
            <span
              style={{
                color: "#999999",
                fontSize: 12,
              }}
            >
              {" "}
              2521人评价
            </span>
          </div>
        </div>
      ),
      opt: (
        <div style={{ display: "flex" }}>
          <Button
            btnType="primary"
            style={{ flex: 1, marginRight: 7 }}
            onClick={() => Message.info({ content: "敬请期待～" })}
          >
            添加
          </Button>
          <Button
            btnType="danger"
            style={{ flex: 1 }}
            onClick={() => Message.info({ content: "敬请期待～", duration: 10000 })}
          >
            删除
          </Button>
        </div>
      ),
    },
    {
      name: (
        <a
          href="https://book.douban.com/subject/26369699/"
          target="_blank"
          rel="noreferrer"
        >
          《被讨厌的勇气》
        </a>
      ),
      intro: <div>{DescriptionBrave}</div>,
      score: (
        <div style={{ textAlign: "center" }}>
          <div>
            8.6 分
            <span
              style={{
                color: "#999999",
                fontSize: 12,
              }}
            >
              {" "}
              71596人评价
            </span>
          </div>
        </div>
      ),
      opt: (
        <div style={{ display: "flex" }}>
          <Button btnType="primary" style={{ flex: 1, marginRight: 7 }}>
            添加
          </Button>
          <Button btnType="danger" style={{ flex: 1 }}>
            删除
          </Button>
        </div>
      ),
    },
    {
      name: (
        <a
          href="https://book.douban.com/subject/1858513/"
          target="_blank"
          rel="noreferrer"
        >
          《月亮和六便士》
        </a>
      ),
      intro: <div>{DescriptionMoon}</div>,
      score: (
        <div style={{ textAlign: "center" }}>
          <div>
            9.0 分
            <span
              style={{
                color: "#999999",
                fontSize: 12,
              }}
            >
              {" "}
              170874人评价
            </span>
          </div>
        </div>
      ),
      opt: (
        <div style={{ display: "flex" }}>
          <Button btnType="primary" style={{ flex: 1, marginRight: 7 }}>
            添加
          </Button>
          <Button btnType="danger" style={{ flex: 1 }}>
            删除
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="container">
      <div className="item">
        <Card title="基础使用" style={cardCss} shadow>
          <div style={{ marginTop: 20, marginBottom: 20 }}>
            表格的基础使用，支持<code> 表格边框 </code>，<code>隔行条纹</code>
            ，以及<code> 自定义列宽</code>
          </div>
          <Table
            columns={columns}
            dataSource={dataSource}
            showHeader
            bordered={bordered}
            stripe={stripe}
          />
          <Button onClick={() => setStripe(!stripe)} style={{ marginTop: 20 }}>
            {stripe ? "取消隔行条纹" : "展示隔行条纹"}
          </Button>
          <Button
            onClick={() => setBordered(!bordered)}
            style={{ marginTop: 20, marginLeft: 20 }}
            btnType="primary"
          >
            {bordered ? "取消表格边框" : "展示表格边框"}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default {
  component: Table,
  title: "Table 表格",
  parameters: {
    docs: {
      page: TableDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      include: [],
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story<TableProps> = () => <BaseTabs />;

export const Primary = _default.bind({});
