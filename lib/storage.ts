import { storage } from 'wxt/storage'

// Example storage items
export const counterStorage = storage.defineItem<number>('local:counter', {
  fallback: 0,
})

// Usage:
// const count = await counterStorage.getValue()
// await counterStorage.setValue(count + 1)
