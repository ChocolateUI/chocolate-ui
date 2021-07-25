export type Key = string | number;
export type GetCheckDisabled<RecordType> = (record: RecordType) => boolean;