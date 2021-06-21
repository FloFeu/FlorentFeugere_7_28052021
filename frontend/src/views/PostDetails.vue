<template>
  <div>
    <Nav_second />

    <div class="postDetails">
      <div>
        <router-link
          class="postDetails__userInfos"
          :to="{ name: 'Profile', params: { id: post.userId } }"
        >
          <img v-if="post.avatar" :src="post.avatar" alt="avatar" />
          <img v-else src="@/assets/img/icon.png" alt="avatar" />
          <div>
            <p>{{ post.firstName + " " + post.lastName }}</p>
          </div>
        </router-link>
      </div>
      <div class="postDetails__postContent">
        <p>{{ post.msg }}</p>
        <div v-if="post.postAttachment" class="postDetails__postContent__img">
          <img
            :src="post.postAttachment"
            alt="post attachment"
            @click="togglePopUp"
          />
          <Photo
            :revele="revele"
            :togglePopUp="togglePopUp"
            :photo="post.postAttachment"
          />
        </div>
      </div>
      <div class="line-break"></div>
      <div class="postDetails__postInfos">
        <span> {{ dateTime(post.postDate) }} </span>
        <p>
          <font-awesome-icon
            @click="like(post.postId)"
            class="icon"
            :icon="['fas', 'thumbs-up']"
          />
          <span> {{ post.postLikes }} </span>
        </p>
        <label for="commentArea">
          <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
          <span> {{ post.postComments }} </span>
        </label>
      </div>
    </div>
    <div class="comments__wrapper">
      <div class="newcomment">
        <input
          name="commentArea"
          id="commentArea"
          type="text"
          v-model="newComment"
          placeholder="Ajouter un commentaire..."
        />
        <button @click.prevent="postComment" v-if="newComment.length">
          Ajouter un commentaire
        </button>
      </div>
      <Comment
        v-for="comment in comments"
        :key="comment.commentId"
        :comment="comment"
        @commentDeleted="commentDeleted"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Nav_second from "@/components/Nav_second.vue";
import Comment from "@/components/Comment.vue";
import Photo from "@/components/Photo.vue";
import { mapState } from "vuex";

export default {
  name: "PostDetails",
  data() {
    return {
      post: {},
      comments: [],
      newComment: "",
      revele: false,
    };
  },
  props: {
    id: String,
  },
  components: {
    Nav_second,
    Comment,
    Photo,
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
    ...mapState({ status }),
  },
  methods: {
    dateTime(value) {
      return moment(value).locale("fr").calendar();
    },
    fetchPost() {
      this.$store
        .dispatch("getOnePost", this.id)
        .then((response) => {
          this.post = response;
          this.fetchComments();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    fetchComments() {
      this.$store
        .dispatch("getComments", this.post.postId)
        .then((response) => {
          this.comments = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    postComment() {
      this.$store
        .dispatch("postComment", {
          commentMsg: this.newComment,
          userId: this.user.userId,
          postId: this.post.postId,
        })
        .then(() => {
          this.newComment = "";
          this.fetchComments();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    commentDeleted() {
      this.fetchComments();
    },

    like(postId) {
      this.$store
        .dispatch("like", postId)
        .then(() => {
          this.fetchPost();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    togglePopUp() {
      this.revele = !this.revele;
    },
  },
  created() {
    console.log(this.$route.name);
    this.fetchPost();
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";

.postDetails {
  @include desktop {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  border-top: 1px solid $background;
  background-color: $surface;
  display: flex;
  flex-direction: column;
  padding: 1em;
  &__userInfos {
    display: flex;
    align-items: center;
    width: 100%;
    text-decoration: none;
    img {
      @include profile-img;
    }
    p {
      font-weight: 700;
    }
    span {
      font-size: 12px;
      color: $primary-color;
    }
  }
  &__postContent {
    margin: 1em 0;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    text-align: justify;
    text-justify: inter-word;
    p {
      &::first-letter {
        font-size: 150%;
        color: $primary-color;
      }
    }
    &__img {
      margin: 1em 0;
      display: flex;
      justify-content: center;
      img {
        border-radius: 20px;
      }
    }
  }
  .line-break {
    @include line-break;
    margin: 0;
  }
  &__postInfos {
    padding-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 12px;
      color: $primary-color;
    }
    .icon {
      margin-right: 5px;
      path {
        fill: $primary-color;
      }
    }
  }
}
.comments__wrapper {
  @include desktop {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    background-color: $surface;
    padding-bottom: 1em;
    border-radius: 0 0 15px 15px;
  }
  .newcomment {
    @include desktop {
      width: 600px;
      margin-left: auto;
      margin-right: auto;
      padding-bottom: 1em;
    }
    display: flex;
    flex-direction: column;

    border-top: 1px solid $background;
    background-color: $surface;
    padding: 1em;
    #commentArea {
      width: 100%;
      color: $white;
      background-color: $surface;
      border: none;
      border-radius: 15px;
      padding: 1em;
      font-size: 16px;
      word-break: break-word;
      &::placeholder {
        color: $primary-color;
        font-size: 16px;
      }
    }
    button {
      margin-top: 1em;
      background-color: $background;
      padding: 0.4em;
      border-radius: 15px;
      border: none;
    }
  }
}
</style>
