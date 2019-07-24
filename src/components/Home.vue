<template>
  <div class="body">
    <div class="search">
      <div class="search-bar">
        <i @click="searchEntry" class="fa fa-search fa-lg" aria-hidden="true"></i>

        <input
          autocomplete="off"
          v-if="notSearched"
          v-model="searchTerm"
          type="text"
          @keyup.enter="searchEntry"
          id="search-input"
          placeholder="Search for photo"
        >
        <p
          @click="searchEntry"
          v-else-if=" notSearched==false && loader==false && searchTerm !=='' "
          class="searchResult"
        >
          Search Results for
          <span class="searchedItem">&#8220;{{searchTerm}}&#8221;</span>
        </p>
        <p
          @click="searchEntry"
          v-else-if=" notSearched==false && loader==false && searchTerm==='' "
          class="searchResult"
        >You didn't Input a search term</p>

        <p @click="searchEntry" class="searching" v-else-if="notSearched==false && loader==true">
          Searching for
          <span class="searchedItem">&#8220;{{searchTerm}}&#8221;</span>
        </p>
      </div>
    </div>

    <div class="main">
      <div v-masonry origin-left="true" transition-duration="1s" gutter="36" item-selector=".item">
        <div class="main-body">
          <div
            v-masonry-tile
            @click="modal(image.urls.regular, image.user.name, image.user.location)"
            class="item"
            v-for="(image,index) in images"
            :key="index"
          >
            <img class="image" :src="image.urls.small" alt>
            <div class="image-caption">
              <p class="user-name">{{image.user.name}}</p>
              <p class="user-location">{{image.user.location}}</p>
              <div class="loader" v-if="loader">
                <pulse-loader v-show="loader" class="custom-class" color="white" :loading="loader"></pulse-loader>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="myModal" class="modal">
      <span class="close" @click="close">&times;</span>
      <img class="modal-content" id="img01">
      <div id="caption"></div>
      <div id="caption-location"></div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { PulseLoader } from "@saeris/vue-spinners";
import loading_screen from "../assets/grey-loading-screen.png";

export default {
  components: {
    PulseLoader
  },

  data() {
    return {
      images: [],
      searchTerm: "",
      notSearched: true,
      loader: false
    };
  },
  methods: {
    getLatestImages: function() {
      this.loader = true;

      const baseURI =
        "https://api.unsplash.com/photos/?client_id=b43a1bc0c89846d2babed5151d8668cc80bb8ed19ccfffe0b846528d90198e10&per_page=8&order_by=latest";
      axios.get(baseURI).then(result => {
        let response = result.data;
        let resultArray = [];
        response.forEach(element => {
          resultArray.push(element);
          this.loader = false;
        });
        this.images = resultArray;
      });
    },
    searchEntry: function() {
      this.loader = true;

      if (this.notSearched == true) {
        let query = this.searchTerm;
        const baseURI =
          "https://api.unsplash.com/search/photos/?query=" +
          `${query}` +
          "&client_id=b43a1bc0c89846d2babed5151d8668cc80bb8ed19ccfffe0b846528d90198e10&per_page=8&order_by=latest";
        axios.get(baseURI).then(result => {
          this.images = result.data.results;
          this.loader = false;
        });
        this.notSearched = false;
      } else {
        this.notSearched = true;
        this.loader = false;
      }
    },
    modal: function(image, name, location) {
      let modal = document.getElementById("myModal");
      let modalImg = document.getElementById("img01");
      let modalCaption = document.getElementById("caption");
      let modalCaptionLocation = document.getElementById("caption-location");
      modal.style.display = "block";
      modalImg.src = image;
      modalImg.alt = name;
      modalCaption.textContent = name;
      modalCaptionLocation.textContent = location;
    },
    close: function() {
      let modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  },
  created() {
    this.getLatestImages();
  },
  watch: {
    loader: function() {
      if (this.loader == true) {
        this.images = [
          {
            urls: {
              small: loading_screen,
              regular: ""
            },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          },
          {
            urls: { small: loading_screen, regular: loading_screen },
            user: { name: "Loading" }
          }
        ];
      }
    },

    images: function() {
      if (this.images.length == 0) {
        this.getLatestImages();
      }
    }
  }
};
</script>

<style >
@import "../styles/main.css";
</style>
