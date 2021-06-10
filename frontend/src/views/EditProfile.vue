<template>
  <div>
    <div class="editProfile">
      <Nav_second @update="modifyProfile" />
    </div>
    <div class="profile__top editProfile__top">
      <div>
        <label for="edit__file" class="editProfile__top__file">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            alt="avatar"
            class="profile__top__img editProfile__top__file__img"
          />
          <div
            v-else-if="previewImage"
            :style="{
              'background-image': `url(${previewImage})`,
              'background-size': '100px',
            }"
            alt="avatar"
            class="profile__top__img editProfile__top__file__img"
          ></div>
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
        <p>Prénom</p>
        <input type="text" v-model="firstName" />
      </div>
      <div>
        <p>Bio</p>
        <input type="text" v-model="bio" />
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
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.editProfile {
  &__header {
    height: 4em;
    display: flex;
    justify-content: space-between;
    padding-right: 1em;
    button {
      background-color: $primary-color;
      border: none;
      border-radius: 25px;
      color: $white;
      font-weight: 700;
      padding: 0.7em 2em;
      &:active {
        transform: scale(0.9);
        color: lightgray;
      }
    }
  }
  &__top {
    &__file {
      position: relative;
      &__labelImg {
        position: absolute;
        left: 52px;
        top: -50px;
        opacity: 0.5;
        path {
          fill: $surface;
        }
      }
      &__img {
        margin-top: -1em;
      }
    }
    #edit__file {
    }
  }
  &__fields {
    div {
      border: 1px solid lighten($background, 25%);
      padding: 1em;
      margin: 1em 1em 2em 1em;
      background-color: $background;
      p {
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
  }
}
#edit__file {
  display: none;
}
input {
  color: black;
}
.edit__file__labelImg {
}
</style>
