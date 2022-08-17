<template>
    <form @submit.prevent="handleSubmit()" class="house-form">
        <h3 class="text-primary">List Your House</h3>
        <div class="row">
            <div class="col-4">
                <label class="form-label" for="style">Style</label>
                <input class="form-control" type="text" minlength="3" maxlength="30" id="style" name="style"
                    v-model="editable.make">
            </div>
            <div class="col-4">
                <label class="form-label" for="bdrm">Bedroom</label>
                <input class="form-control" type="number" id="bdrm" name="bdrm" v-model="editable.make">
            </div>
            <div class="col-4">
                <label class="form-label" for="bath">Bath</label>
                <input class="form-control" type="number" id="bath" name="bath" v-model="editable.make">
            </div>
            <div class="col-4">
                <label class="form-label" for="price">Price</label>
                <input class="form-control" type="number" min="1" id="price" name="price" v-model="editable.make">
            </div>
            <div class="col-8">
                <label class="form-label" for="img">Image</label>
                <input class="form-control" type="text" id="img" name="img" v-model="editable.make">
            </div>
            <div class="col-12">
                <label class="form-label" for="description">Description</label>
                <textarea class="w-100 form-control" name="description" id="description" rows="5"
                    v-model="editable.make"></textarea>
                <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light">Submit</button>
            </div>
        </div>
    </form>
</template >
    
<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { housesService } from '../services/HousesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';




export default {
    setup() {
        const editable = ref({})
        watchEffect(() => {
            if (!AppState.activeHouse) { return }
            editable.value = { ...AppState.activeHouse }
        })
        return {
            editable,
            async handleSubmit() {
                try {
                    if (editable.value.id) {
                        housesService.editHouse(editable.value)
                    } else {
                        housesService.createHouse(editable.value)
                    }
                    editable.value = {}
                } catch (error) {
                    logger.error('[Creating or editing house]', error)
                    Pop.error(error)
                }
            }
        };
    },
};
</script>
    





<style lang="scss" scoped>
</style>