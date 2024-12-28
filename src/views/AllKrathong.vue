<template>
  <div class="allKrathong">
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        Krathong
      </p>

      <router-link
        to="/homeAdmin"
        v-if="!isUser"
        class="fixed bottom-4 right-6"
      >
        <div
          class="flex items-center justify-center w-24 h-24 bg-white rounded-full text-8xl"
          :style="{ color: '#748CA3' }"
        >
          +
        </div>
      </router-link>

      <!-- user ui  -->
      <div
        v-if="isUser"
        class="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3"
      >
        <ul v-for="item in ktImage" :key="item.kt_id">
          <router-link :to="`/krathong/${item.kt_id}`">
            <div class="flex justify-center">
              <img
                :src="
                  'https://www.loykrathong.tech/api/image/krathongImage/' +
                    item.kt_id
                "
                class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand"
              />
            </div>

            <div v-if="isUser" class="flex justify-center">
              <button
                class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
              >
                Choose
              </button>
            </div>
          </router-link>
        </ul>
      </div>

      <!-- admin ui  -->
      <div
        v-if="!isUser"
        class="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3"
      >
        <ul v-for="item in ktImage" :key="item.kt_id">
          <router-link :to="`/editKrathong/${item.kt_id}`">
            <div class="flex justify-center">
              <img
                :src="
                  'https://www.loykrathong.tech/api/image/krathongImage/' +
                    item.kt_id
                "
                class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand"
              />
            </div>
            <div v-if="!isUser" class="flex justify-center">
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      ktImage: [],
      isUser: true,
      KrathongId: 0,
    };
  },
  methods: {
    //   ...mapMutations({
    //   setRole: "signin/setRole",
    // }),
    fetchKrathongImage() {
      axios
        .get(`${process.env.VUE_APP_API}/Krathong/getkrathong`)
        .then((res) => {
          this.ktImage = res.data.data;
          // console.log("fetchImage");
        });
    },
    checkUser() {
      if (this.getRole == 2) {
        this.isUser = false;
      } else {
        this.isUser = true;
      }
    },
  },
  mounted() {
    this.fetchKrathongImage();
    this.checkUser();
  },
  computed: {
    ...mapState({
      getRole: (state) => state.signin.role,
    }),
  },
};
</script>
