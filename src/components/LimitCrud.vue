<template>
  <div class="limit-crud container mt-5">
    <div class="progress" style="height:2rem !important">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{width: numberItem*10 + '%'}"
        :aria-valuenow="numberItem"
        aria-valuemin="0"
        aria-valuemax="10"
      >{{numberItem}}/10</div>
    </div>

    <div class="add-item">
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Add Item</label>
        <textarea class="form-control" v-model="post" id="exampleFormControlTextarea1" rows="3"></textarea>
        <button
          type="submit"
          class="btn btn-primary d-flex justify-content-end ml-auto mt-3"
          @click="addPost"
          :disabled="!post.length ||limitMess"
        >Submit</button>
      </div>
    </div>

    <div v-if="limitMess" class="alert alert-danger" role="alert">Please Delete item to add other</div>

    <div class="list-item">
      <p v-if="!posts.length" class="text-center">No Posts</p>
      <div v-else class="row">
        <div v-for="(post, index) in posts" :key="index" class="col-sm-3 mb-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{post}}</h5>
              <button type="button" @click="deletPost(index)" class="btn btn-danger">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LimitCrud",
  data() {
    return {
      posts: [],
      post: "",
      limitMess: false,
      numberItem: 0,
    };
  },
  methods: {
    addPost() {
      this.posts.push(this.post);
      this.post = "";
      this.numberItem = this.posts.length;
    },
    deletPost(index) {
      this.posts.splice(index, 1);
    },
  },
  mounted() {},
  watch: {
    post: function () {
      this.posts.length >= 10
        ? (this.limitMess = true)
        : (this.limitMess = false);
    },
    posts: function () {
      this.numberItem = this.posts.length;
      this.posts.length >= 10
        ? (this.limitMess = true)
        : (this.limitMess = false);
    },
  },
};
</script>

<style scoped lang="scss">
.add-item {
  padding-top: 15px;
}
label {
  font-weight: bold;
  font-size: 25px;
  text-transform: capitalize;
}
.card-body:hover {
  background: #eae8e859;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.card-body {
  position: relative;
}
.btn.btn-danger {
  padding: 0;
  background: #fff;
  border: none;
  color: #dc3545;
  position: absolute;
  right: 12px;
  top: 5px;
}
.btn.btn-suc {
  padding: 0;
  background: #fff;
  border: none;
  color: #ccc;
  position: absolute;
  right: 25px;
  top: 5px;
}
</style>
