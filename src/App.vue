<script lang="ts">
import AudioPlayControl from "./components/AudioPlayControl.vue";
import { computed, onBeforeUnmount, ref } from "vue";
export default {
  components: {
    AudioPlayControl,
  },
  setup() {
    onBeforeUnmount(() => {});

    let nameTransition = ref("" as string);
    function transNameChange(route: any) {
      // console.log(route);
      if (route.query.upPage === "/lyric") {
        nameTransition.value = "lyricPageLeave";
        return "lyricPageLeave";
      } else if (route.query.nextPage === "/lyric") {
        nameTransition.value = "lyricPageEnter";
        return "lyricPageEnter";
      } else {
        nameTransition.value = route.meta.transition || "page";
        return route.meta.transition || "page";
      }
    }

    function modeChange(route: any) {
      if (nameTransition.value === "lyricPageLeave" || nameTransition.value === "lyricPageEnter") return "";
      if (route.meta.mode) {
        if (route.meta.mode === " ") return "";
        return route.meta.mode;
      }
      if (nameTransition.value === "page") {
        return "out-in";
      }
      return "";
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
        <KeepAlive :max="4" exclude='LyricView'>
          <Component :is="Component" />
        </KeepAlive>
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
