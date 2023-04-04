<script setup lang="ts">
import { MailIcon } from "vue-tabler-icons";
import { profileDD } from "@/_mockApis/headerData";
import { ref } from "vue";

// project imports

import axios from '@/utils/axios';
import axiosServices from '@/utils/axios';
import { useUtilisateurStore } from '@/stores/apps/utilisateur';
const store = useUtilisateurStore();
const router = useRouter();
const loading = ref(false);
//const { $getUser } = useNuxtApp()
const user = JSON.parse(localStorage.getItem('yendz_user') || '{}')?.user

async function logout() {
 
        await localStorage.removeItem('yendz_token')
        await localStorage.removeItem('yendz_user')

      router.push({ path: "/auth/login" });
  
    /* try {
      //console.log("Données connexion ++ ",{identifier:username.value,password:password.value})
       const response = await axiosServices.post('/users/auth/logout');
       store.login({})
      console.log("Reponse connexion ++ ",response)
      if(response){
        await localStorage.removeItem('yendz_token')
        await localStorage.removeItem('yendz_user')
      }
      router.push({ path: "/auth/login" });
    } catch (error) {
        alert("Login ou mot de passe incorrect");
        console.log(error);
    } */
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <img src="/images/profile/user2.jpg" width="35" alt="" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="360" elevation="10">
      <div class="px-8 pt-6">
        <h6 class="text-h5 font-weight-medium">User Profile</h6>
        <div class="d-flex align-center mt-4 pb-6">
          <v-avatar size="80">
            <img src="/images/profile/user2.jpg" width="80" />
          </v-avatar>
          <div class="ml-3">
            <h6 class="text-h6 mb-n1">{{ user.first_name +' '+user.last_name}}</h6>
            <span class="text-subtitle-1 font-weight-regular textSecondary"
              ></span
            >
            <div class="d-flex align-center mt-1">
              <MailIcon size="18" stroke-width="1.5" />
              <span
                class="text-subtitle-1 font-weight-regular textSecondary ml-2"
                >{{ user.email}}</span
              >
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <perfect-scrollbar style="">
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item
            v-for="item in profileDD"
            :key="item.title"
            class="py-4 px-8 custom-text-primary"
            :to="item.href"
          >
            <template v-slot:prepend>
              <v-avatar
                size="48"
                color="lightprimary"
                class="mr-3"
                rounded="md"
              >
                <v-img
                  :src="item.avatar"
                  width="24"
                  height="24"
                  :alt="item.avatar"
                />
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">
                {{ item.title }}
              </h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              {{ item.subtitle }}
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
     <!--  <div class="px-8 py-3">
        <div
          class="bg-lightprimary rounded-md pa-5 overflow-hidden position-relative"
        >
          <h5 class="text-h6">
            Unlimited<br />
            Access
          </h5>
          <v-btn variant="flat" color="primary" class="mt-3">Upgrade</v-btn>
          <img
            src="/images/backgrounds/unlimited-bg.png"
            alt="bg-img"
            class="right-pos-img"
          />
        </div>
      </div> -->
      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn color="primary" variant="outlined" block @click="logout" :loading="loading"
          >Se deconnecter</v-btn
        >
      </div>
    </v-sheet>
  </v-menu>
</template>
