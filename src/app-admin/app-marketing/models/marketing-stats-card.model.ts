export type MarketingStatsTrend = 'positive' | 'negative' | 'neutral'

export interface MarketingStatsCardModel {
  id: string
  label: string
  hint: string
  value: string
  trend: MarketingStatsTrend
}
