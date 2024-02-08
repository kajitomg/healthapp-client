export const replaceHistory = (data: any,     unused: string,     url?: string | URL | null | undefined): void => {
  return window.history.replaceState(data,unused,url)
}