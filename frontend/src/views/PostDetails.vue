<template>
  <div>
    <Nav_second />
    <div class="postDetails">
      <div class="postDetails__userInfos">
        <img v-if="post.avatar" :src="post.avatar" alt="avatar" />
        <img v-else src="@/assets/img/icon.png" alt="avatar" />
        <div>
          <p>{{ post.firstName + " " + post.lastName }}</p>
        </div>
      </div>
      <div class="postDetails__postContent">
        <p>{{ post.msg }}</p>
        <div v-if="post.postAttachment" class="postDetails__postContent__img">
          <img :src="post.postAttachment" alt="post attachment" />
        </div>
      </div>
      <div class="line-break"></div>
      <div class="postDetails__postInfos">
        <span> {{ dateTime(post.postDate) }} </span>
        <font-awesome-icon class="icon" :icon="['fas', 'thumbs-up']" />
        <label for="commentArea">
          <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
        </label>
      </div>
    </div>
    <div>
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
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Nav_second from "@/components/Nav_second.vue";
import Comment from "@/components/Comment.vue";
import { mapState } from "vuex";

export default {
  name: "PostDetails",
  data() {
    return {
      post: {},
      comments: [],
      newComment: "",
    };
  },
  props: {
    id: String,
  },
  components: {
    Nav_second,
    Comment,
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
    fetchComments() {
      this.$store
        .dispatch("getComments", this.post.postId)
        .then((response) => {
          this.comments = response;
          console.log(this.comments);
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
        .then((response) => {
          console.log(response);
          this.newComment = "";
          this.fetchComments();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    console.log(this.$route.name);
    this.$store
      .dispatch("getOnePost", this.id)
      .then((response) => {
        this.post = response;
        console.log(this.post);
        this.fetchComments();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";

.postDetails {
  border-top: 1px solid $background;
  background-color: $surface;
  display: flex;
  flex-direction: column;
  padding: 1em;
  &__userInfos {
    display: flex;
    align-items: center;
    width: 100%;
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
      path {
        fill: $primary-color;
      }
    }
  }
}
.newcomment {
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
</style>
