<template>
    <div class="hover-house selectable my-3" :title="house.style">
        <router-link :to="{
            name: 'House', params: { houseId: house.id }
        }">
            <img class="img-fluid" :src="house.img" alt="">
        </router-link>

        <!-- TODO move this -->
        <div class="p-3">
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
.hover-house {
    transition: all .15s linear;

    &:hover {
        transform: translateY(2px);
        border-radius: 10px;
    }
}
</style>




<!-- <form @submit.prevent="handleSubmit()" class="house-form">
    <h3 class="text-primary">List Your House</h3>
    <div class="row">
        <div class="col-4">
            <label class="form-label" for="style">Style</label>
            <input class="form-control" type="text" minlength="5" id="style" name="style" value="${house.style}">
        </div>
        <div class="col-4">
            <label class="form-label" for="bdrm">Bedroom</label>
            <input class="form-control" type="number" id="bdrm" name="bdrm" value="${house.bdrm}">
        </div>
        <div class="col-4">
            <label class="form-label" for="bath">Bath</label>
            <input class="form-control" type="number" id="bath" name="bath" value="${house.bath}">
        </div>
        <div class="col-4">
            <label class="form-label" for="price">Price</label>
            <input class="form-control" type="number" min="1" id="price" name="price" value="${house.price}">
        </div>
        <div class="col-8">
            <label class="form-label" for="img">Image</label>
            <input class="form-control" type="text" id="img" name="img" value="${house.img}">
        </div>
        <div class="col-12">
            <label class="form-label" for="description">Description</label>
            <textarea class="w-100 form-control" name="description" id="description" value="${house.description}" rows="5"></textarea>
            <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light">Submit</button>
        </div>
    </div>
</form> -->