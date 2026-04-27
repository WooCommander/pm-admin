import type { MarketingLinkStatus } from './marketing-link.model'

export type MarketingLinkChannel =
  | 'telegram'
  | 'vk'
  | 'instagram'
  | 'youtube'
  | 'google'
  | 'yandex'
  | 'other'

export interface MarketingChannelOption {
  value: MarketingLinkChannel
  label: string
}

export const MARKETING_CHANNEL_OPTIONS: MarketingChannelOption[] = [
  { value: 'telegram', label: 'Telegram' },
  { value: 'vk', label: 'ВКонтакте' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'google', label: 'Google' },
  { value: 'yandex', label: 'Яндекс' },
  { value: 'other', label: 'Другое' },
]

export interface MarketingStatusOption {
  value: MarketingLinkStatus
  label: string
}

export const MARKETING_STATUS_OPTIONS: MarketingStatusOption[] = [
  { value: 'active', label: 'Активна' },
  { value: 'paused', label: 'На паузе' },
]

export interface MarketingLinkFormModel {
  campaignName: string
  slug: string
  url: string
  channel: MarketingLinkChannel | null
  utmSource: string
  utmMedium: string
  utmCampaign: string
  status: MarketingLinkStatus
  trackRegistrations: boolean
  trackCalls: boolean
}

export const createEmptyMarketingLinkForm = (): MarketingLinkFormModel => ({
  campaignName: '',
  slug: '',
  url: '',
  channel: null,
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  status: 'active',
  trackRegistrations: true,
  trackCalls: false,
})
