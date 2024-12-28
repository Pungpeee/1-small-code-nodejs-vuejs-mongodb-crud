<template>
  <div>
    <navBar-layout />
    <content-layout>
      <p
        class="text-ash tablet:text-4xl font-bold text-center  text-xl m-8 tablet:m-16"
      >
        Transaction Log <br />
      </p>
      <p v-if="!isUser" class="flex justify-center">
        This feature is not available with your role
      </p>

      <!-- content -->
      <div v-else class="px-10">
        <div>
          <!-- filter -->
          <div class=" flex justify-end  py-2">
            <button
              @click="toggleSort()"
              class="rounded-full bg-indigo text-offWhite px-4 py-2"
            >
              <span v-if="oldestFirst">Lastest</span>
              <span v-else>Earliest</span>
            </button>
          </div>

          <!-- log -->
          <div class="p-3 divide-y divide-indigo bg-coin rounded-2xl">
            <div
              v-for="item in history"
              :key="item.h_id"
              class="grid grid-cols-3 py-4 "
            >
              <div>
                <p>{{ formatDate(item.h_date) }}</p>
              </div>
              <div>
                <p class="text-center">{{ item.wish }}</p>
              </div>
              <div>
                <p class="text-right">{{ item.place?.p_name || "" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </content-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import * as dayjs from "dayjs";
export default {
  data() {
    return {
      sortSelected: "",
      history: {
        h_date: "",
        wish: "",
        kt_id: 0,
        p_id: 0,
      },
      oldestFirst: false,
      isUser:false,
    };
  },
  methods: {
    toggleSort() {
      this.oldestFirst = !this.oldestFirst;
      let isOldest = this.oldestFirst;
      this.history = this.history.sort(function(a, b) {
        a = new Date(a.h_date);
        b = new Date(b.h_date);
        if (!isOldest) {
          return a - b;
        } else {
          return b - a;
        }
      });
    },
    fetchHistory() {
      axios
        .get(
          `${process.env.VUE_APP_API}/history/getHistory/${this.$route.params.user_id}`
        )
        .then((res) => {
          this.history = res.data.data;
          console.log(this.history);
        });
    },
    formatDate(date) {
      return dayjs(date).format("MMMM D, YYYY h:mm A");
    },
  },
  computed: {
    ...mapState({
      getUserId: (state) => state.signin.user_id,
      getRole: (state) => state.signin.role
    }),
  },
  mounted() {
    this.fetchHistory();
    console.log(this.getRole)
    if (this.getRole ==1) {
      this.isUser = true;
    }
  },
};
</script>
