<script lang="ts">
import AudioPlayControl from "./components/AudioPlayControl.vue";
// import { computed } from "vue";
// import { useRouter, useRoute } from "vue-router";
// import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
export default {
  components: {
    AudioPlayControl,
  },
  setup() {
    function transNameChange(route: any) {
      // console.log(route);
      if (route.query.upPage === "/lyric") {
        return "lyricPageLeave";
      } else if (route.query.nextPage === "/lyric") {
        return "lyricPageEnter";
      } else {
        return route.meta.transition || "page";
      }
    }

    function modeChange(route: any) {
      if (route.meta.mode) {
        if (route.meta.mode === " ") return "";
        return route.meta.mode;
      }
      // $route.meta?.mode || "out-in";
      return "";
      // return "out-in";
    }
    return {
      transNameChange,
      modeChange,
    };
  },
};
</script>

<template>
  <AudioPlayControl />

  <div class="mainContainer">
    <RouterView v-slot="{ Component }">
      <Transition appear :name="transNameChange($route)" :mode="modeChange($route)">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <div id="total"></div>
</template>

<style lang="less" src="./theme/default.less"></style>
<style lang="less" scope>
.mainContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
