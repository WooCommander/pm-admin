export type MarketingLinkStatus = 'active' | 'paused'

export interface MarketingLinkModel {
  id: string
  employeeName: string
  employeeAvatar: string | null
  campaignName: string
  status: MarketingLinkStatus
  link: string
  channel: string
  clicksCount: number
  registrationsCount: number
}
