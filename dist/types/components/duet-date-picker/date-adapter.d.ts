import { createDate } from "./date-utils";
declare type CreateDate = typeof createDate;
export declare type DuetDateParser = (input: string, createDate: CreateDate) => Date | undefined;
export declare type DuetDateFormatter = (date: Date) => string;
export interface DuetDateAdapter {
  parse: DuetDateParser;
  format: DuetDateFormatter;
  isDateDisabled?: (date: Date, focusedDate: Date) => boolean;
}
declare const isoAdapter: DuetDateAdapter;
export default isoAdapter;
