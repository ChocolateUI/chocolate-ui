import cls from "classnames";
import React, { ReactNode, CSSProperties } from "react";

export interface ColumnsType {
  title: string;
  render?: (value: string, item: string, index: number) => ReactNode;
  key: string;
  dataIndex: string;
  cStyle?: CSSProperties;
  hStyle?: CSSProperties;
}

export interface TableProps {
  /**
   * 列
   */
  columns: Array<ColumnsType>;
  /**
   * 数据源
   */
  dataSource: any[];
  /**
   * 是否有边框
   */
  bordered?: boolean;
  /**
   * 展示标题
   */
  showHeader?: boolean;
  /**
   * 隔行条纹
   */
  stripe?: boolean;
  /**
   * 自定义类
   */
  className?: string;
}

const prefixCls = "chocolate-table";

export const Table = (props: TableProps) => {
  const {
    className,
    bordered,
    columns,
    showHeader,
    dataSource,
    stripe,
    ...attr
  } = props;
  const hasData = () => {
    return dataSource.length >= 1;
  };

  const tableBody = () => {
    return (
      <tbody className={`${prefixCls}-tbody`}>
        {dataSource.map((item, index) => {
          const { key: rowKey = `tbody-${index}` } = columns[index] || {};
          return (
            <tr
              key={rowKey}
              className={cls({
                [`${prefixCls}-stripe`]: stripe && (index + 1) % 2 === 0,
              })}
            >
              {columns.map((column) => {
                const { dataIndex, render, cStyle } = column;
                const value = item[dataIndex];
                return (
                  <td key={`td-${dataIndex}`} style={cStyle}>
                    {(render && render(value, item, index)) || value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const tableHeader = () => {
    return (
      <thead className={`${prefixCls}-thead`}>
        <tr>
          {columns.map(({ title, hStyle }, index) => {
            return (
              <th key={`thead-${index}`} style={hStyle}>
                {title}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };
  return (
    <div
      className={cls(prefixCls, className, {
        [`${prefixCls}-bordered`]: bordered,
      })}
      {...attr}
    >
      <table className={`${prefixCls}-origin-table`}>
        {showHeader && tableHeader()}
        {hasData() && tableBody()}
      </table>
    </div>
  );
};

export default Table;
