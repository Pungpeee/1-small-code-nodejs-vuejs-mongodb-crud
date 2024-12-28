<template>
  <div class="allPlace">
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        Place
      </p>

      <!-- admin ui  -->
       <div  class="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3">
        <ul v-for="item in place" :key="item.p_id">
          <router-link :to="`/editPlace/${item.p_id}`">
            <div class="flex justify-center">
              <img
                :src="
                  'https://www.loykrathong.tech/api/image/placeImage/' +
                    item.p_id
                "
                class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand"
              />
            </div>   
          <div class="flex justify-center">
            <button
              class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
            >
              Edit
            </button>
          </div>
      </router-link>  
        </ul>
      </div>
    </content-layout>
  </div>
</template>
<script>
import axios from "axios";
// import {  mapMutations } from "vuex";
import {  mapState } from "vuex";

export default {
  data() {
    return {
      place: [],
      isUser: true,
      KrathongId: 0,
    };
  },
  methods: {
    //   ...mapMutations({
    //   setRole: "signin/setRole",
    // }),
    fetchPlace() {
      axios
        .get(`${process.env.VUE_APP_API}/place/getPlace`)
        .then((res) => {
          this.place = res.data.data;
          console.log("fetchImage");
        });
    },

  },
  mounted() {
    this.fetchPlace();
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
