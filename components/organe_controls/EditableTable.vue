<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useorgane_controlStore } from '@/stores/apps/organe_control';
import { usepaysStore } from '@/stores/apps/pays';


const store = useorgane_controlStore();
const storePays = usepaysStore();
onMounted(() => {
    store.fetchorgane_controls();
    storePays.fetchpayss();
});
const getorgane_controls: any = computed(() => {
    return store.organe_controls;
});
const getpayss: any = computed(() => {
    return storePays.payss;
});
const listpayss = ref(getpayss)
const listregions = ref([])
const listdepartements = ref([])

const selectedPays = ref({})
const selectedRegion = ref({})
const selectedDepartement = ref({})

const valid = ref(true);
const dialog = ref(false);
const search = ref('');

//const organe_control = ref(['Sénégal', 'France']);

const listorgane_controls = ref(getorgane_controls)
const editedIndex = ref(0);

const editedItem = ref({
    address: '',
    countryId: '',
    departmentId: '',
    name: '',
    phone: '',
    picture: '',
    regionId: ''
});
const defaultItem = ref({
    address: '',
    countryId: '',
    departmentId: '',
    name: '',
    phone: '',
    picture: '',
    regionId: ''
});

//Methods
const filteredList = computed(() => {
    return listorgane_controls.value.filter((user: any) => {
        return user.node.name.toLowerCase().includes(search.value.toLowerCase());
    });
});


function editItem(item: any) {
    console.log(listorgane_controls.value.indexOf(item))
    editedIndex.value = 1;
    editedItem.value = Object.assign({}, item);
    dialog.value = true;
}
function deleteItem(item: any) {
    confirm('Are you sure you want to delete this item?') && store.deleteorgane_controls(item);
}

function close() {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = Object.assign({}, defaultItem.value);
        editedIndex.value = -1;
    }, 300);
}
function save() {
    console.log(editedIndex.value)
    if (editedIndex.value ==1) {
        store.updateorgane_controls(editedItem.value)
    } else {
        store.addorgane_controls(editedItem.value)       
    }
    editedIndex.value = 0;
    close();
}

//Computed Property
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Ajouter un organe de contrôle' : 'Modifier un organe de contrôle';
});
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Rechercher un organe de contrôle" hide-details variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" lg="8" md="6" class="text-sm-right">
            <v-dialog v-model="dialog" max-width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Ajouter un organe de contrôle
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
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.name"
                                        label="Nom"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.phone"
                                        label="Phone"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.address"
                                        label="Address"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" lg="6" md="6" sm="12">
                                    <v-text-field
                                        variant="outlined"
                                        hide-details
                                        v-model="editedItem.picture"
                                        label="Picture"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-autocomplete 
                                        :v-model="selectedPays"
                                        :items="listpayss" 
                                        color="primary" 
                                        label="Pays"
                                        item-title="node.name"
                                        item-value="node.id"
                                        
                                        variant="outlined"
                                       
                                        hide-details>
                                        </v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-autocomplete 
                                        :v-model="selectedRegion"
                                        :items="listpayss" 
                                        color="primary" 
                                        label="Région"
                                        item-title="node.name"
                                        item-value="node.id"
                                        
                                        variant="outlined"
                                       
                                        hide-details>
                                        </v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-autocomplete 
                                        :v-model="selectedDepartement"
                                        :items="listpayss" 
                                        color="primary" 
                                        label="Département"
                                        item-title="node.name"
                                        item-value="node.id"
                                        
                                        variant="outlined"
                                       
                                        hide-details>
                                        </v-autocomplete>
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
                <!-- <th class="text-subtitle-1 font-weight-semibold">Code</th> -->
                <th class="text-subtitle-1 font-weight-semibold">Nom</th>
                <!-- <th class="text-subtitle-1 font-weight-semibold">Téléphone</th> -->
                <th class="text-subtitle-1 font-weight-semibold">Adresse</th>
                <!-- <th class="text-subtitle-1 font-weight-semibold">Département</th>
                <th class="text-subtitle-1 font-weight-semibold">Région</th> -->
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
                            <h4 class="text-h6 text-no-wrap">{{ item.node.name || ''}}</h4>                           
                        </div>
                    </div>
                </td>
                <!-- <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.phone || ''}}</h4>                           
                        </div>
                    </div>
                </td> -->
                <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.address || ''}}</h4>                           
                        </div>
                    </div>
                </td>
                <!-- <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.department && item.node.department.name}}</h4>                           
                        </div>
                    </div>
                </td> -->
                <!-- <td>
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.region && item.node.region.name || ''}}</h4>                           
                        </div>
                    </div>
                </td>-->
                <td> 
                    <div class="d-flex align-center py-4">

                        <div class="ml-5">
                            <h4 class="text-h6 text-no-wrap">{{ item.node.country.name || ''}}</h4>                           
                        </div>
                    </div>
                </td>
               
                <td>
                    <div class="d-flex align-center">
                        <!-- <v-tooltip text="Edit">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="detailItem(item)" v-bind="props"
                                    ><PencilIcon stroke-width="1.5" size="20" class="text-primary"
                                /></v-btn>
                            </template>
                        </v-tooltip> -->
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
