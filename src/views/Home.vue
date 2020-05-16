<template>
  <div>
    <Favourites />
  </div>
</template>

<script>
// @ is an alias to /src
import Favourites from '@/components/Favourites.vue';

export default {
  name: 'Home',
  components: {
    Favourites,

  },
};
</script>
