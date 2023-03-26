<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useEcomStore } from '@/stores/apps/eCommerce';
// Icon Imports
import { GridDotsIcon, LanguageIcon, SearchIcon, Menu2Icon, BellRingingIcon, ShoppingCartIcon } from 'vue-tabler-icons';
const customizer = useCustomizerStore();
const showSearch = ref(false);
const drawer = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
    showSearch.value = !showSearch.value;
}
watch(priority, (newPriority) => {
    // yes, console.log() is a side effect
    priority.value = newPriority;
});
// count items
const store = useEcomStore();
const getCart = computed(() => {
    return store.cart;
});
</script>

<template>
    <v-app-bar elevation="10" :priority="priority" height="70">
        <div :class="customizer.boxed ? 'maxWidth v-toolbar__content px-lg-0 px-0' : 'v-toolbar__content px-6'">
            <div class="d-sm-flex d-none">
                <LcFullLogo />
            </div>
            <div class="d-sm-none d-flex mr-2">
                <LcFullLogoIcon />
            </div>
            <v-btn class="hidden-lg-and-up ms-3" icon rounded="sm" variant="flat"
                @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
                <Menu2Icon size="25" />
            </v-btn>

            <!-- search mobile -->
            <v-sheet v-if="showSearch" class="search-sheet v-col-12">
                <LcFullVerticalHeaderSearchbar :closesearch="searchbox" />
            </v-sheet>

            <!-- ------------------------------------------------>
            <!-- Search part -->
            <!-- ------------------------------------------------>
            <v-sheet class="d-none d-lg-block">
                <LcFullVerticalHeaderSearchbar />
            </v-sheet>

            <!---/Search part -->
            <v-spacer />
            <!-- ---------------------------------------------- -->
            <!---right part -->
            <!-- ---------------------------------------------- -->

            <!-- ---------------------------------------------- -->
            <!-- translate -->
            <!-- ---------------------------------------------- -->
            <LcFullVerticalHeaderLanguageDD />

            <!-- ---------------------------------------------- -->
            <!-- ShoppingCart -->
            <!-- ---------------------------------------------- -->
            <v-btn icon variant="text" color="primary" to="/apps/ecommerce/checkout">
                <v-badge color="error" :content="getCart?.length">
                    <ShoppingCartIcon stroke-width="1.5" size="22" />
                </v-badge>
            </v-btn>

            <!-- ---------------------------------------------- -->
            <!-- Notification -->
            <!-- ---------------------------------------------- -->

            <LcFullVerticalHeaderNotificationDD />

            <!-- ---------------------------------------------- -->
            <!-- User Profile -->
            <!-- ---------------------------------------------- -->
            <div class="ml-3 mr-sm-0">
                <LcFullVerticalHeaderProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
