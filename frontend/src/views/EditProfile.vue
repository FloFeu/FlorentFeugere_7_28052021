<template>
  <div>
    <div class="editProfile">
      <Nav_second @update="modifyProfile" />
    </div>
    <div class="wrapper">
      <div class="profile__top editProfile__top">
        <div>
          <label for="edit__file" class="editProfile__top__file">
            <div v-if="!previewImage">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                alt="avatar"
                class="profile__top__img editProfile__top__file__img"
              />

              <img
                v-else
                src="@/assets/img/icon.png"
                alt="avatar"
                class="profile__top__img editProfile__top__file__img"
              />
              <span>
                <font-awesome-icon
                  class="icon editProfile__top__file__labelImg"
                  size="2x"
                  :icon="['fas', 'plus']"
              /></span>
            </div>
            <div
              v-else
              :style="{
                'background-image': `url(${previewImage})`,
                'background-size': '100px',
              }"
              class="profile__top__img editProfile__top__file__img"
            ></div>
          </label>
          <input
            type="file"
            name="edit__file"
            id="edit__file"
            @change="onFileSelected"
          />
        </div>
      </div>
      <div class="editProfile__fields">
        <div>
          <label for="firstName">Prénom</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div>
          <label for="bio">Bio</label>
          <input type="text" id="bio" v-model="bio" />
        </div>
        <span class="line-break"></span>
      </div>
      <div class="editProfile__delete">
        <button class="editProfile__delete__btn" @click="deleteValidation">
          Suppression du compte
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Nav_second from "@/components/Nav_second.vue";
import { mapState } from "vuex";

export default {
  name: "EditProfile",
  data() {
    return {
      selectedAvatar: this.$store.state.userInfos.avatar,
      firstName: this.$store.state.userInfos.firstName,
      bio: this.$store.state.userInfos.bio,
      previewImage: null,
    };
  },
  components: {
    Nav_second,
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  created() {
    console.log(this.user);
  },
  methods: {
    onFileSelected(event) {
      this.selectedAvatar = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedAvatar);
      console.log(this.selectedAvatar);
      console.log(this.previewImage);
    },
    modifyProfile() {
      let editData = {};
      if (this.previewImage != null) {
        (editData.selectedAvatar = this.selectedAvatar),
          (editData.firstName = this.firstName),
          (editData.bio = this.bio),
          (editData.currentAvatar = this.user.avatar);
      } else {
        (editData.firstName = this.firstName),
          (editData.bio = this.bio),
          (editData.currentAvatar = this.user.avatar);
      }

      this.$store
        .dispatch("modifyProfile", editData)
        .then((response) => {
          console.log(response);
          this.$router.push({
            name: "Profile",
            params: { id: this.$store.state.userInfos.userId },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteValidation() {
      let result = confirm(
        "Êtes-vous sûrs de vouloir supprimer votre compte ?"
      );
      if (result) {
        this.$store
          .dispatch("deleteProfile", this.user.userId)
          .then((response) => {
            console.log(response);
            this.$store.commit("logOut");
            this.$router.push({ name: "Login" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.wrapper {
  @include desktop {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    background-color: $black;
    padding-bottom: 1em;
    border-radius: 0 0 15px 15px;
  }
}
.editProfile {
  &__top {
    &__file {
      position: relative;
      &__labelImg {
        position: absolute;
        top: 20px;
        left: 50px;
        path {
          fill: $surface;
        }
      }
      &__img {
        margin-top: -1em;
      }
    }
    #edit__file {
      display: none;
    }
  }
  &__fields {
    div {
      border: 1px solid lighten($background, 25%);
      padding: 1em;
      margin: 1em 1em 2em 1em;
      background-color: $background;
      label {
        color: gray;
      }
      input {
        margin-top: 1em;
        width: 100%;
        background-color: $background;
        border: none;
        color: $white;
      }
    }
    .line-break {
      @include line-break;
    }
  }
  &__delete {
    display: flex;
    justify-content: center;
    align-items: center;
    &__btn {
      border: none;
      border-radius: 25px;
      background-color: $error;
      padding: 0.7em 2em;
    }
  }
}
</style>
