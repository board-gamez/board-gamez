import { QueryOptions } from 'mongoose';
import { FilterItem } from './filter-item';
import { CoreFilter } from '../dto/filter.dto';

export class FilterWrapper {
  filterItems: FilterItem[];

  constructor(...filterItems: FilterItem[]) {
    this.filterItems = filterItems;
  }

  getQueryOptions(coreFilter: CoreFilter): QueryOptions {
    const limit = Number(coreFilter.limit);
    const page = Number(coreFilter.page);
    const sort = coreFilter.sort;

    return {
      limit: limit || 10,
      skip: (page - 1) * limit || 0,
      sort: sort || '-createdAt',
    };
  }

  getFilterQuery(): object {
    const filterQuery = {};

    this.filterItems.forEach((fi) => {
      if (!fi.filter) return;

      if (typeof fi.filter === 'string') {
        filterQuery[fi.name] = fi.filter;
      } else {
        fi.filter(filterQuery);
      }
    });

    return filterQuery;
  }
}
