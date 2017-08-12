'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var state = {
  photos: [],
  videos: [],
  series: []
};

var getters = {
  photos: function photos(state) {
    return state.photos;
  },
  videos: function videos(state) {
    return state.videos;
  },
  series: function series(state) {
    return state.series;
  }
};

var restclient = _axios2.default.create({
  baseURL: 'http://localhost:8000/'
  // timeout: 1000,
});

restclient.defaults.headers.common['Authorization'] = localStorage.getItem('token');

var mutations = {
  SYNC_PHOTOS: function SYNC_PHOTOS(state, photos) {
    state.photos = photos;
  },
  ADD_PHOTO: function ADD_PHOTO(state, photo) {
    state.photos.push(photo);
  },
  SYNC_VIDEOS: function SYNC_VIDEOS(state, videos) {
    state.videos = videos;
  },
  ADD_VIDEO: function ADD_VIDEO(state, video) {
    state.videos.push(video);
  },
  SYNC_SERIES: function SYNC_SERIES(state, series) {
    state.series = series;
  },
  ADD_SERIE: function ADD_SERIE(state, serie) {
    state.series.push(serie);
  }
};
var actions = {
  // charge l'état du store via l'API
  loadData: function loadData(store) {
    console.log('load data');

    // sync photos
    restclient.get('photos').then(function (response) {
      store.commit('SYNC_PHOTOS', response.body.data);
    }, function (response) {
      console.log('error while syncing photos');
    });
    //
    // // sync videos
    // Vue.http.get('videos').then(
    //   response => {
    //     store.commit('SYNC_VIDEOS', response.body.data)
    //   },
    //   response => {
    //     console.log('error while syncing videos')
    //   },
    // )
    // // sync series
    // Vue.http.get('series').then(
    //   response => {
    //     store.commit('SYNC_SERIES', response.body.data)
    //   },
    //   response => {
    //     console.log('error while syncing series')
    //   },
    // )
  },
  addPhoto: function addPhoto(store, photo) {
    console.log('add photo action');

    //  Appel API REST
    restclient.post('photo/' + photo.id, { photo: photo }).then(
    //  success callback
    function (response) {
      //  commit via le mutateur
      store.commit('ADD_PHOTO', response.body);
    },
    //  error callback
    function (response) {
      console.error('error while adding photo');
    });
  },
  addVideo: function addVideo(store, video) {
    _vue2.default.http.options.root = 'http://localhost:8000';
    //  Appel API REST
    _vue2.default.http.post('video/' + video.id, { video: video }).then(
    //  success callback
    function (response) {
      //  commit via le mutateur
      store.commit('ADD_VIDEO', response.body);
    },
    //  error callback
    function (response) {
      console.error('error while adding video');
    });
  },
  addSerie: function addSerie(store, serie) {
    _vue2.default.http.options.root = 'http://localhost:8000';
    //  Appel API REST
    _vue2.default.http.post('serie/' + serie.id, { serie: serie }).then(
    //  success callback
    function (response) {
      //  commit via le mutateur
      store.commit('ADD_SERIE', response.body);
    },
    //  error callback
    function (response) {
      console.error('error while adding serie');
    });
  }
};

var store = new _vuex2.default.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
});

exports.default = store;
//# sourceMappingURL=AppStore.js.map