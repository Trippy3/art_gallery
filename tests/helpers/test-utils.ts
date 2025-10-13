import { Page } from '@playwright/test'

export async function waitForHydration(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(500) // Wait for React hydration
}

export async function scrollToElement(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded()
}

export async function takeFullPageScreenshot(page: Page, name: string) {
  await page.screenshot({
    path: `screenshots/${name}.png`,
    fullPage: true,
  })
}

export async function getComputedStyle(page: Page, selector: string, property: string) {
  return await page.$eval(selector, (el, prop) => {
    return window.getComputedStyle(el).getPropertyValue(prop as string)
  }, property)
}

export async function waitForAnimation(page: Page, duration: number = 1000) {
  await page.waitForTimeout(duration)
}

export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => localStorage.clear())
}

export async function setLocalStorageItem(page: Page, key: string, value: string) {
  await page.evaluate(({ k, v }) => {
    localStorage.setItem(k, v)
  }, { k: key, v: value })
}

export async function getLocalStorageItem(page: Page, key: string) {
  return await page.evaluate((k) => {
    return localStorage.getItem(k)
  }, key)
}
