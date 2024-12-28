<template>
  <div>
    <navBar-layout />
    <content-layout>
      <p
        class="m-8 text-xl font-bold text-center text-ash tablet:text-4xl tablet:m-16"
      >
        Admin : Place
      </p>
      <div class="flex mx-24 space-x-12" :style="{ minWidth: '850px' }">
        <div class="flex flex-col items-center w-2/5 space-y-3">
          <input
            class="hidden"
            type="file"
            id="p_image"
            accept="image/*"
            @change="onFileChange"
            required
          />

          <img
            class="w-72 h-72 rounded-3xl"
            :style="{ backgroundColor: '#BBBBBB' }"
            :src="
              getImageUrl(entered.p_image) ||
                `https://www.loykrathong.tech/api/image/placeImage/${this.$route.params.p_id}`
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
            <!-- add name  -->

            <div>
              <div class="flex flex-col">
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Name
                </p>
                <Field
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                  name="p_name"
                  type="text"
                  v-model.trim="entered.p_name"
                  rules="required"
                />
                <p class="text-red-500">{{ errors.p_name }}</p>
              </div>
              <div v-if="isTypeFixed">
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Type
                </p>
                <p class="py-2 px-6">{{ this.place.place_type.tp_name }}</p>
              </div>
              <!-- add type  -->
              <div v-else>
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Type
                </p>
                <Field
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                  name="tp_id"
                  as="select"
                  v-model="entered.tp_id"
                  rules="required"
                >
                  <option
                    v-for="type in typePlace"
                    :key="type.tp_id"
                    :value="type.tp_id"
                  >
                    {{ type.tp_name }}
                  </option>
                </Field>
                <p class="text-red-500">{{ errors.tp_id }}</p>
              </div>
              <!-- add detail  -->
              <div class="flex flex-col">
                <p class="text-xl font-semibold" :style="{ color: '#4D506C' }">
                  Detail
                </p>
                <Field
                  as="textarea"
                  class="px-6 py-2 border border-black rounded-full focus:outline-none"
                  name="detail"
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
                  <span v-if="this.$route.params.p_id">Edit</span>
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
        p_name: "",
        p_image: "",
        detail: "",
        tp_id: 0,
      },
      place: {
        p_name: "",
        p_image: "",
        detail: "",
        place_type: {
          tp_id: "",
          tp_name: "",
          tp_image: "",
        },
      },
      typePlace: [],
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
        .get(`${process.env.VUE_APP_API}/placeType/getPlaceType`)
        .then((res) => {
          this.typePlace = res.data.data;
          // console.log(this.typePlace)
        });
    },
    fetchPlace() {
      axios
        .get(
          `${process.env.VUE_APP_API}/place/getPlace/${this.$route.params.p_id}`
        )
        .then((res) => {
          // console.log(res);
          this.place = res.data.data;
          this.entered.p_name = this.place.p_name;
          this.entered.detail = this.place.detail;
          this.entered.tp_id = this.place.tp_id;
          // console.log(this.place);
        });
    },
    submit() {
      if (this.$route.params.p_id) {
        this.editPlace();
      } else {
        this.addPlace();
      }
    },
    addPlace() {
      let data = {
        p_name: this.entered.p_name,
        p_image: this.entered.p_image.name,
        detail: this.entered.detail,
        tp_id: this.entered.tp_id,
      };

      let convertToJSON = JSON.stringify(data);
      const blob = new Blob([convertToJSON], {
        type: "application/json",
      });
      let formData = new FormData();

      formData.append("image", this.entered.p_image, this.entered.p_image.name);
      formData.append("data", blob, "data.json");
      axios
        .post("https://www.loykrathong.tech/api/place/addPlace", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          alert("Add new Place successfully");
          this.$router.push("/homeAdmin");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editPlace() {
      let data = {
        p_name: this.entered.p_name,
        p_image: this.entered.p_image.name,
        detail: this.entered.detail,
        tp_id: this.entered.tp_id,
      };

      let convertToJSON = JSON.stringify(data);
      const blob = new Blob([convertToJSON], {
        type: "application/json",
      });
      let formData = new FormData();
      if (this.entered.p_image) {
        formData.append(
          "image",
          this.entered.p_image,
          this.entered.p_image.name
        );
      }
      formData.append("data", blob, "data.json");
      axios
        .put(
          `https://www.loykrathong.tech/api/place/editPlace/${this.$route.params.p_id}`,
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
      document.getElementById("p_image").click();
    },
    getImageUrl(file) {
      try {
        if (file !== "") {
          return URL.createObjectURL(file);
        }
        if (this.$route.params.p_id) {
          return false;
        } else {
          let images = require.context("../assets/", false, /\.png$/);
          return images("./kt_thumbnail.png");
        }
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange(e) {
      this.entered.p_image = e.target.files[0];
      console.log(e.target.files[0]);
    },
  },
  mounted() {
    this.isLoading = true;
    this.fetchType();
    if (this.$route.params.p_id) {
      this.fetchPlace();
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
