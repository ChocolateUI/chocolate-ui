import React, { CSSProperties, useEffect, useState } from "react";
import { MouseEvent } from "react";
import classNames from "classnames";
import Select from "../Select";
import Option from "../Select/selectOption";

export interface PaginationProps {
  /**
   * 当前页数
   */
  pageNo: number;
  /**
   * 每页条数
   */
  pageSize: number;
  /**
   * 总数
   */
  size: number;
  /**
   * 上一页/下一页回调
   */
  onPageChange?: (value: number) => void;
  /**
   * 自定义样式
   */
  style?: CSSProperties;
  /**
   * 指定每页可以显示多少条
   */
  pageSizeOptions?: string[];
  /**
   * 是否展示页数选择器
   */
  showChange?: boolean;
}
const prefixCls = "chocolate-pagination";

export function Pagination(props: PaginationProps) {
  const {
    pageNo: _pageNo,
    pageSize,
    size,
    onPageChange,
    style,
    pageSizeOptions = ["10", "20", "50", "100"],
    showChange,
  } = props;
  const [pageTotal, setPageTotal] = useState(pageSize);
  const [_pageSizeOptions, setPageSizeOptions] = useState(pageSizeOptions);
  const [pageNo, setPageNo] = useState(_pageNo);
  const [maxPageNo, setMaxPageNo] = useState(1);
  const handlePageClick = (e: MouseEvent<HTMLSpanElement>) => {
    // @ts-ignore
    const nextPage = +e.target.dataset.page;
    onPageChange && onPageChange(nextPage);
  };

  useEffect(() => {
    let _options = [..._pageSizeOptions];
    if (!_pageSizeOptions.includes(pageSize.toString())) {
      _options.unshift(pageSize.toString());
      setPageSizeOptions(_options.sort((x, y) => parseInt(x) - parseInt(y)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMaxPageNo(Math.ceil(size / pageTotal) || 1);
  }, [pageTotal, size]);

  useEffect(() => {
    setPageNo(_pageNo);
  }, [_pageNo]);

  // 至多显示十个页码
  const genPageNo = () => {
    const start = pageNo - 5 > 0 ? pageNo - 5 : 0;
    const res = [];
    // 如果 start 为 0，所以页码在前 5 项中，开头呈现为 1 2 3 4 5
    if (start === 0) {
      // start 为 0 时
      // 如果最大页码超过 10，则需要出现省略号，呈现为 1 2 3 4 5 6 7 8 ··· n
      if (maxPageNo > 10) {
        for (let i = start; i < 8; i++) {
          res.push(i + 1);
        }
        res.push("···");
        res.push(maxPageNo);
      } else {
        for (let i = start; i < maxPageNo; i++) {
          res.push(i + 1);
        }
      }
      // 如果 start 不为 0，则前几项可能出现省略号，如 1 ··· 15 16 17 18
    } else {
      // start 不为 0 时
      // 如果最大页码不超过 10，则按顺序显示，无省略号
      // 即 1 2 3 4 5 6 7 8 9 10
      if (maxPageNo <= 10) {
        for (let i = 1; i <= maxPageNo; i++) {
          res.push(i);
        }
        // 如果最大页码超过了 10，同时 start 又不为 0，则前面一定会有省略号，
        // 即 1 ··· n-3 n-2 n-1 n ...
      } else {
        res.push(1);
        res.push("···");
        for (let i = pageNo - 3; i <= pageNo; i++) {
          res.push(i);
        }
        // 还剩下 4 个槽，此时判断最后几位页码，
        // 如果最大页码和当前页码直接的差超过了 4，则四个槽中只能是：
        // n+1 n+2 ··· max
        if (maxPageNo - pageNo > 4) {
          res.push(pageNo + 1);
          res.push(pageNo + 2);
          res.push("···");
          res.push(maxPageNo);
          // 如果位置够 4 位（由于 10 个项目的限制，其实必定是刚好 4 位），则全部显示
        } else {
          for (let i = pageNo + 1; i <= maxPageNo; i++) {
            res.push(i);
          }
        }
      }
    }

    return res;
  };

  const handleChange = (value: number) => {
    // @ts-ignore
    const _pageSize = value.replace(/[^\d]/g, " ");
    setPageTotal(+_pageSize);
    const _maxPageNo = Math.ceil(size / _pageSize) || 1;
    if (_maxPageNo <= pageNo) {
      setPageNo(_maxPageNo);
    }
  };

  function handlePrev() {
    const nextPage = pageNo - 1;
    if (nextPage === 0) return;
    onPageChange && onPageChange(nextPage);
  }

  function handleNext() {
    const nextPage = pageNo + 1;
    if (nextPage > maxPageNo) return;
    onPageChange && onPageChange(nextPage);
  }

  return (
    <section className={classNames(`${prefixCls}`)} style={style}>
      <span
        className={classNames(`${prefixCls}-turnOver`, {
          [`${prefixCls}-disabled`]: pageNo === 1,
        })}
        onClick={handlePrev}
      >
        上一页
      </span>
      {genPageNo().map((item, index) => {
        return (
          <span
            key={`${item}${index}`}
            data-page={item}
            style={item === "···" ? { pointerEvents: "none" } : {}}
            className={classNames(`${prefixCls}-pageNo`, {
              [`${prefixCls}-on`]: item === pageNo,
            })}
            onClick={handlePageClick}
          >
            {item}
          </span>
        );
      })}
      <span
        className={classNames(`${prefixCls}-turnOver`, {
          [`${prefixCls}-disabled`]: pageNo === maxPageNo,
        })}
        onClick={handleNext}
      >
        下一页
      </span>
      {showChange ? (
        <div className={classNames(`${prefixCls}-options`)}>
          <Select
            style={{ width: 100 }}
            placeholder={`${pageSize} 条/页`}
            defaultValue={`${pageSize} 条/页`}
            // @ts-ignore
            onChange={(value) => handleChange(value)}
          >
            {_pageSizeOptions.map((item: string, index: number) => (
              <Option key={index} value={`${item} 条/页`}>
                {item}条/页
              </Option>
            ))}
          </Select>
        </div>
      ) : null}
    </section>
  );
}

export default Pagination;
