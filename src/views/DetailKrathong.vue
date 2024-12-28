<template>
  <div>
    <navBar-layout />
    <content-layout>
      <div
        class="flex flex-col items-center gap-10 px-4 laptop:flex-row laptop:justify-center tablet:p-10"
      >
        <div>
          <img
            :src="
              'https://www.loykrathong.tech/api/image/krathongImage/' +
                this.$route.params.kt_id
            "
            class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand "
          />
        </div>
        <div class="w-full px-5 py-10 tablet:w-3/5 bg-cloud rounded-3xl ">
          <div>
            <span class="font-bold">Name : </span> {{ krathong.kt_name }}
          </div>
          <div>
            <span class="font-bold">Type : </span> {{ krathong.kt_type.type }}
          </div>
          <div>
            <span class="font-bold">Detail : </span> {{ krathong.detail }}
          </div>
          <div class="flex flex-col items-center w-full">
            <div class="flex items-center w-full space-x-2">
              <label for="wish" class="font-bold">Wish: </label>
              <input
                type="text"
                v-model.trim="entered.wish"
                class="flex-grow min-w-0 px-2 py-1 rounded-3xl text-indigo"
              />
            </div>
            <p class="text-ash">wish limit at 200 char</p>
            <p v-if="invalid.wish" class="px-20 text-red-500">
              wish is Invalid !
            </p>
          </div>
          <div
            class="flex justify-around space-x-0 laptop:justify-end laptop:space-x-10"
          >
            <router-link to="/allKrathong">
              <button
                class="p-2 px-4 rounded-full tablet:px-10 text-indigo bg-coin hover:duration-300 hover:text-white hover:bg-rose"
              >
                Back
              </button>
            </router-link>
            <button
              class="p-2 px-4 rounded-full tablet:px-10 text-indigo bg-coin hover:duration-300 hover:text-white hover:bg-fern"
              @click="loy"
            >
              Loy
            </button>
          </div>
        </div>
      </div>
    </content-layout>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      krathong: {
        kt_name: null,
        amount: null,
        kt_image: null,
        detail: null,
        kt_type: {
          t_id: null,
          type: null,
        },
      },
      entered: {
        h_date: "",
        wish: "",
        kt_id: 0,
        user_id: 0,
        p_id: 0,
      },
      invalid: {
        wish: null,
      },
      kt_id: "",
    };
  },

  methods: {
    ...mapActions({
      setKrathongId: "krathong/setKrathongId",
      setWish: "krathong/setWish",
    }),
    fetchKrathong() {
      axios
        .get(
          `${process.env.VUE_APP_API}/krathong/getKrathong/${this.$route.params.kt_id}`
        )
        .then((res) => {
          this.krathong = res.data.data;
        });
    },
    loy() {
      if (this.entered.wish == "" || this.entered.wish.length > 200) {
        this.invalid.wish = true;
      } else {
        if (this.getRole == "") {
          this.setKrathongId(this.$route.params.kt_id);
          this.setWish(this.entered.wish);
          this.$router.push(`/floating`);
        } else {

          this.setKrathongId(this.$route.params.kt_id);
          this.setWish(this.entered.wish);
          this.$router.push("/placeType");
        }
      }
    },
  },
  mounted() {
    this.fetchKrathong();
  },
  computed: {
    ...mapState({
      getRole: (state) => state.signin.role,
    }),
  },
};
</script>
