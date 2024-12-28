<template>
  <div id="member" class="w-full">
    <navBar-layout />
    <content-layout>
      <p
        class="text-ash tablet:text-4xl font-bold text-center  text-xl m-8 tablet:m-16"
      >
        Member
      </p>

      <div class="  laptop:flex laptop:justify-between laptop:gap-5 m-10 ">
        <!-- dear -->
        <div class="laptop:w-1/3">
          <div class="flex justify-center ">
            <img src="../assets/member/dear.jpg" class="rounded-3xl w-64 " />
          </div>

          <div
            class="text-white bg-indigo rounded-full text-center p-1 tablet:mx-32 laptop:mx-0  my-5"
          >
            <p class="leading-tight desktop:text-2xl">Yanika Putorn</p>
            <p class="leading-tight">62130500020</p>
            <p class="leading-tight">Back-end, Database</p>
          </div>
        </div>
        <!-- pond -->
        <div class="laptop:w-1/3">
          <div class="flex justify-center ">
            <img src="../assets/member/pond.jpg" class="rounded-3xl w-64 " />
          </div>

          <div
            class="text-white bg-indigo rounded-full text-center p-1 tablet:mx-32 laptop:mx-0 my-5"
          >
            <p class="leading-tight desktop:text-2xl ">Wanisara Khamracha</p>
            <p class="leading-tight">62130500079</p>
            <p class="leading-tight">DevOps</p>
          </div>
        </div>
        <!-- nurse -->
        <div class="laptop:w-1/3">
          <div class="flex justify-center ">
            <img src="../assets/member/nurse.jpg" class="rounded-3xl w-64 " />
          </div>

          <div
            class="text-white bg-indigo rounded-full text-center p-1 tablet:mx-32 laptop:mx-0 my-5"
          >
            <p class="leading-tight desktop:text-2xl">Warathaya Rattachai</p>
            <p class="leading-tight">62130500083</p>
            <p class="leading-tight">Front-end</p>
          </div>
        </div>
      </div>
    </content-layout>
  </div>
</template>

// <script>
// import { mapActions, mapMutations, mapState } from "vuex";
// export default {
//   computed: {
//     ...mapState({
//       countSignin: (state) => state.signin.count,
//     }),
//   },

//   methods: {
//     ...mapActions({
//       incrementsignin:"signin/incrementby5",
//       decrementsignin:"signin/decrementby5",
//     }),

//     ...mapMutations("signin", ["increment", "decrement"])
//   },

//   mounted() {
//     console.log(this.countSignin);
//     console.log(this.$store.state.member.count);
//     this.incrementsignin();
//     this.$store.dispatch("member/incrementby5");

//     this.increment(2)
//     console.log("by5 " + this.$store.state.signin.count);
//     console.log("Mb" + this.$store.state.member.count);
//   },
// };
// </script>
