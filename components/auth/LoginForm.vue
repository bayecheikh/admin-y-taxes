<script setup lang="ts">
import { ref } from "vue";
import { Form } from "vee-validate";

/*Social icons*/
import google from "/images/svgs/google-icon.svg";
import facebook from "/images/svgs/facebook-icon.svg";
// project imports
import axiosAuth from '@/utils/axios';
import axiosServices from '@/utils/axiosServices';
import { useUtilisateurStore } from '@/stores/apps/utilisateur';
const store = useUtilisateurStore();
onMounted(() => {
   if(localStorage.getItem('yendz_token') && localStorage.getItem('yendz_user'))
    router.push({ path: "/dashboards/modern" });
});
const getUser: any = computed(() => {
    return store.user;
});
const router = useRouter();
const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref("");
const username = ref("");
const passwordRules = ref([
  (v: string) => !!v || "Password is required",
  (v: string) =>
    (v && v.length <= 10) || "Password must be less than 10 characters",
]);
const emailRules = ref([
  (v: string) => !!v || "E-mail is required",
  //(v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

function validate() {
  
  router.push({ path: "/dashboards/modern" });
  //router.push({ path: "/dashboards/modern" });
}
// Fetch followers from action
async function login() {
    try {
      //console.log("Données connexion ++ ",{identifier:username.value,password:password.value})
       const response = await axiosAuth.post('/users/auth/login',{identifier:username.value,password:password.value});
       store.login(response.data)
      console.log("Reponse connexion ++ ",response)
      if(response.data.access_token){
        await localStorage.setItem('yendz_token',response.data.access_token)
        await localStorage.setItem('yendz_user',JSON.stringify(response.data))
        router.push({ path: "/dashboards/modern" });
      }
        //router.push({ path: "/dashboards/modern" });
        /* this.user = response.data.user;
        this.permissions = response.data.permissions
        this.access_token = response.data.access_token
        this.refresh_token = response.data.refresh_token
        this.token_type = response.data.token_type
        this.expire_in = response.data.expire_in
        this.control_organ_slug = response.data.control_organ_slug
        this.touristic_establishment_id = response.data.touristic_establishment_id */
    } catch (error) {
        alert("Login ou mot de passe incorrect");
        console.log(error);
    }
}
</script>

<template>
  <!-- <v-row class="d-flex mb-3">
    <v-col cols="6" sm="6" class="pr-2">
      <v-btn
        variant="outlined"
        size="large"
        class="border text-subtitle-1"
        block
      >
        <img :src="google" height="16" class="mr-2" alt="google" />
        <span class="d-sm-flex d-none mr-1">Sign in with</span>Google
      </v-btn>
    </v-col>
    <v-col cols="6" sm="6" class="pl-2">
      <v-btn
        variant="outlined"
        size="large"
        class="border text-subtitle-1"
        block
      >
        <img
          :src="facebook"
          width="25"
          height="25"
          class="mr-1"
          alt="facebook"
        />
        <span class="d-sm-flex d-none mr-1">Sign in with</span>FB
      </v-btn>
    </v-col>
  </v-row>
  <div class="d-flex align-center text-center mb-6">
    <div
      class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative"
    >
      <span class="bg-surface px-5 py-3 position-relative"
        >or sign in with</span
      >
    </div>
  </div> -->
  <Form @submit="login" v-slot="{ errors, isSubmitting }" class="mt-5">
    <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText"
      >Email</v-label
    >
    <VTextField
      v-model="username"
      :rules="emailRules"
      class="mb-8"
      required
      hide-details="auto"
    ></VTextField>
    <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText"
      >Mot de passe</v-label
    >
    <VTextField
      v-model="password"
      :rules="passwordRules"
      required
      hide-details="auto"
      type="password"
      class="pwdInput"
    ></VTextField>
    <div class="d-flex flex-wrap align-center my-3 ml-n2">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v:any) => !!v || 'You must agree to continue!']"
        required
        hide-details
        color="primary"
      >
        <template v-slot:label class="">Se souvenir de moi &nbsp; </template>
      </v-checkbox>
      <div class="ml-sm-auto">
        <NuxtLink
          to=""
          class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
          > Mot de passe oublié ?</NuxtLink
        >
      </div>
    </div>
    <v-btn
      size="large"
      :loading="isSubmitting"
      color="primary"
      :disabled="!password"
      block
      type="submit"
      flat
      >Se connecter</v-btn
    >
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>
