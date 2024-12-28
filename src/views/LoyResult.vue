<template>
  <div>
    <navBar-layout />
    <div class="relative w-full mx-auto tablet:w-4/5">
      <img :src="`${getImageUrl(getTypePlace)}`" class="z-0 w-full px-7" />

      <div
        class="absolute z-40 flex justify-end tablet:bottom-4 tablet:right-16 right-12 -bottom-12"
      >
        <router-link
          to="/"
          class="px-6 py-1 rounded-full tablet:py-1 tablet:px-10 text-indigo bg-coin hover:duration-300 hover:text-silver hover:bg-white"
        >
          Exit
        </router-link>
      </div>
      <div class="absolute bottom-0 w-full px-7">
        <marquee class="pt-16" truespeed="180">
          <div class="relative z-10 w-max animate-floating-sm tablet:animate-floating">
            <div class="flex justify-center">
              <img
                :src="
                  'https://www.loykrathong.tech/api/image/krathongImage/' +
                    this.getKrathongId
                "
                class="w-32 laptop:w-96 tablet:w-64 "
              />
            </div>
            <p
              class="absolute flex justify-center w-2/3 p-1 text-xs truncate rounded-lg laptop:text-base tablet:text-sm bg-lemon text-indigo laptop:p-5 tablet:py-2 tablet:right-4 tablet:bottom-4 right-2 bottom-2"
            >
              {{ this.getWish }}
            </p>
          </div>
        </marquee>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isUser: true,
      ktImage: [],
    };
  },
  methods: {
    fetchKrathong() {
      axios
        .get(
          `${process.env.VUE_APP_API}/krathong/getKrathong/${this.getKrathongId}`
          // console.log(this.$route.params.kt_id)
        )
        .then((res) => {
          this.ktImage = res.data.data;
        });
    },
    getImageUrl(typeId) {
      if (typeId) {
        let images = require.context("../assets/", false, /\.gif$/);
        return images("./bg" + typeId + ".gif");
      } else {
        let images = require.context("../assets/", false, /\.png$/);
        return images("./bg0.png");
      }
    },
  },
  computed: {
    ...mapState({
      getWish: (state) => state.krathong.wish,
      getKrathongId: (state) => state.krathong.kt_id,
      getTypePlace: (state) => state.krathong.tp_id,
    }),
  },
  mounted() {
    this.fetchKrathong();
    console.log(this.getTypePlace);
    console.log(this.getWish);
    console.log(this.getKrathongId);
  },
};
</script>
