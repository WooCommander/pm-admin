import { TirPmNotificationModel } from 'tir-components'

export const ADMIN_NOTIFICATION_GROUP = 'admin-notification'

export class NotificationAdapter {
  showError(message: string): void {
    console.error(message)
    this.sendNotification(message, 'error')
  }

  sendNotification(
    msg: string,
    typeMsg: 'success' | 'error' | 'info' | 'warn' = 'success',
  ): void {
    if (typeof document === 'undefined') return

    const event = new CustomEvent(ADMIN_NOTIFICATION_GROUP, {
      detail: new TirPmNotificationModel({
        title: msg,
        type: typeMsg,
        group: ADMIN_NOTIFICATION_GROUP,
        life: 2000,
        closable: true,
      }),
    })

    document.dispatchEvent(event)
  }
}

export const notificationAdapter = new NotificationAdapter()
