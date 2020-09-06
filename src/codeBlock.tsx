import React, { FC } from 'react'
import Lowlight from 'react-lowlight'
import js from 'highlight.js/lib/languages/javascript'


import ts from 'highlight.js/lib/languages/typescript'


// 内置了很多 颜色主题 

//备选主题
// import "highlight.js/styles/obsidian.css"

// import "highlight.js/styles/monokai-sublime.css"
// 主题预览 https://highlightjs.org/static/demo/
// react-markdown 和 react-lowlight 一起使用 实现高亮 markdown

// 注册支持哪些样式
Lowlight.registerLanguage('js', js);
Lowlight.registerLanguage('ts', ts);

interface CodeBlockProps  {
  language?: string,
  inline?: boolean,
  literal?: string
}

const CodeBlock: FC<CodeBlockProps> =(props)=> {
  console.log('props: ', props);
  const { language, literal, inline } = props
  return (
    <Lowlight
      language={language || 'ts'}
      value={literal}
      inline={inline}
    />
  );
}

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock;