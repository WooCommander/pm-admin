import type {
  MarketingLinkModel,
  MarketingStatsCardModel,
} from '../models'

const MOCK_LATENCY_MS = 300

export class MarketingService {
  async loadLinks(): Promise<MarketingLinkModel[]> {
    await delay(MOCK_LATENCY_MS)
    return MOCK_LINKS
  }

  async loadStatsCards(): Promise<MarketingStatsCardModel[]> {
    await delay(MOCK_LATENCY_MS)
    return MOCK_STATS_CARDS
  }
}

export const marketingService = new MarketingService()

const MOCK_LINKS: MarketingLinkModel[] = [
  {
    id: '1',
    employeeName: '\u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0438\u043d\u043e\u0432\u0441\u043a\u0438\u0439 \u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0438\u043d \u041a\u043e\u043d\u0441\u0442\u0430\u043d\u0442\u0438\u043d\u043e\u0432\u0438\u0447',
    employeeAvatar: null,
    campaignName: '\u041b\u0435\u0442\u043d\u044f\u044f \u0430\u043a\u0446\u0438\u044f',
    status: 'active',
    link: 'app.ts-sys.ru/r/summer24',
    channel: 'Instagram',
    clicksCount: 4210,
    registrationsCount: 712,
  },
  {
    id: '2',
    employeeName: '\u041f\u0435\u0442\u0440\u043e\u0432\u0430 \u0410\u043d\u043d\u0430 \u0412\u0438\u043a\u0442\u043e\u0440\u043e\u0432\u043d\u0430',
    employeeAvatar: null,
    campaignName: '\u041a\u043e\u043d\u0442\u0435\u043a\u0441\u0442 \u2014 \u042f\u043d\u0434\u0435\u043a\u0441',
    status: 'active',
    link: 'app.ts-sys.ru/r/yandex-ctx',
    channel: '\u042f\u043d\u0434\u0435\u043a\u0441.\u0414\u0438\u0440\u0435\u043a\u0442',
    clicksCount: 3870,
    registrationsCount: 589,
  },
  {
    id: '3',
    employeeName: '\u0410\u0445\u043c\u0435\u0442\u043e\u0432 \u0420\u0443\u0441\u043b\u0430\u043d \u0418\u043b\u044c\u0434\u0430\u0440\u043e\u0432\u0438\u0447',
    employeeAvatar: null,
    campaignName: 'VK \u2014 \u0442\u0430\u0440\u0433\u0435\u0442 \u0430\u043f\u0440\u0435\u043b\u044c',
    status: 'active',
    link: 'app.ts-sys.ru/r/vk-apr',
    channel: '\u0412\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0435',
    clicksCount: 2140,
    registrationsCount: 318,
  },
  {
    id: '4',
    employeeName: '\u0418\u0432\u0430\u043d\u043e\u0432 \u0421\u0435\u0440\u0433\u0435\u0439 \u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u0438\u0447',
    employeeAvatar: null,
    campaignName: '\u041f\u0430\u0440\u0442\u043d\u0451\u0440 \u2014 \u0420\u043e\u043c\u0430\u0448\u043a\u0430',
    status: 'active',
    link: 'app.ts-sys.ru/r/romashka',
    channel: '\u041f\u0430\u0440\u0442\u043d\u0451\u0440\u0441\u043a\u0430\u044f',
    clicksCount: 1980,
    registrationsCount: 422,
  },
  {
    id: '5',
    employeeName: '\u0421\u0430\u0444\u0430\u0440\u043e\u0432\u0430 \u041b\u0435\u0439\u043b\u0430 \u0420\u0430\u0448\u0438\u0434\u043e\u0432\u043d\u0430',
    employeeAvatar: null,
    campaignName: '\u0422\u0435\u0441\u0442 \u2014 Telegram \u0437\u0438\u043c\u0430',
    status: 'paused',
    link: 'app.ts-sys.ru/r/tg-winter',
    channel: 'Telegram',
    clicksCount: 632,
    registrationsCount: 78,
  },
]

const MOCK_STATS_CARDS: MarketingStatsCardModel[] = [
  { id: 'total-clicks',  label: '\u0412\u0441\u0435\u0433\u043e \u043f\u0435\u0440\u0435\u0445\u043e\u0434\u043e\u0432',              hint: '12% \u0437\u0430 30 \u0434\u043d\u0435\u0439', value: '14 832', trend: 'positive' },
  { id: 'registrations', label: '\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0439',                                        hint: '8% \u0437\u0430 30 \u0434\u043d\u0435\u0439',  value: '2 419',  trend: 'positive' },
  { id: 'calls',         label: '\u041e\u0441\u0442\u0430\u0432\u0438\u043b\u0438 \u0437\u0432\u043e\u043d\u043e\u043a',                  hint: '3% \u0437\u0430 30 \u0434\u043d\u0435\u0439',  value: '748',    trend: 'negative' },
  { id: 'conversion',    label: '\u041a\u043e\u043d\u0432\u0435\u0440\u0441\u0438\u044f: \u043f\u0435\u0440\u0435\u0445\u043e\u0434 \u2192 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f', hint: '\u0411\u0435\u0437 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u0439', value: '16.3%', trend: 'neutral' },
]

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
