<template>
  <div>
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        Admin : Krathong
      </p>

      <div class="flex mx-24 space-x-12" :style="{ minWidth: '850px' }">
        <div class="flex flex-col items-center w-2/5 space-y-3">
          <input
            class="hidden"
            type="file"
            id="kt_image"
            accept="image/*"
            @change="onFileChange"
            required
          />
          <img
            class="w-72 h-72 rounded-3xl"
            :style="{ backgroundColor: '#BBBBBB' }"
            :src="
              getImageUrl(entered.kt_image) ||
                `https://www.loykrathong.tech/api/image/krathongImage/${this.$route.params.kt_id}`
            "
            alt=""
          />
          <button
            class="px-8 py-2 text-white rounded-full"
            :style="{ backgroundColor: '#828282' }"
            @click="onClickImageReference"
          >
            Choose file
          </button>
        </div>

        <div class="w-3/5" v-if="!isLoading">
          <Form @submit="submit" v-slot="{ errors }">
            <div>
              <!-- add name  -->
              <div class="flex flex-col">
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Name(Krathong)
                </p>
                <Field
                  name="kt_name"
                  type="text"
                  v-model.trim="entered.kt_name"
                  :value="entered.kt_name"
                  rules="required"
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                />
                <p class="text-red-500">{{ errors.kt_name }}</p>
              </div>
              <div v-if="isTypeFixed">
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Type
                </p>
                <p class="py-2 px-6">{{ this.krathong.kt_type.type }}</p>
              </div>
              <!-- add type  -->
              <div v-else>
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Type
                </p>

                <Field
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                  name="type"
                  as="select"
                  v-model="entered.t_id"
                  rules="required"
                >
                  <option
                    v-for="type in kt_type"
                    :key="type.t_id"
                    :value="type.t_id"
                  >
                    {{ type.type }}
                  </option>
                </Field>
              </div>

              <!-- add amount  -->
              <div>
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Total
                </p>
                <Field
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                  name="total"
                  type="number"
                  v-model="entered.amount"
                  rules="required"
                />
              </div>
              <!-- add detail  -->
              <div class="flex flex-col">
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Detail
                </p>
                <Field
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                  name="detail"
                  as="textarea"
                  type="text"
                  v-model.trim="entered.detail"
                  rules="required"
                />
                <p class="text-red-500">{{ errors.detail }}</p>
              </div>

              <div class="flex justify-end">
                <button
                  class="p-2 m-3 text-white rounded-full bg-rose hover:duration-300 hover:text-rose hover:bg-white tablet:m-10 w-36"
                  @click="clear"
                >
                  Clear
                </button>

                <button
                  class="p-2 m-3 text-white rounded-full bg-fern hover:duration-300 hover:text-fern hover:bg-white tablet:m-10 w-36"
                >
                  <span v-if="this.$route.params.kt_id">Edit</span>
                  <span v-else>Create</span>
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </content-layout>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { Form, Field, defineRule } from "vee-validate";
defineRule("required", (value) => {
  if (!value) {
    return "This field is required ";
  }
  return true;
});
export default {
  data() {
    return {
      entered: {
        kt_name: "",
        amount: 1,
        kt_image: "",
        detail: "",
        t_id: 0,
      },
      kt_type: [],
      editedkrathong: [],
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
      isLoading: true,
      isTypeFixed: false,
    };
  },
  components: {
    Field,
    Form,
  },
  methods: {
    fetchType() {
      axios
        .get(`${process.env.VUE_APP_API}/krathongType/getType`)
        .then((res) => {
          // console.log(res.data);
          this.kt_type = res.data.data;
        });
    },
    fetchKrathong() {
      axios
        .get(
          `${process.env.VUE_APP_API}/krathong/getKrathong/${this.$route.params.kt_id}`
        )
        .then((res) => {
          // console.log(res);
          this.krathong = res.data.data;
          this.entered.kt_name = this.krathong.kt_name;
          this.entered.amount = Number(this.krathong.amount);
          this.entered.detail = this.krathong.detail;
          // this.entered.kt_image = this.krathong.kt_image;
          this.entered.t_id = this.krathong.kt_type.t_id;
          // console.log(this.krathong);
        });
    },
    clear() {
      // console.log("clear method");
      this.entered.kt_name = "";
      this.entered.amount = 0;
      this.entered.kt_image = "";
      this.entered.detail = "";
      this.entered.t_id = 0;
    },
    submit() {
      if (this.$route.params.kt_id) {
        this.editKrathong();
        console.log("edit method");
      } else {
        this.addKrathong();
      }
    },
    onFileChange(e) {
      this.entered.kt_image = e.target.files[0];
      // console.log(e.target.files[0]);
    },
    addKrathong() {
      let data = {
        kt_name: this.entered.kt_name,
        amount: Number(this.entered.amount),
        kt_image: this.entered.kt_image.name,
        detail: this.entered.detail,
        t_id: this.entered.t_id,
      };
      // console.log(data)

      let convertToJSON = JSON.stringify(data);
      const blob = new Blob([convertToJSON], {
        type: "application/json",
      });
      let formData = new FormData();

      formData.append(
        "image",
        this.entered.kt_image,
        this.entered.kt_image.name
      );
      formData.append("data", blob, "data.json");
      axios
        .post(
          "https://www.loykrathong.tech/api/krathong/addKrathong",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Add new Krathong successfully");
          this.$router.push("/homeAdmin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editKrathong() {
      let data = {
        kt_name: this.entered.kt_name,
        amount: Number(this.entered.amount),
        kt_image: this.entered.kt_image.name,
        detail: this.entered.detail,
        t_id: null,
      };

      let convertToJSON = JSON.stringify(data);
      const blob = new Blob([convertToJSON], {
        type: "application/json",
      });
      let formData = new FormData();
      if (this.entered.kt_image) {
        formData.append(
          "image",
          this.entered.kt_image,
          this.entered.kt_image.name
        );
      }

      formData.append("data", blob, "data.json");
      console.log(data);
      axios
        .put(
          `https://www.loykrathong.tech/api/krathong/editKrathong/${this.$route.params.kt_id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("edit complete");
            this.$router.push("/homeAdmin");
          } else {
            throw new Error("error to save data");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onClickImageReference() {
      document.getElementById("kt_image").click();
    },
    getImageUrl(file) {
      try {
        if (file !== "") {
          return URL.createObjectURL(file);
        }
        if (this.$route.params.kt_id) {
          return false;
        } else {
          let images = require.context("../assets/", false, /\.png$/);
          return images("./kt_thumbnail.png");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.isLoading = true;
    this.fetchType();
    if (this.$route.params.kt_id) {
      this.fetchKrathong();
      this.isTypeFixed = true;
    }
    this.isLoading = false;
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
