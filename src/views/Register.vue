<template>
  <div class="register">
    <content-layout class="tablet:m-16 m-2 mt-10">
      <div class="relative">
        <p class="text-ash tablet:text-4xl font-bold text-center">Register</p>
      </div>

      <!-- input part -->
      <Form @submit="submit" v-slot="{ errors }">
        <div class="laptop:grid laptop:grid-cols-2 laptop:gap-x-14 tablet:px-24 px-5 ">
          <!-- firstName -->
          <div>
            <label for="fname">First name</label><br />
            <Field
              name="fname"
              type="text"
              v-model.trim="entered.fname"
              class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
              rules="required"
            />
            <p class="text-red-500">
              {{ errors.fname }}
            </p>
          </div>

          <!-- lastName -->
          <div>
            <label for="lname">Last name</label><br />
            <Field
              name="lname"
              type="text"
              v-model.trim="entered.lname"
              class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
              rules="required"
            />
            <p class="text-red-500">
              {{ errors.lname }}
            </p>
          </div>

          <!-- email -->
          <div>
            <label for="email">Email</label><br />
            <Field
              name="email"
              type="email"
              v-model.trim="entered.email"
              class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
              rules="required|email"
            />
            <p class="text-red-500">
              {{ errors.email }}
            </p>
          </div>

          <!-- country -->
          <div>
            <label for="country">Country</label><br />
            <Field
              name="country"
              as="select"
              v-model="entered.ct_id"
              class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
              rules="required"
            >
              <option :value="0"></option>
              <option
                v-for="item in country"
                :key="item.ct_id"
                :value="item.ct_id"
                >{{ item.country }}</option
              >
            </Field>
            <p class="text-red-500">
              {{ errors.country }}
            </p>
          </div>

          <!-- admin role  -->
          <!-- phone number -->

          <!-- <div v-if="!isUser">
          <label for="phoneNumber">Phone number</label><br />
          <input
            type="number"
            v-model.trim="entered.phoneNumber"
            class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
          />
          <p v-if="invalid.phoneNumber" class="text-red-500">
            Please enter phone number !
          </p>
        </div>
         ID card 
        <div v-if="!isUser">
          <label for="idCard">Id card</label><br />
          <input
            type="number"
            v-model.trim="entered.idCard"
            class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
          />
          <p v-if="invalid.idCard" class="text-red-500">
            Please enter ID card!
          </p>
        </div> -->

          <!-- end admin role -->

          <!-- username -->
          <div>
            <label for="username">Username</label><br />
            <Field
              name="username"
              type="text"
              v-model.trim="entered.username"
              class="w-full rounded-full border border-black focus:outline-none px-2 h-9 "
              rules="required"
            />
            <p class="text-red-500">
              {{ errors.username }}
            </p>
            <p v-if="isUsernameRepeat" class="text-red-500">
              This username already exists.Please use a new username
            </p>
          </div>

          <!-- password -->
          <div>
            <label for="password">Password</label><br />
            <Field
              name="password"
              type="password"
              v-model.trim="entered.password"
              class="w-full rounded-full border border-black focus:outline-none px-2 h-9"
              rules="min_12|upper_letter|required"
            />
            <p class="text-gray-400 tablet:text-sm text-xs px-5">
              Minimum length 12 characters and contain 1 uppercase letter
            </p>
            <p class="text-red-500">
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="flex justify-center">
          <button
            class=" bg-rose rounded-full hover:duration-300 hover:text-rose hover:bg-white p-2 tablet:m-10 m-3 w-36 text-white "
          >
            <router-link to="/signin">
              Cancel
            </router-link>
          </button>

          <button
            class=" bg-fern rounded-full hover:duration-300 hover:text-fern hover:bg-white p-2 tablet:m-10 m-3 w-36 text-white"
          >
            Confirm
          </button>
        </div>
      </Form>
    </content-layout>
  </div>
</template>
<script>
import axios from "axios";
import { Form, Field, defineRule } from "vee-validate";
defineRule("min_12", (value) => {
  if (value.length < 12) {
    return "This password is Invalid";
  }
  return true;
});
defineRule("upper_letter", (value) => {
  if (!/(?=.*[A-Z])/.test(value)) {
    return "This password is Invalid ";
  }
  return true;
});
defineRule("required", (value) => {

  if (!value) {
    return "This field is required ";
  }

  return true;
});
defineRule("email", (value) => {
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return "This field must be a valid email ";
  }

  return true;
});
export default {
  components: {
    Field,
    Form,
  },
  data() {
    return {
      entered: {
        fname: "",
        lname: "",
        email: "",
        ct_id: 0,
        // phoneNumber: "",
        // idCard: "",
        username: "",
        password: "",
        role_id: 1,
      },
      // invalid: {
      //   fname: false,
      //   lname: false,
      //   email: false,
      //   ct_id: false,
      //   // phoneNumber: false,
      //   // idCard: false,
      //   username: false,
      //   password: false,
      // },
      // isValid: false,
      isUsernameRepeat: false,
      country: [],
    };
  },

  methods: {
    // changeRole() {
    //   if (!this.isUser) {
    //     this.isUser = true;
    //     console.log("if " + this.isUser);
    //   } else {
    //     this.isUser = false;
    //     console.log("else " + this.isUser);
    //   }
    // },
    submit() {
      // this.isValid = true;
      // for (const [, value] of Object.entries(this.invalid)) {
      //   if (value) {
      //     this.isValid = false;
      //   }
      // }
        axios
          .post(`${process.env.VUE_APP_API}/person/register`, this.entered)
          .then((res) => {
            console.log(res.data);
            alert("Register successfully");
            this.$router.push("/signin");
          })
          .catch((err) => {
            if (err.response.status == 403) {
              this.isUsernameRepeat = true;
            } else {
              console.log(err);
            }
          });
      
    },
    fetchCountry() {
      axios.get(`${process.env.VUE_APP_API}/country/getCountry`).then((res) => {
        // console.log(res.data);
        this.country = res.data.data;
      });
    },
  },
  mounted() {
    this.fetchCountry();
  },
  updated() {
    console.log(this.country.ct_id);
  },
};
</script>
