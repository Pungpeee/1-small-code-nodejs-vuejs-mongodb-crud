<template>
  <div>
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        ADMIN
      </p>
      <div class="grid w-full grid-cols-1 gap-10 laptop:grid-cols-2">
        <div>
          <div class="flex justify-center">
            <img
              src="../assets/krathong/kt1.png"
              class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand"
            />
          </div>

          <div class="flex justify-center">
            <router-link to="/addKrathong"
              class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
            >
              Add Krathong
            </router-link>
            <router-link to="/allKrathong"
              class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
            >
              Edit Krathong
            </router-link>
          </div>
        </div>
        <div>
          <div class="flex justify-center">
            <img
              src="../assets/location/park.png"
              class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand"
            />
          </div>
          <div class="flex justify-center">
            <router-link to="/addPlace"
              class="p-2 m-10 mx-a rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
            >
              Add Place
            </router-link>
            <router-link to="/allPlace"
              class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
            >
              Edit Place
            </router-link>
          </div>
        </div>
      </div>
    </content-layout>
  </div>
</template>
<script>
import {  mapState } from "vuex";
export default {
 mounted() {
    if (this.getRole != 2) {
        this.$router.push(`/`);
      }
 },
 computed: {
    ...mapState({
      getRole: (state) => state.signin.role,
    }),
  },
};
</script>
