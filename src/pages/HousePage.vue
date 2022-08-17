<template>
    <div class="house-page" v-if="house">
        <div class="p-3">
            <div class="bg-white elevation-2" :title="house.style">
                <img class="img-fluid" :src="house.img" alt="">
                <div class="p-2">
                    <h4 class="text-center">{{ house.style }} | {{ house.bdrm }} | {{ house.bath }}</h4>
                    <p>{{ house.description }}</p>
                    <p class="text-end text-success m-0">$<b>{{ house.price }}</b></p>
                    <button class="btn btn-info" @click="adjustHouse(house)" data-bs-toggle="modal"
                        data-bs-target="#house-form">Adjust
                        House Settings</button>
                    <button class="btn btn-danger" @click="deleteHouse(house)">Delete me</button>
                </div>
            </div>
        </div>
        <Modal id="house-form">
            <HouseForm />
        </Modal>
    </div>
    <div v-else>
        loading houses.....
    </div>
</template>






<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import HouseForm from '../components/HouseForm.vue';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';


export default {
    setup() {
        const route = useRoute()
        async function getHouseById() {
            try {
                await housesService.getHouseById(route.params.houseId)
            } catch (error) {
                logger.error('[Get house by Id]', error)
                Pop.error(error)
            }
        }
        onMounted(() => {
            getHouseById()
        })

        return {
            house: computed(() => AppState.activeHouse),
            adjustHouse(house) {
                housesService.setActiveHouse(house)
            },
            async deleteHouse(house) {
                try {
                    const yes = await Pop.confirm('Delete house?')
                    if (!yes) { return }
                    await housesService.deleteHouse(house.id)
                } catch (error) {
                    logger.error('[Delete house]', error)
                    Pop.error(error)
                }
            }
        };
    },
    components: { HouseForm }
};
</script>

<style lang="scss" scoped>
</style>
