<template>
    <div class="selectable my-3" :title="house.style">
        <router-link :to="{
            name: 'House', params: { houseId: house.id }
        }">
            <img class="img-fluid" :src="house.img" alt="">
        </router-link>
        <!-- TODO move this -->
        <div class="col-4 p-3">
            <div class="bg-white elevation-2">
                <img class="img-fluid" src="{{house.img}}" alt="">
                <div class="p-2">
                    <h4 class="text-center">{{ house.style }} | {{ house.bdrm }} | {{ house.bath }}</h4>
                    <p>{{ house.description }}</p>
                    <p class="text-end text-success m-0">$<b>{{ house.price }}</b></p>
                    <button class="btn btn-info" @click="adjustHouse(house)" data-bs-toggle="modal"
                        data-bs-target="#house-form">Adjust
                        House Settings</button>
                    <button class="btn btn-danger" @click="deleteHouse(house)">delete me</button>
                </div>
            </div>
        </div>

    </div>
</template>





<script>
import { House } from '../models/House.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';



export default {
    props: {
        house: { type: House, required: true }
    },
    setup() {
        return {
            adjustHouse(house) {
                housesService.setActiveHouse(house)
            },
            async deleteHouse(house) {
                try {
                    const yes = await Pop.confirm(`Delete House?`)
                    if (!yes) { return }
                    await housesService.deleteHouse(house.id)
                } catch (error) {
                    logger.error([`deleting house`], error)
                    Pop.error(error)
                }
            }
        };
    },
};
</script>



<style lang="scss" scoped>
</style>