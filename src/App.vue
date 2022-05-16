<script lang="ts">
export default {};
</script>

<template>
  <div class="mainContainer">
    <RouterView v-slot="{ Component }">
      <Transition appear :name="$route.meta?.transition || 'page'" :mode="$route.meta?.mode || 'out-in'">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="less" src="./theme/default.less"></style>
<style lang="less" scope>
.mainContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>
