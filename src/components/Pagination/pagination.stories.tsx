import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import Card from "../Card/card";
import { Pagination, PaginationProps } from "./pagination";
import PaginationDoc from "./pagination-doc.mdx";

const BaseProgress = () => {
  const [pageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize1] = useState(10);
  const [pageNo1, setPageNo1] = useState(1);
  const [pageSize2] = useState(7);
  const [pageNo2, setPageNo2] = useState(1);
  const cardCss = { margin: "20px 20px 0 0", minWidth: 1000 };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Card title="基础使用" style={cardCss} shadow>
        <div>pageSize：{pageSize}</div>
        <div>pageNo：{pageNo}</div>
        <Pagination
          style={{ marginTop: 20 }}
          pageNo={pageNo}
          pageSize={pageSize}
          size={100}
          onPageChange={(value: number) => setPageNo(value)}
        />
      </Card>
      <Card title="更多页面" style={cardCss} shadow>
        <div>
          可以显示的设置每页条数选择器{"  "}
          <code>showChange: true</code>
        </div>
        <div>
          <code>pageSizeOptions 默认：10，20，50，100</code>
        </div>
        <div>
          [一共 <code>100</code> 条数据]
        </div>

        <Pagination
          style={{ marginTop: 20 }}
          pageNo={pageNo1}
          pageSize={pageSize1}
          showChange
          size={100}
          onPageChange={(value: number) => setPageNo1(value)}
        />
      </Card>
      <Card title="配置每页条数" style={cardCss} shadow>
        <div>指定每页可以显示多少条</div>
        <code>pageSizeOptions: ["5", "10", "15", "20"]</code>
        <div>
          [一共 <code>100</code> 条数据]
        </div>
        <Pagination
          style={{ marginTop: 20 }}
          pageNo={pageNo2}
          pageSize={pageSize2}
          size={100}
          showChange
          pageSizeOptions={["5", "10", "15", "20"]}
          onPageChange={(value: number) => setPageNo2(value)}
        />
      </Card>
    </div>
  );
};

export default {
  component: Pagination,
  title: "Pagination 分页器",
  parameters: {
    docs: {
      page: PaginationDoc,
      source: {
        type: "code",
      },
    },
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta;

const _default: Story<PaginationProps> = () => <BaseProgress />;

// primary
export const Primary = _default.bind({});
