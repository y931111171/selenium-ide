import curryN from 'lodash/fp/curryN'
import { ApiHandler, Session } from '../../../types'

/**
 * This code isn't used, but I kept it around
 * because this represents the right way that the client
 * requests elevated permission actions from Electron
 */

export default curryN(
  2,
  async (
    { api, tabManager, window }: Session,
    tabID: number
  ): Promise<void> => {
    // Add our Selenium IDE v3 page as a tab
    const { getActive, getIDFromIndex, remove } = tabManager
    const view = remove(tabID)
    window.removeBrowserView(view)
    if (getActive() === tabID) {
      const firstTabID = getIDFromIndex(0)
      await api.server.tabs.select(firstTabID)
    }
  }
) as ApiHandler
