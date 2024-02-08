export const pushHistory = (data: any,     unused: string,     url?: string | URL | null | undefined): void => {
  return window.history.pushState(data,unused,url)
}