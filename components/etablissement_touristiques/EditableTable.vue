<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useetablissement_touristiqueStore } from '@/stores/apps/etablissement_touristique';

import etablissement_touristique from '@/_mockApis/apps/etablissement_touristiques';
import user1 from '/images/profile/user-1.jpg';
const store = useetablissement_touristiqueStore();

onMounted(() => {
    store.fetchetablissement_touristiques();
});
const getetablissement_touristiques: any = computed(() => {
    return store.etablissement_touristiques;
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const roles = ref(['Super Admin', 'Staff', 'Superviseur']);
//const etablissement_touristique = ref(['Sénégal', 'France']);
const regions = ref(['Dakar', 'Thiès']);
const departements = ref(['Dakar', 'Pikine']);
const entites = ref(['Entité 1']);
const organes = ref(['Organe 1']);
const desserts = ref(etablissement_touristique);
const listetablissement_touristiques = ref(getetablissement_touristiques)
const editedIndex = ref(-1);
const editedItem = ref({
    id: '',
    avatar: user1,
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});
const defaultItem = ref({
    id: '',
    avatar: user1,
    userinfo: '',
    usermail: '',
    phone: '',
    jdate: '',
    role: '',
    rolestatus: ''
});

//Methods
const filteredList = computed(() => {
    return listetablissement_touristiques.value.filter((user: any) => {
        return user.node.name.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    editedIndex.value = desserts.value.indexOf(item);
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    const index = desserts.value.indexOf(item);
    confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value);
    } else {
        desserts.value.push(editedItem.value);
    }
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Ajouter un établissement touristique' : 'Modifier un établissement touristique';
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Rechercher un établissement touristique" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-sm-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un établissement touristique
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" lg="12" md="12" sm="12">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.id" label="Code"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.userinfo"
                                        label="Nom du etablissement_touristique"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn
                            color="secondary"
                            :disabled="editedItem.userinfo == ''"
                            variant="flat"
                            @click="save"
                            >Save</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <!-- <th class="text-subtitle-1 font-weight-semibold">Id</th> -->
                <!-- <th class="text-subtitle-1 font-weight-semibold">Code</th> -->
                <th class="text-subtitle-1 font-weight-semibold">Nom</th>
                <th class="text-subtitle-1 font-weight-semibold">Adresse</th>
                <th class="text-subtitle-1 font-weight-semibold">Pays</th>
                <!-- <th class="text-subtitle-1 font-weight-semibold">Role</th> -->
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.node.id">
                <!-- <td class="text-subtitle-1">{{ item.node.isoCode }}</td> -->
                <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.name }}</h4>                           
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.address }}</h4>                           
                        </div>
                    </div>
                </td>
                <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.country.name }}</h4>                           
                        </div>
                    </div>
                </td>
               
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item)" v-bind="props"
                                    ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Delete">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                    ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
