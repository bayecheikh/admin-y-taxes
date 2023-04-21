<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usepaysStore } from '@/stores/apps/pays';

const store = usepaysStore();
onMounted(() => {
    store.fetchpayss();
});

const getpayss: any = computed(() => {
    return store.payss;
});
const listpayss = ref(getpayss)

const valid = ref(true);
const dialog = ref(false);
const search = ref('');


const editedIndex = ref(0);
const editedItem = ref({
    isoCode: '',
    name: '',
});
const defaultItem = ref({
    isoCode: '',
    name: '',
});

//Methods
const filteredList = computed(() => {
    return listpayss.value.filter((pays: any) => {
        return pays.node.name.toLowerCase().includes(search.value.toLowerCase());
    });
});

function editItem(item: any) {
    console.log(listpayss.value.indexOf(item))
    editedIndex.value = 1;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
   // const index = listpayss.value.indexOf(item);
    confirm('Are you sure you want to delete this item?') && store.deletepayss(item);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = 0;
    }, 300);
}

function save() {
    console.log(editedIndex.value)
    if (editedIndex.value ==1) {
        store.updatepayss(editedItem.value)
    } else {
        store.addpayss(editedItem.value)       
    }
    editedIndex.value = 0;
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Ajouter un pays' : 'Modifier un pays';
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Rechercher un pays" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-sm-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un pays
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field variant="outlined" hide-details v-model="editedItem.isoCode" label="Iso Code"></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="12" md="12" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.name"
                                        label="Name"
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
                            :disabled="editedItem.name == ''"
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
                <th class="text-subtitle-1 font-weight-semibold">Code</th>
                <th class="text-subtitle-1 font-weight-semibold">Nom</th>
                <!-- <th class="text-subtitle-1 font-weight-semibold">Role</th> -->
                <th class="text-subtitle-1 font-weight-semibold">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.node.isoCode">
                <td class="text-subtitle-1">{{ item.node.isoCode }}</td>
                <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.name }}</h4>                           
                        </div>
                    </div>
                </td>
               
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item.node)" v-bind="props"
                                    ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Delete">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item.node)" v-bind="props"
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
