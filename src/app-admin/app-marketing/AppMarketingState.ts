import { reactive } from 'vue'

import type {
  MarketingFiltersModel,
  MarketingLinkModel,
  MarketingStatsCardModel,
} from './models'
import { createEmptyMarketingFilters } from './models'

/**
 * Стейт модуля маркетинга.
 *
 * По задумке (см. `AppWikiState` из wiki-section 2026) держит только
 * данные — без бизнес-логики. Любые мутации идут через
 * {@link AppMarketingService} — иначе стейт легко рассинхронить.
 *
 * Поля:
 *  - {@link links}          — список маркетинговых ссылок (для M-4 таблицы);
 *  - {@link statsCards}     — карточки KPI на главной (для M-2);
 *  - {@link filters}        — состояние фильтров (для M-3);
 *  - {@link selectedLinkId} — id текущей открытой ссылки (для M-6 модалки);
 *  - {@link isLoading}      — общий флаг первичной загрузки страницы.
 *
 * Ссылки никогда не должны быть `undefined` — пустой массив до загрузки
 * проще, чем `null`-проверки в каждом компоненте.
 */
export class AppMarketingState {
  private readonly data = reactive<{
    links: MarketingLinkModel[]
    statsCards: MarketingStatsCardModel[]
    filters: MarketingFiltersModel
    selectedLinkId: string | null
    isLoading: boolean
  }>({
    links: [],
    statsCards: [],
    filters: createEmptyMarketingFilters(),
    selectedLinkId: null,
    isLoading: false,
  })

  get links(): MarketingLinkModel[] {
    return this.data.links
  }

  get statsCards(): MarketingStatsCardModel[] {
    return this.data.statsCards
  }

  get filters(): MarketingFiltersModel {
    return this.data.filters
  }

  get selectedLinkId(): string | null {
    return this.data.selectedLinkId
  }

  get isLoading(): boolean {
    return this.data.isLoading
  }

  setLinks(links: MarketingLinkModel[]): void {
    this.data.links = links
  }

  setStatsCards(cards: MarketingStatsCardModel[]): void {
    this.data.statsCards = cards
  }

  setFilters(filters: MarketingFiltersModel): void {
    this.data.filters = filters
  }

  /**
   * Точечное обновление пары полей — удобно из инпутов.
   * Внутри `Object.assign` по reactive-объекту — Vue корректно
   * пробросит реактивность.
   */
  patchFilters(patch: Partial<MarketingFiltersModel>): void {
    Object.assign(this.data.filters, patch)
  }

  setSelectedLinkId(id: string | null): void {
    this.data.selectedLinkId = id
  }

  setLoading(value: boolean): void {
    this.data.isLoading = value
  }
}
