import React from 'react'
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadProps {
  /** 必选参数，上传的地址 */
  action: string,
  /** 上传的文件列表 */
  defaultFileList: [];
}

const Upload: React.FC<UploadProps> =(props) =>{
  return(
    <div>

    </div>
  )
}

export default Upload