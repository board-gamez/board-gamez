import { QueryOptions } from 'mongoose';
import { GetGamesInput } from './dto/get-games.dto';
import { FilterWrapper } from '@app/common/filter/filter-wrapper';

export class GameFilter extends FilterWrapper {
  constructor(private input: GetGamesInput) {
    super(
      {
        name: 'query-filter',
        filter: (fq: any) => {
          if (input.q) {
            fq['$or'] = [
              { title: new RegExp(`.*${input.q}.*`, 'gi') },
              { slug: new RegExp(`.*${input.q}.*`, 'gi') },
            ];
          }
        },
      },
      {
        name: 'type-filter',
        filter: (fq: any) => {
          if (input._types) {
            fq['_types'] = { $in: input._types };
          }
        },
      },
      {
        name: 'category-filter',
        filter: (fq: any) => {
          if (input._categories) {
            fq['_categories'] = { $in: input._categories };
          }
        },
      },
      {
        name: 'mechanism-filter',
        filter: (fq: any) => {
          if (input._mechanisms) {
            fq['_mechanisms'] = { $in: input._mechanisms };
          }
        },
      },
      {
        name: 'publisher-filter',
        filter: (fq: any) => {
          if (input._publishers) {
            fq['_publishers'] = { $in: input._publishers };
          }
        },
      },
      {
        name: 'designer-filter',
        filter: (fq: any) => {
          if (input._designers) {
            fq['_designers'] = { $in: input._designers };
          }
        },
      },
      {
        name: 'artist-filter',
        filter: (fq: any) => {
          if (input._artists) {
            fq['_artists'] = { $in: input._artists };
          }
        },
      },
    );
  }

  getFilterQuery(): object {
    return super.getFilterQuery();
  }

  getQueryOptions(): QueryOptions {
    return super.getQueryOptions(this.input);
  }
}
