<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUtilisateurStore } from '@/stores/apps/utilisateur';

import utilisateur from '@/_mockApis/apps/utilisateurs';
import user1 from '/images/profile/user-1.jpg';
const store = useUtilisateurStore();

onMounted(() => {
    store.fetchUtilisateurs();
});
const getUtilisateurs: any = computed(() => {
    return store.utilisateurs;
});

const valid = ref(true);
const dialog = ref(false);
const search = ref('');
const rolesbg = ref(['primary', 'secondary', 'error', 'success', 'warning']);
const roles = ref(['Super Admin', 'Staff', 'Superviseur']);
const pays = ref(['Sénégal', 'France']);
const regions = ref(['Dakar', 'Thiès']);
const departements = ref(['Dakar', 'Pikine']);
const entites = ref(['Entité 1']);
const organes = ref(['Organe 1']);
const desserts = ref(utilisateur);
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
    return desserts.value.filter((user: any) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
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
    return editedIndex.value === -1 ? 'Ajouter un utilisateur' : 'Modifier un utilisateur';
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Rechercher un utilisateur" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-sm-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un utilisateur
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
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.id" label="Username"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.userinfo"
                                        label="Nom"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.userinfo"
                                        label="Prénom"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="pays"
                                        v-model="editedItem.rolestatus"
                                        label="Pays"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="regions"
                                        v-model="editedItem.rolestatus"
                                        label="Region"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="departements"
                                        v-model="editedItem.rolestatus"
                                        label="Département"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="entites"
                                        v-model="editedItem.rolestatus"
                                        label="Entité"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="organes"
                                        v-model="editedItem.rolestatus"
                                        label="Control organe"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.usermail"
                                        label="Email"
                                        type="email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.phone"
                                        label="Téléphone"
                                        type="phone"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.jdate"
                                        label="Date de création"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.role" label="Role"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="roles"
                                        v-model="editedItem.rolestatus"
                                        label="Role"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="close">Cancel</v-btn>
                        <v-btn
                            color="secondary"
                            :disabled="editedItem.userinfo == '' || editedItem.usermail == ''"
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
                <th class="text-subtitle-1 font-weight-semibold">Prénom & Nom</th>
                <th class="text-subtitle-1 font-weight-semibold">Téléphone</th>
                <th class="text-subtitle-1 font-weight-semibold">Date de création</th>
                <th class="text-subtitle-1 font-weight-semibold">Role</th>
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">
                <!-- <td class="text-subtitle-1">{{ item.id }}</td> -->
                <td>
                    <div class="d-flex align-center py-4">
                        <div>
                            <v-img :src="item.avatar" width="45px" class="rounded-circle img-fluid"></v-img>
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.userinfo }}</h4>
                            <span class="text-subtitle-1 text-no-wrap font-weight-medium text-medium-emphasis">{{ item.usermail }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap font-weight-medium text-medium-emphasis">{{ item.phone }}</td>
                <td class="text-subtitle-1 text-no-wrap font-weight-medium text-medium-emphasis">{{ item.jdate }}</td>
                <td>
                    <v-chip :color="item.rolestatus" size="small" label>{{ item.role }}</v-chip>
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
