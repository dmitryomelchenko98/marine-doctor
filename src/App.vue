<template>
  <div id="app">
    <NavBar />
    <Header />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    Header
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Montserrat Extra Light';
  src: url('./assets/fonts/Montserrat-ExtraLight.eot');
  src: url('./assets/fonts/Montserrat-ExtraLight.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/Montserrat-ExtraLight.woff') format('woff'),
  url('./assets/fonts/Montserrat-ExtraLight.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Montserrat Regular';
  src: url('./assets/fonts/Montserrat-Regular.eot');
  src: url('./assets/fonts/Montserrat-Regular.eot?#iefix') format('embedded-opentype'),
  url('./assets/fonts/Montserrat-Regular.woff') format('woff'),
  url('./assets/fonts/Montserrat-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
#app {
  max-width: 1920px;
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  grid-template-columns: 250px calc(100% - 250px);
  grid-template-rows: 60px calc(100% - 60px);
}
html,body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
    font-family: 'Montserrat Extra Light';
    display: flex;
    justify-content: center;
    align-items: center;
}
.content {
  grid-column: 2/3;
  grid-row: 2/3;
  overflow: hidden;
  overflow-x: auto;
  background: url('./assets/image/fon.svg') no-repeat bottom right;
}
</style>
