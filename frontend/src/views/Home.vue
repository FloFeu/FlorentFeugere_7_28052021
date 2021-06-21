<template>
  <div>
    <Navbar />
    <div class="home">
      <div class="home__infos">
        <h2>Bonjour {{ user.firstName }}</h2>
        <div class="create__post">
          <label for="post">Partagez vos pensées:</label>
          <textarea
            name="post"
            id="post"
            cols="30"
            rows="3"
            placeholder="Aujourd'hui il fait bien beau !"
            v-model="msg"
          ></textarea>
          <div
            v-if="previewImage"
            class="imagePreviewWrapper"
            :style="{ 'background-image': `url(${previewImage})` }"
            @click="selectImage"
          >
            <button @click="deleteFile">
              <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
            </button>
          </div>
          <div class="file">
            <label class="add__file" for="post__file">Ajouter un fichier</label>
            <input
              type="file"
              id="post__file"
              name="image"
              @change="onFileSelected"
            />
          </div>
          <button
            @click.prevent="onUpload"
            v-if="msg.length | (selectedFile !== null)"
          >
            <span v-if="status == 'loading'"> Envoi du post...</span>
            <span v-else-if="status == 'created'">
              Post créé avec succès !</span
            >
            <span v-else> Créer un post.</span>
          </button>
        </div>
      </div>
      <div class="home__main">
        <h1>Fil d'actualité</h1>
        <div class="line-break"></div>
        <div v-if="posts.length">
          <Post
            v-for="post in posts"
            :key="post.postId"
            :post="post"
            @refresh="refresh"
          />
        </div>
        <div v-else>
          <p class="home__main__warn">
            Il n'y a actuellement pas de publications. Créez-en donc une ! :)
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Navbar from "@/components/Navbar.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Post,
    Navbar,
  },
  data() {
    return {
      msg: "",
      selectedFile: null,
      previewImage: null,
    };
  },
  methods: {
    // Affichage du fichier sélectionné
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      console.log(this.selectedFile);
    },
    getPosts() {
      this.$store
        .dispatch("getPosts")
        .then(() => {
          this.posts = this.$store.state.posts;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getComments() {
      this.$store.dispatch("getAllComments");
    },
    // Envoi d'un post
    onUpload() {
      this.$store
        .dispatch("createPost", {
          selectedFile: this.selectedFile,
          msg: this.msg,
          userId: this.$store.state.userInfos.userId,
        })
        .then(() => {
          this.getPosts();
          return (
            (this.selectedFile = null),
            (this.msg = ""),
            (this.previewImage = null)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteFile() {
      return (this.selectedFile = null), (this.previewImage = null);
    },
    refresh() {
      this.getPosts();
    },
  },
  created() {
    this.$store
      .dispatch("getUserInfos")
      .then(() => {
        (this.user.firstName = this.$store.state.userInfos.firstName),
          (this.user.lastName = this.$store.state.userInfos.lastName);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(this.$store.state.userInfos);
    this.getPosts();
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
    ...mapState(["status"]),
    ...mapState(["posts"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.home {
  @include desktop {
    width: 600px;
    margin: auto;
  }
  margin: 1em;
  display: grid;
  grid-template:
    "nav"
    "main"
    "main";
  grid-template-columns: 4fr;
  grid-column-gap: 1em;
  &__infos {
    margin-top: 1em;
    grid-area: nav;
    background-color: $background;

    .create__post {
      margin: 1em 0;
      background-color: $surface;
      border: none;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      padding: 1em;
      label {
        margin-bottom: 10px;
      }
      textarea {
        border-radius: 15px;
        border: none;
        padding: 10px;
        resize: none;
        color: $white;
        background-color: $surface;
        font-size: 16px;
        &::placeholder {
          color: $primary-color;
          font-size: 16px;
        }
      }
      .imagePreviewWrapper {
        width: 250px;
        height: 250px;
        display: block;
        cursor: pointer;
        margin: 1em auto;
        background-size: cover;
        background-position: center center;
        position: relative;
        button {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .file {
        padding: 1em;
        text-align: center;
        .add__file {
          cursor: pointer;
          font-weight: 700;
          &:hover {
            color: $primary-color;
          }
        }
        #post__file {
          display: none;
        }
      }
      button {
        background-color: $background;
        padding: 0.4em;
        border-radius: 15px;
        border: none;
      }
    }
  }
  &__main {
    grid-area: main;
    height: 100%;
    background-color: $black;
    border-radius: 16px;
    color: $white;
    padding-bottom: 1em;
    .line-break {
      @include line-break;
    }
    h1 {
      padding: 0 1rem;
    }
    &__warn {
      margin: 2em;
      text-align: center;
    }
  }
}
</style>
