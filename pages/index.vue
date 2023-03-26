<template>
    
</template>

<script>
    export default {
        mounted()
        {
            this.$router.push('/auth/login')
          /* let isAuthenticate = this.$isLogged()
          if(!isAuthenticate)
          this.$router.push('/auth/login')
          else
          this.$router.push('/dashboard') */
        }
    }
</script>

<style scoped>

</style>