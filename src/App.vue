<template>
  <div id="app" class="py-5 desktop:text-xl text-l">
    <router-view />
  </div>
</template>
<style>
@import "https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css";
body {
  background-color: #4d506c;
}

#app {
  font-family: "prompt", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
<script>
import axios from 'axios';
import { mapActions } from "vuex";


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
  methods: {
    ...mapActions({
      setRole: "signin/setRole",
      setUserId: "signin/setUserId",
    }),
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
  mounted() {
    this.checkToken();
    console.log(this.getUserId);
  },
};
</script>
