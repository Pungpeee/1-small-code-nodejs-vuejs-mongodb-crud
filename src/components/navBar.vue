<template>
  <div id="nav" class="laptop:contents hidden ">
    <!-- navbar -->
    <div
      class="flex flex-row items-center laptop:divide-x laptop:divide-gray-300 laptop:px-10"
    >
      <router-link to="/">
        <img
          src="@/assets/logo.png"
          class="h-32 tablet:h-40 desktop:h-52 desktop:mr-5 "
        />
      </router-link>
      <div
        class="flex flex-row justify-around w-full laptop:ml-5 items-center h-32"
      >
        <router-link
          :to="item.route"
          class="text-indigo bg-coin rounded-full hover:duration-300 hover:bg-white w-10 tablet:w-24  desktop:w-36 px-4 py-2 text-center"
          @click="dropDown"
          v-for="(item, index) in route"
          :key="index"
        >
          {{ item.name }}
        </router-link>
        <router-link
          to="/signin"
          v-if="getRole == ''"
          class="text-indigo rounded-full hover:duration-300  hover:bg-white w-10 tablet:w-24  desktop:w-36 px-4 py-2 text-center bg-lemon "
        >
          Sign In
        </router-link>
        <button
          @click="signOut"
          v-else
          class="text-indigo rounded-full hover:duration-300  hover:bg-white w-10 tablet:w-24  desktop:w-36 px-4 py-2 text-center bg-lemon "
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>

  <!-- responsive -->
  <div class="laptop:hidden flex justify-between  mx-5">
    <div
      class="fixed w-screen h-screen left-0 top-0 bg-black opacity-50 "
      v-if="isDropDown"
      @click="dropDown"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    />
    <img
      src="@/assets/logo.png"
      class="h-32 tablet:h-40 desktop:h-52 desktop:mr-5 "
    />

    <div class="flex items-center " style="color:#C4C4C4">
      <img v-if="!isDropDown" @click="dropDown" src="../assets/navBar.png" class="w-6 tablet:w-10"/>
 
      <div v-else class="relative">
        <!-- <i class="fi-rr-cross" @click="dropDown" /> -->
        <div
          class="-left-44 absolute flex flex-col w-32 tablet:w-56 tablet:-left-72 px-2 py-3 text-center rounded-3xl  divide-y divide-offWhite
          bg-cloud text-indigo "
        >
          <router-link
            :to="item.route"
            class="focus:bg-silver"
            @click="dropDown"
            v-for="(item, index) in route"
            :key="index"
          >
            {{ item.name }}
          </router-link>
          <router-link
            v-if="getRole == ''"
            to="/signin"
            class="focus:bg-silver"
          >
            Sign In
          </router-link>

          <button v-else @click="signOut" class="focus:bg-silver">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export default {
  data() {
    return {
      isDropDown: false,
      route: [
        { name: "Home", route: "/" },
        { name: "Krathong", route: "/allKrathong" },
        { name: "History", route: `/history/${this.getUserId}` },
        { name: "About us", route: "/member" },
      ],
    };
  },
  methods: {
    ...mapActions({
      setRole: "signin/setRole",
      setUserId:"signin/setUserId"
    }),
    dropDown() {
      if (!this.isDropDown) {
        this.isDropDown = true;
      } else {
        this.isDropDown = false;
      }
      // console.log("Drop down status : " + this.isDropDown);
    },
    signOut() {
      axios
        .delete(`${process.env.VUE_APP_API}/person/signout`, {
          data: { token: getCookie("token") },
        })
        .then(() => {
          this.setRole("");
          this.$router.push("/");
          // console.log("signOut method");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkToken() {
      axios
        .get(`${process.env.VUE_APP_API}/token/check`, {
          headers: { "pj-token": getCookie("token") },
        })
        .then((res) => {
          this.setUserId(res.data.user.user_id);
          this.setRole(res.data.user.role_id);
        });
    },
  },
  computed: {
    ...mapState({
      getRole: (state) => state.signin.role,
      getUserId: (state) => state.signin.user_id,
    }),
  },
  mounted() {
    this.checkToken();
    this.route[2].route = `/history/${this.getUserId}`;
    console.log(this.getUserId);
  },
};
</script>
