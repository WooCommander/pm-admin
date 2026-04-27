import type { MarketingStatsCardModel } from './marketing-stats-card.model'

export interface MarketingChartDayModel {
  date: string
  clicks: number
}

export interface MarketingSummaryStatModel {
  label: string
  value: number
  total: number
  color: string
}

export interface MarketingLinkStatsModel {
  dateFrom: string | null
  dateTo: string | null
  cards: MarketingStatsCardModel[]
  chartData: MarketingChartDayModel[]
  summaryStats: MarketingSummaryStatModel[]
}

export const createEmptyMarketingLinkStats = (): MarketingLinkStatsModel => ({
  dateFrom: null,
  dateTo: null,
  cards: [],
  chartData: [],
  summaryStats: [],
})
