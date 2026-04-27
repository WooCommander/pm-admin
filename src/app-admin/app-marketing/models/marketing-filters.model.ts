export type MarketingPrimaryTab = 'team' | 'personal'
export type MarketingStatusTab = 'all' | 'active' | 'paused'

export interface MarketingFiltersModel {
  primaryTab: MarketingPrimaryTab
  dateFrom: string | null
  dateTo: string | null
  statusTab: MarketingStatusTab
  search: string
}

export const createEmptyMarketingFilters = (): MarketingFiltersModel => ({
  primaryTab: 'team',
  dateFrom: null,
  dateTo: null,
  statusTab: 'all',
  search: '',
})
