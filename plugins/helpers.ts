export default defineNuxtPlugin((localStorage) => {
    return {
      provide: {
        getUser: () => {
            localStorage.getItem('yendz_user') || '{}'
        }
      }
    }
  })