<template>
  <div class="place">
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        Place
      </p>

      <div class="grid w-full grid-cols-1 gap-10 laptop:grid-cols-3">
        <ul
          v-for="item in place"
          :key="item.p_name"
          class="flex justify-center"
        >
          <button @click="loy(item.p_id)">
            <div class="flex justify-center">
              <img
                :src="
                  'https://www.loykrathong.tech/api/image/placeImage/' +
                    item.p_id
                "
                class="object-contain w-64 h-64 p-2 rounded-full tablet:w-80 tablet:h-80 bg-sand "
              />
            </div>

            <div class="flex justify-center">
              <button
                class="p-2 m-10 rounded-full bg-cloud text-indigo hover:duration-300 hover:text-cloud hover:bg-indigo w-36"
              >
                {{ item.p_name }}
              </button>
            </div>
          </button>
        </ul>
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
      entered: {
        h_date: "",
        wish: "",
        kt_id: 0,
        user_id: 0,
        p_id: 0,
      },
      place: [],
    };
  },
  methods: {
    ...mapActions({
      setTypePlace: "krathong/setTypePlace",
      setPlace: "krathong/setPlace",
    }),
    fetchPlace() {
      axios.get(`${process.env.VUE_APP_API}/place/getPlace`).then((res) => {
        this.place = res.data.data.filter(
          (place) => place.tp_id == this.$route.query.tp_id
        );
      });
    },
    loy(p_id) {
      this.setPlace(p_id);
      let h_date = new Date();
      this.entered.h_date = h_date;
      this.entered.wish = this.getWish;
      this.entered.kt_id = Number(this.getKrathongId);
      this.entered.user_id = Number(this.getUserId);
      this.entered.p_id = Number(this.getPlaceId);
      console.log(this.entered);
      console.log(this.getUserId);
      console.log(this.getPlaceId);
      axios
        .post(`${process.env.VUE_APP_API}/history/addHistory`, this.entered)
        .then((res) => {
          console.log("in axios method"+res.data);
          this.setTypePlace(this.$route.query.tp_id);
          this.$router.push(`/floating`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapState({
      getUserId: (state) => state.signin.user_id,
      getWish: (state) => state.krathong.wish,
      getKrathongId: (state) => state.krathong.kt_id,
      getPlaceId: (state) => state.krathong.p_id,
    }),
  },
  mounted() {
    this.fetchPlace();
  },
};
</script>
