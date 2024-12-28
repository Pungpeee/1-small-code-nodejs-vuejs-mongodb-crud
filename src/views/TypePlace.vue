<template>
  <div class="placeType">
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        Place Type
      </p>

      <div class="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3">
        <ul v-for="item in placeType" :key="item.tp_id">
          <router-link :to="`/place/getPlace?tp_id=` + item.tp_id">
            <div class="flex justify-center">
              <img
                :src="
                  'https://www.loykrathong.tech/api/image/placeTypeImage/' +
                    item.tp_id
                "
                class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand "
              />
            </div>

            <div class="flex justify-center">
              <button
                class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
              >
                {{ item.tp_name }}
              </button>
            </div>
          </router-link>

          <!-- admin btn 
          <div v-if="!isUser" class="flex justify-center">
            <button
              class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
            >
              Edit
            </button>
          </div> -->
        </ul>
      </div>
    </content-layout>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      placeType: {
        tp_name: "",
        tp_image: "",
      },
    };
  },
  methods: {
    fetchPlaceType() {
      axios
        .get(`${process.env.VUE_APP_API}/placeType/getPlaceType`)
        .then((res) => {
          this.placeType = res.data.data;
        });
    },
  },
  mounted() {
    this.fetchPlaceType();
  },
};
</script>
