<template>
  <div style="display: inline-block; height: 1rem">
    <nuxt-link :to="'profile/' + info.username">
      <img :src="info.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link :to="'profile/' + info.username">
        {{ info.username }}
      </nuxt-link>
      <span class="date">{{ info.date | dater }}</span>
    </div>
  </div>
</template>
<script>
import { dater } from '@/utils/filters'
export default {
  name: 'UserAvatar',
  filters: {
    dater,
  },
  props: {
    info: {
      type: Object,
      default: (_) => ({}),
    },
  },
}
</script>
