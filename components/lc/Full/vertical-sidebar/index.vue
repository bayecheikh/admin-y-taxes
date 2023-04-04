<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
</script>

<template>
    <v-navigation-drawer
        left
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="75"
        mobile-breakpoint="960"
        app
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        expand-on-hover width="270"
    >
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <div class="sidebar_profile border-bottom">
                <v-list class="bg-muted">
                    <v-list-item class="pa-4 ml-1">
                        <v-list-item-title class="text-h6">Steve</v-list-item-title>
                        <v-list-item-subtitle  class="text-subtitle-1">Web Designer</v-list-item-subtitle>
                    <template v-slot:prepend class="me-0">
                        <v-avatar size="45" class="me-0">
                        <img src="/images/profile/user2.jpg" width="50" />
                        </v-avatar>
                    </template>

                    </v-list-item>
                </v-list>
            </div>
            <v-list class="py-5 px-4 bg-muted" density="compact">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->
                    <LcFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <LcFullVerticalSidebarNavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                    <!---Single Item-->
                    <LcFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
