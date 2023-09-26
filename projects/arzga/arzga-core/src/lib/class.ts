/**
 * this abstract class inherited in all abstract classes for development and skleton mode of components.
 * **(usage: {className} extends ApiDTO&lt;{interfaceName}&gt; => ApiDTO extends Dummy `so all classes has isDummy attribute`)**
 */
export abstract class Dummy {
  [key: string]: any;

  isDummy: boolean;

  protected constructor(isDummy?: boolean) {
    this.isDummy = isDummy ?? false;
  }
}

/**
 * we use this abstract for all models that have crud api call
 * this abstract has getApiDTO method and fillFromPartial to get valid object for api-call and fill from partial object( to prevent making new instance of models in development )
 */
export abstract class ApiDTO<ChildInterface> extends Dummy {

  protected notValidKeysForApi: (keyof Partial<this>)[] = [
    'createDate', 'lastUpdateDate', 'isDeleted'
  ];

  protected constructor(isDummy: boolean = false) {
    super(isDummy);
  }

  getApiDTO(force?: boolean): any {
    if ( force || !this.isDummy ) {
      let keys: string[] = Object.keys(this)
        .filter((key) => (key !== 'notValidKeysForApi' && key !== 'isDummy'))
        .filter((key) => !this.notValidKeysForApi.includes(key))
        .filter((key) => this.hasFilled(key));

      let partial: Partial<this> = {};
      keys.forEach((key: keyof Partial<this>) => {
        if ( typeof this[key] === 'object' ) {
          if ( Array.isArray(this[key]) ) {
            (<any[]>(partial[key as keyof Partial<this>])) = (<any[]>this[key])
              .map(item => {
                if ( typeof item.getApiDTO === 'function' ) {
                  return item.getApiDTO(force);
                } else {
                  return item;
                }
              });
          } else {
            if ( typeof this[key].getApiDTO === 'function' ) {
              partial[key] = this[key].getApiDTO(force);
            } else {
              partial[key] = this[key];
            }
          }
        } else {
          partial[key] = this[key];
        }
      });
      return partial;
    } else {
      // TODO: handle dummy later
    }
  }

  fillFromPartial(model?: Partial<ChildInterface>): void {
    if ( model ) {
      let keys: (keyof Partial<ChildInterface>)[] = Object.keys(model)
        .map(key => {
          return key as keyof Partial<ChildInterface>
        });
      Object.values(keys)
        .forEach((key) => {
          this.fillDTOKey(model, key);
        });
    }
  }

  reset(model?: Partial<ChildInterface>): void {
    if ( model ) {
      let keys: (keyof Partial<ChildInterface>)[] = Object.keys(this)
        .map(key => {
          return key as keyof Partial<ChildInterface>
        });
      Object.values(keys)
        .forEach((key) => {
          this.fillDTOKey(model, key);
        });
    }
  }

  protected hasFilled(key: string): boolean {
    switch (typeof this[key]) {
      case "string":
        return this[key] !== null && this[key] !== undefined;
      case "boolean":
        return (this[key] !== null && this[key] !== undefined)
      case "number":
      case "bigint":
        return (this[key] !== null && this[key] !== undefined);
      case "object":
        if ( Array.isArray(this[key]) ) {
          return true;
        } else return (this[key] !== null && typeof this[key] !== 'undefined');
      case "undefined":
        return false;
      default:
        return false;
    }
  }

  protected fillDTOKey(model: Partial<ChildInterface>, key: keyof Partial<ChildInterface>): void {
    if ( typeof this[key as string] === 'object') {
      let subModel = model[key];
      if ( Array.isArray(subModel) ) {
        (subModel).map((item: any, index: number) => {
          if ( typeof this[key as string][index]?.fillFromPartial === 'function' ) {
            this[key as string][index].fillFromPartial((<Partial<ChildInterface>[keyof ChildInterface] & any[]>subModel)[index]);
          } else {
            this[key as string][index] = (<Partial<ChildInterface>[keyof ChildInterface] & any[]>subModel)[index];
          }
        })
      } else {
        if ( typeof this[key as string]?.fillFromPartial === 'function' ) {
          this[key as string].fillFromPartial(model[key]);
        } else {
          this[key as string] = model[key];
        }
      }
    } else {
      this[key as string] = model[key];
    }
  }

}

export enum DeployTargetEnum {
  LOCAL = 'LOCAL',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION'
}

export interface EnvironmentInterface {
  production: boolean;
  deployTarget: DeployTargetEnum;
  apiUrl: string;
  loggerUrl: string;
  recaptchaToken: string;
}

export interface PaginationInterface {
  page: number;
  size: number;
  sort?: string;
}

export interface SortInterface {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInterface {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: SortInterface;
  unpaged: boolean;
}

export interface PageResponseInterface<InheritedInterface> {
  content: InheritedInterface[];
  empty: boolean;
  first: boolean | null;
  last: boolean | null;
  number: number | null;
  numberOfElements: number;
  pageable: PageableInterface | null;
  size: number;
  sort: SortInterface | null;
  totalElements: number;
  totalPages: number;
}

export abstract class PageResponseDTO<InheritedInterface> extends ApiDTO<PageResponseInterface<InheritedInterface>> {
  content: InheritedInterface[];
  empty: boolean;
  first: boolean | null;
  last: boolean | null;
  number: number | null;
  numberOfElements: number;
  pageable: PageableInterface | null;
  size: number;
  sort: SortInterface | null;
  totalElements: number;
  totalPages: number;

  protected constructor(partial?: Partial<PageResponseInterface<InheritedInterface>>, isDummy: boolean = false) {
    super(isDummy);
    this.content = partial && partial.content || [];
    this.empty = partial && partial.empty || true;
    this.first = partial && partial.first || null;
    this.last = partial && partial.last || null;
    this.number = partial && partial.number || null;
    this.numberOfElements = partial && partial.numberOfElements || 0;
    this.pageable = partial && partial.pageable || null;
    this.size = partial && partial.size || 0;
    this.sort = partial && partial.sort || null;
    this.totalElements = partial && partial.totalElements || 0;
    this.totalPages = partial && partial.totalPages || 0;
  }

  set(partial?: Partial<PageResponseInterface<InheritedInterface>>) {
    this.content = partial?.content ?? [];
    this.empty = partial?.empty ?? true;
    this.first = partial?.first ?? null;
    this.last = partial?.last ?? null;
    this.number = partial?.number ?? 0;
    this.numberOfElements = partial?.numberOfElements ?? 0;
    this.pageable = partial?.pageable ?? null;
    this.size = partial?.size ?? 0;
    this.sort = partial?.sort ?? null;
    this.totalElements = partial?.totalElements ?? 0;
    this.totalPages = partial?.totalPages ?? 0;
  }
}

export class PageResponse<InheritedInterface> extends PageResponseDTO<InheritedInterface> {

  constructor(partial?: Partial<PageResponseInterface<InheritedInterface>>, isDummy: boolean = false) {
    super(partial, isDummy);
  }

  static dummy(partial?: Partial<PageResponseInterface<any>>) {
    return new PageResponse(partial, true);
  }

  static mapFromApi(partial?: Partial<PageResponseInterface<any>>) {
    return new PageResponse(partial);
  }

}

export type getApiPathById = (id: string | number) => string;
