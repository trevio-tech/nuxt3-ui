<template>
  <button
      type="button"
      class="px-2.5 py-1 text-sm flex items-center rounded-lg overflow-hidden"
      :class="{[like.isLiked ? 'bg-red-100' : 'bg-slate-100']: true}"
      :title="like.isLiked ? 'Вам понравилось' : 'Мне нравится'"
      @click="onClick">
<!--    <Heart class="h-4 w-4" :class="{[like.isLiked ? 'text-red-500' : 'text-gray-500']: true}" />-->
    <span ref="root" class="w-11 h-11 block -my-2.5 -mx-3"></span>
    <span class="min-w-[14px] text-slate-600 font-medium text-right">{{ like.count }}</span>
  </button>
</template>

<script setup>
import bodymovin from 'lottie-web'
import LikeIcon from './like.json'
import { CREATE_LIKE, DELETE_LIKE } from './graphql'
import { ref, onMounted, onBeforeMount } from 'vue'
import { useQuery } from '@trevio/ui'
const props = defineProps({
  modelType: {
    type: String,
    required: true,
  },
  modelId: {
    type: [Number, String],
    required: true,
  },

  isLiked: {
    type: Boolean,
    default: false,
  },

  count: {
    type: Number,
    default: 0,
  },
})
const like = ref({
  isLiked: props.isLiked,
  count: props.count,
})
let icon = null
const loading = ref(false)

const name = Date.now()
const root = ref()

onMounted(() => {
  icon = bodymovin.loadAnimation({
    container: root.value,
    animationData: LikeIcon,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    name,
    rendererSettings: {
      progressiveLoad: true,
      hideOnTransparent: true,
    }
  })
  if (like.value.isLiked) {
    icon.goToAndStop(11, true, name)
  }
})

onBeforeMount(() => {
  if (icon !== null) {
    icon.destroy()
  }
})

const onClick = async () => {
  if (loading.value) {
    return
  }

  loading.value = true

  if (like.value.isLiked) {
    icon.setDirection(-1)
    icon.play()
  } else {
    icon.setDirection(1)
    icon.play()
  }

  try {
    const { data } = await useQuery({
      query: like.value.isLiked
          ? DELETE_LIKE
          : CREATE_LIKE,
      variables: {
        model_type:  props.modelType,
        model_id:    props.modelId,
      }
    })

    like.value.isLiked = (data.like === 'like');

    if (like.value.isLiked) {
      like.value.count++;
    } else if (like.value.count > 0) {
      like.value.count--;
    }
  } catch (error) {}
  finally {
    loading.value = false
  }
}
</script>


<style lang="scss">
.v-like {
  cursor: pointer;
  display: flex;
  align-items: center;

  .v-like__count {
    margin-left: 4px;
  }
}
</style>
