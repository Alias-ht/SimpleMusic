<script lang="ts">
export default {};
</script>

<template>
  <Router-view v-slot="{ Component }">
    <Transition>
      <Component :is="Component" />
    </Transition>
  </Router-view>
</template>

<style lang="less" src="./theme/default.less"></style>
<style lang="less" scope>
// .fade
</style>
