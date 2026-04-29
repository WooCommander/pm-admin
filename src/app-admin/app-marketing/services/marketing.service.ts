import type {
  MarketingChartDayModel,
  MarketingLinkModel,
  MarketingLinkStatsModel,
  MarketingStatsCardModel,
} from '../models'
import { createEmptyMarketingLinkStats } from '../models'

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

  async loadLinkStats(linkId: string): Promise<MarketingLinkStatsModel> {
    await delay(MOCK_LATENCY_MS)
    const link = MOCK_LINKS.find(l => l.id === linkId)
    if (!link) return createEmptyMarketingLinkStats()
    return buildLinkStats(link)
  }
}

export const marketingService = new MarketingService()

// ---------- helpers ----------

function buildLinkStats(link: MarketingLinkModel): MarketingLinkStatsModel {
  const calls = Math.round(link.registrationsCount * 0.278)
  const convPct = ((link.registrationsCount / link.clicksCount) * 100).toFixed(1) + '%'
  const dailyBase = Math.min(125, Math.round(link.clicksCount / 30))

  return {
    dateFrom: null,
    dateTo: null,
    cards: [
      {
        id: 'clicks',
        label: 'Переходы',
        hint: '+18% vs пр. период',
        value: link.clicksCount.toLocaleString('ru-RU'),
        trend: 'positive',
      },
      {
        id: 'registrations',
        label: 'Регистрации',
        hint: '+11% vs пр. период',
        value: link.registrationsCount.toLocaleString('ru-RU'),
        trend: 'positive',
      },
      {
        id: 'calls',
        label: 'Звонки',
        hint: '-4% vs пр. период',
        value: calls.toLocaleString('ru-RU'),
        trend: 'negative',
      },
      {
        id: 'conversion',
        label: 'Конверсия',
        hint: 'Без изменений',
        value: convPct,
        trend: 'neutral',
      },
    ],
    chartData: buildChartData(dailyBase),
    summaryStats: [
      { label: 'Переходы',     value: link.clicksCount,         total: link.clicksCount, color: '#2a77ef' },
      { label: 'Регистрации', value: link.registrationsCount,  total: link.clicksCount, color: '#0d9336' },
      { label: 'Звонки',     value: calls,                    total: link.clicksCount, color: '#ea8313' },
    ],
  }
}

// 14 апр — 30 апр 2026, коэффициенты дают реалистичную кривую
const CHART_FACTORS = [
  0.68, 0.76, 0.88, 1.0,  0.95, 0.86, 0.78,
  0.72, 0.80, 0.90, 0.97, 1.0,  0.94, 0.86,
]

function buildChartData(base: number): MarketingChartDayModel[] {
  return CHART_FACTORS.map((factor, i) => ({
    date: `${14 + i} апр`,
    clicks: Math.round(base * factor),
  }))
}

// ---------- mock data ----------

const MOCK_LINKS: MarketingLinkModel[] = [
  {
    id: '1',
    employeeName: 'Константиновский Константин Константинович',
    employeeAvatar: null,
    campaignName: 'Летняя акция',
    status: 'active',
    link: 'app.ts-sys.ru/r/summer24',
    channel: 'Instagram',
    clicksCount: 4210,
    registrationsCount: 712,
  },
  {
    id: '2',
    employeeName: 'Петрова Анна Викторовна',
    employeeAvatar: null,
    campaignName: 'Контекст — Яндекс',
    status: 'active',
    link: 'app.ts-sys.ru/r/yandex-ctx',
    channel: 'Яндекс.Директ',
    clicksCount: 3870,
    registrationsCount: 589,
  },
  {
    id: '3',
    employeeName: 'Ахметов Руслан Ильдарович',
    employeeAvatar: null,
    campaignName: 'VK — таргет апрель',
    status: 'active',
    link: 'app.ts-sys.ru/r/vk-apr',
    channel: 'ВКонтакте',
    clicksCount: 2140,
    registrationsCount: 318,
  },
  {
    id: '4',
    employeeName: 'Иванов Сергей Александрович',
    employeeAvatar: null,
    campaignName: 'Партнёр — Ромашка',
    status: 'active',
    link: 'app.ts-sys.ru/r/romashka',
    channel: 'Партнёрская',
    clicksCount: 1980,
    registrationsCount: 422,
  },
  {
    id: '5',
    employeeName: 'Сафарова Лейла Рашидовна',
    employeeAvatar: null,
    campaignName: 'Тест — Telegram зима',
    status: 'paused',
    link: 'app.ts-sys.ru/r/tg-winter',
    channel: 'Telegram',
    clicksCount: 632,
    registrationsCount: 78,
  },
]

const MOCK_STATS_CARDS: MarketingStatsCardModel[] = [
  { id: 'total-clicks',  label: 'Всего переходов',              hint: '12% за 30 дней', value: '14 832', trend: 'positive' },
  { id: 'registrations', label: 'Регистраций',                                  hint: '8% за 30 дней',  value: '2 419',  trend: 'positive' },
  { id: 'calls',         label: 'Оставили звонок',              hint: '3% за 30 дней',  value: '748',    trend: 'negative' },
  { id: 'conversion',    label: 'Конверсия: переход → регистрация', hint: 'Без изменений', value: '16.3%', trend: 'neutral' },
]

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
