<script lang="ts">
import AudioPlayControl from "./components/AudioPlayControl.vue";
export default {
  components: {
    AudioPlayControl,
  },
};
</script>

<template>
  <AudioPlayControl />

  <div class="mainContainer">
    <RouterView v-slot="{ Component }">
      <Transition appear :name="$route.meta?.transition || 'page'" :mode="$route.meta?.mode || 'out-in'">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
  <teleport to="body"> </teleport>
</template>

<style lang="less" src="./theme/default.less"></style>
<style lang="less" scope>
.mainContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
