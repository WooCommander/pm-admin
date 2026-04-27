import { AppMarketingState } from './AppMarketingState'
import type { MarketingFiltersModel } from './models'
import { marketingService } from './services'

/**
 * Фасад модуля маркетинга.
 *
 * Связывает {@link AppMarketingState} с фетчингом из
 * {@link MarketingService}. Аналог {@link AppAdminService} —
 * ровно одна точка изменения стейта, страница и компоненты дёргают
 * только методы фасада.
 *
 * На этапе M-1 умеет только первичную загрузку и точечный апдейт
 * фильтров/выбранной ссылки. Дальше тут появятся `createLink`,
 * `updateLink`, `archiveLink` и пр.
 */
export class AppMarketingService {
  readonly state = new AppMarketingState()

  /**
   * Загружает данные первого экрана маркетинга: список ссылок и
   * карточки статистики. Запускается из `MarketingIndexPage.onMounted`.
   *
   * Параллелим оба запроса — они независимы и так быстрее.
   */
  async loadInitialData(): Promise<void> {
    this.state.setLoading(true)
    try {
      const [links, cards] = await Promise.all([
        marketingService.loadLinks(),
        marketingService.loadStatsCards(),
      ])
      this.state.setLinks(links)
      this.state.setStatsCards(cards)
    } finally {
      this.state.setLoading(false)
    }
  }

  setFilters(filters: MarketingFiltersModel): void {
    this.state.setFilters(filters)
  }

  patchFilters(patch: Partial<MarketingFiltersModel>): void {
    this.state.patchFilters(patch)
  }

  selectLink(id: string | null): void {
    this.state.setSelectedLinkId(id)
  }
}

/** Singleton на всё приложение. */
export const appMarketingService = new AppMarketingService()
