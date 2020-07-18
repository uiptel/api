
import { Stat } from './stat.entity';

export interface Pagination {
  index: Stat[],
  total: number,
  limit: number,
  page: number,
}
